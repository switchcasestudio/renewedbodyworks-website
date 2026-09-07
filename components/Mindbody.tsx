"use client";

import { useEffect, useRef, useState } from "react";

// Mindbody loads its widgets by scanning the DOM once when its script runs.
// On client-side navigation the script is already cached, so it would never
// scan again. Injecting a fresh <script> on every mount (and removing it on
// unmount) makes the widget render reliably on first visit and on every
// back/forward navigation to this page.
function useWidgetScript(src: string, deps: unknown[] = []) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ready;
}

const APPOINTMENTS_ID = "3d63128eb7c";
const REGISTRATION_ID = "3d176962eb7c";

function Loading({ label }: { label: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center text-sm text-muted">
      <span className="inline-flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-pine/50" />
        {label}
      </span>
    </div>
  );
}

/** Mindbody "Appointments" branded-web widget: pick service, studio, time, and pay. */
export function MindbodyAppointments() {
  const host = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  useWidgetScript("https://brandedweb.mindbodyonline.com/embed/widget.js");

  // The widget replaces the div's contents with an iframe; hide the loader
  // once that happens.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.querySelector("iframe")) setRendered(true);
    });
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative">
      {!rendered && <Loading label="Loading the booking calendar" />}
      <div
        ref={host}
        className="mindbody-widget"
        data-widget-type="Appointments"
        data-widget-id={APPOINTMENTS_ID}
      />
    </div>
  );
}

/** Mindbody (Healcode) "Registrations" widget: create a client account. */
export function MindbodyRegistration() {
  const host = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  useWidgetScript("https://widgets.mindbodyonline.com/javascripts/healcode.js");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (el.querySelector("iframe, form")) setRendered(true);
    });
    obs.observe(el, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={host} className="relative">
      {!rendered && <Loading label="Loading the registration form" />}
      {/* Custom element from healcode.js; React passes unknown tags through. */}
      <healcode-widget
        data-type="registrations"
        data-widget-partner="object"
        data-widget-id={REGISTRATION_ID}
        data-widget-version="0"
      />
    </div>
  );
}
