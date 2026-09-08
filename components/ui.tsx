import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { BookButton } from "./Buttons";
import { Stars, Star, GoogleG, MapPin, Clock } from "./icons";
import { services, business, type Location, type Service } from "@/lib/business";

export { Stars, GoogleG } from "./icons";

export function RatingBadge({
  rating = business.rating.value,
  count = business.rating.count,
}: {
  rating?: string;
  count?: number;
}) {
  return (
    <a
      href={business.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="See Scott's reviews on Google"
      className="press raise inline-flex items-center gap-2 rounded-full border border-pine/15 bg-cream px-3.5 py-1.5 text-sm text-pine-deep shadow-sm hover:border-pine/30 hover:shadow-md"
    >
      <GoogleG />
      <Stars />
      <span className="font-semibold">{rating}</span>
      <span className="text-muted">· {count} reviews</span>
    </a>
  );
}

/**
 * The three-up proof strip under the hero. The review count comes from the
 * live Google data so it never drifts from the badge or the testimonials link.
 */
export function TrustStrip({
  rating = business.rating.value,
  count = business.rating.count,
}: {
  rating?: string;
  count?: number;
}) {
  const items = [
    {
      key: "rating",
      icon: <Star size={26} className="text-amber" />,
      headline: `${rating} stars`,
      body: `${count} reviews on Google`,
      href: business.googleReviewsUrl,
      external: true,
      // On phones the hero's Google badge sits directly above this tile and
      // says the same thing. One of them has to go, and the badge is the one
      // carrying the Google mark.
      mobileHidden: true,
    },
    {
      key: "locations",
      icon: <MapPin size={26} className="text-pine" />,
      headline: "2 studios",
      body: "Eugene and Portland, Oregon",
      href: "/contact",
      external: false,
      mobileHidden: false,
    },
    {
      key: "sessions",
      icon: <Clock size={26} className="text-pine" />,
      headline: "60 & 90 min",
      body: "Sessions from $120, or a $55 focused visit",
      href: "/services",
      external: false,
      mobileHidden: false,
    },
  ];

  return (
    <section className="border-y border-pine/10 bg-cream-deep/60">
      <div className="mx-auto grid max-w-6xl gap-2 px-4 py-6 sm:grid-cols-3 sm:px-6">
        {items.map((item, i) => {
          const inner = (
            <>
              <span className="shrink-0">{item.icon}</span>
              <span>
                <span className="block font-display text-2xl font-semibold text-pine-deep transition-colors duration-200 group-hover:text-pine">
                  {item.headline}
                </span>
                <span className="mt-0.5 block text-sm text-muted transition-colors duration-200 group-hover:text-ink">
                  {item.body}
                </span>
              </span>
            </>
          );
          const className =
            "trust-tile group flex items-center gap-3.5 rounded-2xl px-4 py-3 text-left";
          return (
            <Reveal
              key={item.key}
              delay={i * 90}
              dir="fade"
              className={item.mobileHidden ? "hidden sm:block" : ""}
            >
              {item.external ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {inner}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {inner}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold text-pine-deep sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

export function PriceRow({ service }: { service: Service }) {
  return (
    <div className="row-hover -mx-3 flex items-baseline justify-between gap-4 rounded-lg border-b border-pine/10 px-3 py-3 last:border-0">
      <span className="text-ink">{service.name}</span>
      <span className="whitespace-nowrap font-medium text-pine-deep">
        {service.durations.map((d, i) => (
          <span key={d.minutes}>
            {i > 0 && <span className="text-muted"> · </span>}
            {d.minutes} min ${d.price}
          </span>
        ))}
      </span>
    </div>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal
      as="article"
      delay={(index % 3) * 80}
      className="lift group overflow-hidden rounded-[18px] border border-pine/10 bg-white shadow-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="img-zoom object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-semibold text-pine-deep">{service.name}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{service.short}</p>
        <p className="mt-4 text-sm text-pine">
          <span className="font-semibold">Best for:</span> {service.best}
        </p>
        <p className="mt-3 text-sm font-medium text-pine-deep">
          {service.durations.map((d, i) => (
            <span key={d.minutes}>
              {i > 0 && <span className="text-muted"> · </span>}
              {d.minutes} min ${d.price}
            </span>
          ))}
        </p>
      </div>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <ServiceCard key={s.slug} service={s} index={i} />
      ))}
    </div>
  );
}

export function LocationCard({ loc }: { loc: Location }) {
  const mapQuery = encodeURIComponent(
    `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
  );
  return (
    <div className="lift flex h-full flex-col rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-pine-deep">{loc.city}, Oregon</h3>
        <Link
          href={`/${loc.slug}`}
          className="link-sweep arrow-link text-sm font-semibold text-pine hover:text-pine-deep"
        >
          Details <span className="arrow">&rarr;</span>
        </Link>
      </div>
      <address className="mt-3 text-[15px] not-italic leading-relaxed text-muted">
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
      <div className="mt-6 flex flex-wrap gap-3">
        <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="primary">
          Book in {loc.city}
        </BookButton>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="press raise inline-flex items-center justify-center rounded-full border border-pine/30 px-6 py-3 text-[15px] font-semibold text-pine hover:border-pine hover:bg-pine hover:text-cream"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
