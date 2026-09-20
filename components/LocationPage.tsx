import Image from "next/image";
import { business, type Location, locations } from "@/lib/business";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import Reveal from "./Reveal";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import { BookButton, PhoneLink } from "./Buttons";
import { RatingBadge } from "./ui";
import { getReviewData, seedFor } from "@/lib/reviews";

export default async function LocationPage({ loc }: { loc: Location }) {
  const reviews = await getReviewData();
  const mapQuery = encodeURIComponent(
    `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
  );
  const other = locations.find((l) => l.key !== loc.key)!;

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(loc, { value: reviews.rating, count: reviews.count }),
          faqSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Massage in ${loc.city}`, path: `/${loc.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      {loc.heroOverlay ? (
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 bg-pine-900" />
          <Image
            src={loc.heroImage}
            alt={loc.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[40%_center]"
          />
          {/* Legibility overlay: heavier on the left where the copy sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-pine-900/90 via-pine-900/55 to-pine-900/20" />
          <div className="absolute inset-0 bg-pine-900/30 lg:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pine-900/70 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[78svh] max-w-6xl items-center px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:py-28">
            <div className="stagger-in max-w-2xl">
              <p className="eyebrow mb-4 text-amber-soft! [text-shadow:0_1px_8px_rgba(27,51,36,0.8)]">
                {loc.addressLocality}, Oregon
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl md:text-6xl">
                Massage therapy in {loc.city}, Oregon
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{loc.blurb}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="amber">
                  Book in {loc.city}
                </BookButton>
                <PhoneLink variant="creamOutline" />
              </div>
              <div className="mt-8">
                <RatingBadge rating={reviews.rating} count={reviews.count} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="hero-wash">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-20">
            <div className="stagger-in">
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
                <RatingBadge rating={reviews.rating} count={reviews.count} />
              </div>
            </div>

            <Reveal dir="right" className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-lg shadow-pine/15">
              <Image
                src={loc.heroImage}
                alt={loc.heroImageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Details: address, hours, directions */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="lift rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
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
              className="link-sweep arrow-link mt-4 inline-block text-sm font-semibold text-pine hover:text-pine-deep"
            >
              Get directions <span className="arrow">&rarr;</span>
            </a>
          </Reveal>
          <Reveal delay={80} className="lift rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-pine-deep">Hours</h2>
            <dl className="mt-3 space-y-1 text-sm">
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
          </Reveal>
          <Reveal delay={160} className="lift rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-semibold text-pine-deep">Contact</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={business.phoneHref} className="link-sweep font-semibold text-pine hover:text-pine-deep">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={business.emailHref} className="link-sweep text-muted hover:text-pine">
                  {business.email}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="amber">
                Book now
              </BookButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Studio gallery */}
      {loc.gallery && loc.gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <h2 className="mb-8 font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
            Inside the {loc.city} studio
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {loc.gallery.map((img, i) => (
              <Reveal
                key={img.src}
                delay={(i % 3) * 80}
                className={`relative aspect-[4/3] overflow-hidden rounded-[18px] shadow-md shadow-pine/10 ${
                  i === 0
                    ? "col-span-2 md:row-span-2 md:aspect-auto"
                    : i === loc.gallery!.length - 1 && i % 2 === 1
                      ? "col-span-2 md:col-span-1"
                      : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 50vw, 33vw"
                  }
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Map */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
          Find the {loc.city} studio
        </h2>
        <Reveal dir="scale" className="overflow-hidden rounded-[24px] border border-pine/10 shadow-lg shadow-pine/10">
          <iframe
            src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            title={`Map of Renewed Bodyworks, ${loc.streetAddress}, ${loc.addressLocality}, ${loc.addressRegion}`}
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-deep/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center font-display text-3xl font-semibold text-pine-deep sm:text-4xl">
            Trusted by clients across Oregon
          </h2>
          <Testimonials initial={seedFor(reviews)} />
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
          <a
            href={`/${other.slug}`}
            className="link-sweep arrow-link font-semibold text-pine hover:text-pine-deep"
          >
            See massage in {other.city} <span className="arrow">&rarr;</span>
          </a>
        </p>
      </section>
    </>
  );
}
