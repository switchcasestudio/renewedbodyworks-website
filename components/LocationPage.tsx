import Image from "next/image";
import { business, services, type Location, locations } from "@/lib/business";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import Reveal from "./Reveal";
import Faq from "./Faq";
import { BookButton, PhoneLink } from "./Buttons";
import { RatingBadge, ServiceCard, Testimonials } from "./ui";

export default function LocationPage({ loc }: { loc: Location }) {
  const mapQuery = encodeURIComponent(
    `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
  );
  const other = locations.find((l) => l.key !== loc.key)!;

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(loc),
          faqSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Massage in ${loc.city}`, path: `/${loc.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
          <div>
            <p className="eyebrow mb-4">{loc.addressLocality}, Oregon</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-pine-deep sm:text-5xl md:text-6xl">
              Massage therapy in {loc.city}, Oregon
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{loc.blurb}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="primary">
                Book in {loc.city}
              </BookButton>
              <PhoneLink variant="outline" />
            </div>
            <div className="mt-8">
              <RatingBadge />
            </div>
          </div>

          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-lg shadow-pine/15">
            <Image
              src="/images/hero-deep-tissue.jpg"
              alt={`Therapeutic massage session at Renewed Bodyworks in ${loc.city}, Oregon`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Details: address, hours, directions */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-pine-deep">Studio address</h2>
            <address className="mt-3 not-italic leading-relaxed text-muted">
              {loc.streetAddress}
              <br />
              {loc.addressLocality}, {loc.addressRegion} {loc.postalCode}
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-pine hover:text-pine-deep"
            >
              Get directions →
            </a>
          </div>
          <div className="rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-pine-deep">Hours</h2>
            <dl className="mt-3 space-y-1 text-sm">
              {loc.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-3 border-b border-pine/5 py-1.5 last:border-0">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="text-pine-deep">{h.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted">Sessions by appointment. Book online any time.</p>
          </div>
          <div className="rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-pine-deep">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={business.phoneHref} className="font-semibold text-pine hover:text-pine-deep">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={business.emailHref} className="text-muted hover:text-pine">
                  {business.email}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="amber">
                Book now
              </BookButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services offered here */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
          Services at the {loc.city} studio
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-deep/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
            Trusted by clients across Oregon
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
          {loc.city} massage FAQs
        </h2>
        <Faq />
        <p className="mt-8 text-center text-muted">
          Prefer the other studio?{" "}
          <a href={`/${other.slug}`} className="font-semibold text-pine hover:text-pine-deep">
            See massage in {other.city} →
          </a>
        </p>
      </section>
    </>
  );
}
