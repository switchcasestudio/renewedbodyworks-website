import { NextResponse } from "next/server";

// Contact endpoint. Validates input and delivers it to Scott by email through
// Resend's REST API (no SDK dependency). Configure in Vercel:
//   RESEND_API_KEY  - required, or every enquiry fails loudly instead of vanishing
//   CONTACT_TO      - inbox that receives enquiries (defaults to Scott's)
//   CONTACT_FROM    - sender on a Resend-verified domain (defaults to the
//                     studio's mail.switchcasestudio.com, verified in Resend)
const TO = process.env.CONTACT_TO || "scott@renewedbodyworks.com";
const FROM = process.env.CONTACT_FROM || "Renewed Bodyworks Website <website@mail.switchcasestudio.com>";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const location = String(body.location ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  // Honeypot - silently accept and drop.
  if (body.company) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY missing - enquiry not delivered", { name, email });
    return NextResponse.json({ ok: false, error: "Email delivery not configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "-"],
    ["Studio", location || "-"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`;
  const html = `<table cellpadding="4" style="font-family:sans-serif;font-size:14px">${rows
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
    .join("")}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escape(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `New enquiry from ${name}${location ? ` (${location})` : ""}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend rejected enquiry", res.status, await res.text(), { name, email });
    return NextResponse.json({ ok: false, error: "Could not send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
