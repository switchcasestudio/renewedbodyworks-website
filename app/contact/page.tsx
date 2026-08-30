import type { Metadata } from "next";
import { business, locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { BookButton } from "@/components/Buttons";

export const metadata: Metadata = pageMeta({
  title: "Contact & Book | Massage in Eugene & Portland",
  description:
    "Contact Renewed Bodyworks to book massage in Eugene or Portland, Oregon. Call 541-543-5215, send a message, or book online. Addresses, hours, and directions inside.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <section className="hero-wash">
        <div className="mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">Get in touch</p>
          <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl md:text-[3.5rem]">
            Book your session in Eugene or Portland
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Book online any time, call, or send a message and Scott will help you find the right
            appointment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Contact details + locations */}
          <div className="space-y-6">
            <div className="rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-pine-deep">Reach Scott directly</h2>
              <dl className="mt-4 space-y-3 text-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Phone</dt>
                  <dd>
                    <a href={business.phoneHref} className="font-semibold text-pine hover:text-pine-deep">
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Email</dt>
                  <dd>
                    <a href={business.emailHref} className="font-semibold text-pine hover:text-pine-deep">
                      {business.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {locations.map((loc) => {
              const mapQuery = encodeURIComponent(
                `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
              );
              return (
                <div key={loc.key} className="rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8">
                  <h2 className="font-display text-2xl font-semibold text-pine-deep">{loc.city}</h2>
                  <address className="mt-2 not-italic leading-relaxed text-muted">
                    {loc.streetAddress}
                    <br />
                    {loc.addressLocality}, {loc.addressRegion} {loc.postalCode}
                  </address>
                  <dl className="mt-4 space-y-1 text-sm">
                    {loc.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-3 border-b border-pine/5 py-1.5 last:border-0">
                        <dt className="text-muted">{h.days}</dt>
                        <dd className="text-pine-deep">{h.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="primary">
                      Book in {loc.city}
                    </BookButton>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-pine/30 px-6 py-3 text-[15px] font-semibold text-pine transition-colors hover:bg-pine hover:text-cream"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-pine-deep">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
