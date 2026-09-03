"use client";

import Link from "next/link";
import { track, type ConversionEvent } from "./track";
import { business } from "@/lib/business";

type Variant = "primary" | "outline" | "creamOutline" | "amber" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream";
const sizes = "px-6 py-3 text-[15px]";

const variants: Record<Variant, string> = {
  primary: "bg-pine text-cream hover:bg-pine-deep shadow-sm shadow-pine/20",
  amber: "bg-amber text-pine-900 hover:bg-amber-soft shadow-sm shadow-amber/25",
  outline: "border border-pine/30 text-pine hover:bg-pine hover:text-cream",
  creamOutline: "border border-cream/45 text-cream hover:bg-cream hover:text-pine-deep",
  ghost: "text-pine hover:text-pine-deep underline underline-offset-4 decoration-pine/30",
};

export function BookButton({
  href,
  event,
  variant = "primary",
  children = "Book a session",
  className = "",
}: {
  href: string;
  event: ConversionEvent;
  variant?: Variant;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event)}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

export function PhoneLink({
  variant = "outline",
  className = "",
  children,
}: {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={business.smsHref}
      onClick={() => track("phone_tap")}
      className={`${base} ${sizes} ${variants[variant]} ${className}`}
    >
      {children ?? `Text ${business.phone}`}
    </a>
  );
}

export function LinkButton({
  href,
  variant = "outline",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${sizes} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
