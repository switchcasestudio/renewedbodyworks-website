"use client";

import { business, locations } from "@/lib/business";
import { track } from "./track";

// Persistent booking bar on mobile (audit UX-01: add a mobile booking bar).
// Hidden on lg+ where the header CTA is always visible.
export default function MobileBookingBar() {
  const eugene = locations[0];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pine/15 bg-cream/95 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-6xl gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={business.phoneHref}
          onClick={() => track("phone_tap")}
          className="flex flex-1 items-center justify-center rounded-full border border-pine/30 py-3 font-semibold text-pine"
        >
          Call
        </a>
        <a
          href={eugene.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("book_click_eugene")}
          className="flex flex-[2] items-center justify-center rounded-full bg-pine py-3 font-semibold text-cream"
        >
          Book a session
        </a>
      </div>
    </div>
  );
}
