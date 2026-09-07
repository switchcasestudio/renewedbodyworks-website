import Link from "next/link";
import Image from "next/image";
import { business, locations, nav } from "@/lib/business";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-pine-900 text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <Image src="/renewed-logo.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-xl font-semibold text-cream">Renewed Bodyworks</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Therapeutic massage and bodywork in Eugene and Portland, Oregon. {business.tagline}.
          </p>
          <p className="mt-4 text-sm text-cream/70">{business.practitioner}</p>
        </div>

        {locations.map((loc) => (
          <div key={loc.key}>
            <h2 className="font-display text-lg font-semibold text-cream">{loc.city}</h2>
            <address className="mt-3 space-y-1 text-sm not-italic text-cream/70">
              <p>{loc.streetAddress}</p>
              <p>
                {loc.addressLocality}, {loc.addressRegion} {loc.postalCode}
              </p>
            </address>
            <ul className="mt-3 space-y-0.5 text-sm text-cream/70">
              {loc.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-3">
                  <span>{h.days}</span>
                  <span className="text-cream/90">{h.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-xs text-cream/50">{loc.hoursNote}</p>
            <Link
              href={loc.bookingUrl}
              className="link-sweep arrow-link mt-3 inline-block text-sm font-semibold text-amber-soft hover:text-amber"
            >
              Book in {loc.city} <span className="arrow">&rarr;</span>
            </Link>
          </div>
        ))}

        <div>
          <h2 className="font-display text-lg font-semibold text-cream">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm text-cream/70">
            <li>
              <a href={business.phoneHref} className="link-sweep hover:text-amber-soft">
                {business.phone}
              </a>
            </li>
            <li>
              <a href={business.emailHref} className="link-sweep hover:text-amber-soft">
                {business.email}
              </a>
            </li>
          </ul>
          <nav className="mt-5" aria-label="Footer">
            <ul className="space-y-1.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-sweep text-cream/70 hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {year} {business.legalName}. All rights reserved.</p>
          <p>
            Designed &amp; developed with care by{" "}
            <a
              href="https://switchcasestudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-sweep font-medium text-cream/70 hover:text-cream"
            >
              Switch Case Studio
            </a>
            , a web design &amp; automation studio in Portland, OR
          </p>
          <p>Licensed Massage Therapy · State of Oregon</p>
        </div>
      </div>
    </footer>
  );
}
