"use client";

import { useState } from "react";
import { track } from "./track";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: bots fill hidden fields.
    if (data.company) {
      setStatus("success");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      track("contact_submit", { location: data.location });
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please call 541-543-5215 and Scott will take care of you.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[18px] border border-pine/15 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-soft text-pine-deep">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-pine-deep">Message sent</h3>
        <p className="mt-2 text-muted">
          Thanks for reaching out. Scott&rsquo;ll get back to you soon. For the fastest response, call{" "}
          <a href="tel:+15415435215" className="font-semibold text-pine">541-543-5215</a>.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-pine/20 bg-white px-4 py-3 text-ink placeholder:text-muted/60 focus:border-pine focus:outline-none focus:ring-2 focus:ring-pine/25";
  const label = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className="rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8" noValidate>
      <h2 className="mb-6 font-display text-2xl font-semibold text-pine-deep">Send a message</h2>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name <span className="text-amber">*</span></label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} placeholder="(541) 555-0123" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>Email <span className="text-amber">*</span></label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
      </div>

      <div className="mt-5">
        <label htmlFor="location" className={label}>Preferred location</label>
        <select id="location" name="location" className={field} defaultValue="Either">
          <option>Eugene</option>
          <option>Portland</option>
          <option>Either</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>How can Scott help? <span className="text-amber">*</span></label>
        <textarea id="message" name="message" required rows={5} className={field} placeholder="Share what you're looking for, any areas of focus, and your availability." />
      </div>

      {/* Honeypot — hidden from humans */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pine px-6 py-3.5 font-semibold text-cream transition-colors hover:bg-pine-deep disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3 text-xs text-muted">
        Prefer to talk? Call <a href="tel:+15415435215" className="font-medium text-pine">541-543-5215</a>. Your details are never shared.
      </p>
    </form>
  );
}
