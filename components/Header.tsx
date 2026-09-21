"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, business } from "@/lib/business";
import { track } from "./track";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Header gains depth once content passes beneath it. Passive listener,
  // and state only flips at the threshold so React re-renders twice, not
  // once per scroll frame.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-40 border-b border-pine/10 bg-cream/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="header-mark flex items-center gap-2.5 rounded-lg"
          aria-label="Renewed Bodyworks home"
        >
          <Image
            src="/renewed-logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11"
            priority
          />
          <span className="font-display text-[22px] font-semibold text-pine-deep">
            Renewed Bodyworks
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className={`link-sweep text-[15px] ${
                  active ? "text-pine font-semibold" : "text-muted hover:text-pine"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={business.bookingUrl}
            onClick={() => track("book_start")}
            className="press raise rounded-full bg-pine px-5 py-2.5 text-[15px] font-semibold text-cream shadow-sm shadow-pine/20 hover:bg-pine-deep hover:shadow-md hover:shadow-pine/25"
          >
            Book now
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="press flex h-11 w-11 items-center justify-center rounded-lg text-pine lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {/* Three lines that morph into an X - one element, no swap. */}
          <svg
            data-open={open}
            className="burger"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <path className="burger-top" d="M4 7h16" />
            <path className="burger-mid" d="M4 12h16" />
            <path className="burger-bot" d="M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Always rendered so it animates closed as well as open. */}
      <nav
        id="mobile-nav"
        data-open={open}
        aria-label="Mobile"
        inert={!open}
        className="disclose bg-cream lg:hidden"
      >
        {/* The clipped child carries no border of its own - a border would keep
            the collapsed row 1px tall and leave a hairline under the header. */}
        <div>
          <ul className="mx-auto flex max-w-6xl flex-col border-t border-pine/10 px-4 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="press block rounded-lg py-3 text-base text-ink hover:text-pine"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 py-3">
              <Link
                href={business.bookingUrl}
                onClick={() => track("book_start")}
                className="press flex-1 rounded-full bg-pine px-5 py-3 text-center font-semibold text-cream"
              >
                Book now
              </Link>
              <a
                href={business.smsHref}
                onClick={() => track("phone_tap")}
                className="press flex-1 rounded-full border border-pine/30 px-5 py-3 text-center font-semibold text-pine"
              >
                Text
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
