// Thin GA4 event helper. No-ops safely when GA is not configured, so the four
// conversion events from the audit (MEA-01) are wired in code from day one and
// start reporting the moment NEXT_PUBLIC_GA_ID is set.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type ConversionEvent =
  | "phone_tap"
  | "contact_submit"
  | "book_click_eugene"
  | "book_click_portland";

export function track(event: ConversionEvent, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
