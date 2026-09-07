import type { Metadata } from "next";
import { business, locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { BookButton } from "@/components/Buttons";

export const metadata: Metadata = pageMeta({
  title: "Contact & Book | Massage in Eugene & Portland",
  description:
    "Contact Renewed Bodyworks to book massage in Eugene or Portland, Oregon. Text 541-543-5215, send a message, or book online. Addresses, hours, and directions inside.",
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
        <div className="stagger-in mx-auto max-w-3xl px-4 pt-16 pb-10 text-center sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">Get in touch</p>
          <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl md:text-[3.5rem]">
            Book your session in Eugene or Portland
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Book online any time, text, or send a message and Scott will help you find the right
            appointment.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Contact details + locations */}
          <div className="space-y-6">
            <Reveal dir="left" className="lift rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-pine-deep">Reach Scott directly</h2>
              <dl className="mt-4 space-y-3 text-[15px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Phone</dt>
                  <dd>
                    <a href={business.phoneHref} className="link-sweep font-semibold text-pine hover:text-pine-deep">
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Email</dt>
                  <dd>
                    <a href={business.emailHref} className="link-sweep font-semibold text-pine hover:text-pine-deep">
                      {business.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>

            <div id="book" className="scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold text-pine-deep">
                Choose your studio
              </h2>
              <p className="mt-1.5 text-[15px] text-muted">
                Both studios offer the full range of services. Booking is online, any time, and you
                pick the studio while you book.
              </p>
            </div>

            {locations.map((loc, i) => {
              const mapQuery = encodeURIComponent(
                `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
              );
              return (
                <Reveal
                  key={loc.key}
                  dir="left"
                  delay={(i + 1) * 90}
                  className="lift rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8"
                >
                  <h2 className="font-display text-2xl font-semibold text-pine-deep">{loc.city}</h2>
                  <address className="mt-2 not-italic leading-relaxed text-muted">
                    {loc.streetAddress}
                    <br />
                    {loc.addressLocality}, {loc.addressRegion} {loc.postalCode}
                  </address>
                  <dl className="mt-4 space-y-1 text-sm">
                    {loc.hours.map((h) => (
                      <div
                        key={h.days}
                        className="row-hover -mx-2 flex justify-between gap-3 rounded border-b border-pine/5 px-2 py-1.5 last:border-0"
                      >
                        <dt className="text-muted">{h.days}</dt>
                        <dd className="text-pine-deep">{h.label}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs text-muted">{loc.hoursNote}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="primary">
                      Book in {loc.city}
                    </BookButton>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press raise inline-flex items-center justify-center rounded-full border border-pine/30 px-6 py-3 text-[15px] font-semibold text-pine hover:border-pine hover:bg-pine hover:text-cream"
                    >
                      Directions
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Form */}
          <Reveal dir="right" className="lg:self-stretch">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
