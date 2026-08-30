"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, business, locations } from "@/lib/business";
import { track } from "./track";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const eugene = locations[0];

  return (
    <header className="sticky top-0 z-40 border-b border-pine/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Renewed Bodyworks home">
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
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  active ? "text-pine font-semibold" : "text-muted hover:text-pine"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={eugene.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("book_click_eugene")}
            className="rounded-full bg-pine px-5 py-2.5 text-[15px] font-semibold text-cream transition-colors hover:bg-pine-deep"
          >
            Book now
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-pine lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-pine/10 bg-cream lg:hidden" aria-label="Mobile">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base text-ink hover:text-pine"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex gap-3 py-3">
              <a
                href={eugene.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("book_click_eugene")}
                className="flex-1 rounded-full bg-pine px-5 py-3 text-center font-semibold text-cream"
              >
                Book now
              </a>
              <a
                href={business.phoneHref}
                onClick={() => track("phone_tap")}
                className="flex-1 rounded-full border border-pine/30 px-5 py-3 text-center font-semibold text-pine"
              >
                Call
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
