import { NextResponse } from "next/server";

// Minimal, dependency-free contact endpoint. Validates input and logs it.
// To deliver email, wire a provider here (e.g. Resend) using an env API key —
// the front-end and event tracking already work against this contract.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing or invalid fields" }, { status: 422 });
  }

  // Honeypot — silently accept and drop.
  if (body.company) return NextResponse.json({ ok: true });

  // Server-side record. Replace with an email/CRM integration when ready.
  console.log("[contact] new enquiry", {
    name,
    email,
    phone: String(body.phone ?? ""),
    location: String(body.location ?? ""),
    message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
