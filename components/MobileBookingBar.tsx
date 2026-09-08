"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/lib/business";
import { track } from "./track";

// Persistent booking bar on mobile (audit UX-01: add a mobile booking bar).
// Hidden on lg+ where the header CTA is always visible. It slides up once on
// mount rather than snapping in - it always stays visible after that, because
// a CTA that hides itself is a CTA that gets missed.
export default function MobileBookingBar() {
  // On the booking and registration pages the primary CTA points at the page
  // you are already standing on, and the bar covers ~74px of the Mindbody
  // widget at every scroll position. Stand down there.
  const pathname = usePathname();
  if (pathname === "/book" || pathname === "/register") return null;

  return (
    <>
      {/* Reserves the space the fixed bar covers so the footer's last line is
          never buried under it. It lives here rather than on <body> so it
          disappears together with the bar. */}
      <div aria-hidden className="h-[calc(4.6rem+env(safe-area-inset-bottom))] lg:hidden" />

      <div className="animate-bar-up fixed inset-x-0 bottom-0 z-40 border-t border-pine/15 bg-cream/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <a
            href={business.smsHref}
            onClick={() => track("phone_tap")}
            className="press flex flex-1 items-center justify-center rounded-full border border-pine/30 py-3 font-semibold text-pine"
          >
            Text
          </a>
          <Link
            href={business.bookingUrl}
            onClick={() => track("book_start")}
            className="press flex flex-[2] items-center justify-center rounded-full bg-pine py-3 font-semibold text-cream"
          >
            Book a session
          </Link>
        </div>
      </div>
    </>
  );
}
