import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { BookButton } from "./Buttons";
import { services, testimonials, business, type Location, type Service } from "@/lib/business";

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="text-amber">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.51L10 14.9l-4.95 2.6.94-5.5-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function RatingBadge() {
  return (
    <a
      href={business.googleReviewsUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="See Scott's reviews on Google"
      className="inline-flex items-center gap-2 rounded-full border border-pine/15 bg-cream px-3.5 py-1.5 text-sm text-pine-deep shadow-sm transition-shadow hover:shadow-md"
    >
      <GoogleG />
      <Stars />
      <span className="font-semibold">{business.rating.value}</span>
      <span className="text-muted">· {business.rating.count} reviews</span>
    </a>
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
    <div className="flex items-baseline justify-between gap-4 border-b border-pine/10 py-3 last:border-0">
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
      className="group overflow-hidden rounded-[18px] border border-pine/10 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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

export function Testimonials() {
  return (
    <>
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <Reveal
          as="figure"
          key={t.name}
          delay={i * 90}
          className="flex flex-col rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm"
        >
          <Stars className="mb-4" />
          <blockquote className="font-display text-xl leading-snug text-pine-deep">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm text-muted">
            <span className="font-semibold text-ink">{t.name}</span> · {t.role}
          </figcaption>
        </Reveal>
      ))}
    </div>
    <div className="mt-8 text-center">
      <a
        href={business.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-semibold text-pine underline decoration-pine/30 underline-offset-4 hover:text-pine-deep"
      >
        <GoogleG size={18} />
        Read all {business.rating.count} reviews on Google →
      </a>
    </div>
    </>
  );
}

export function LocationCard({ loc }: { loc: Location }) {
  const mapQuery = encodeURIComponent(
    `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
  );
  return (
    <div className="flex flex-col rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-pine-deep">{loc.city}, Oregon</h3>
        <Link href={`/${loc.slug}`} className="text-sm font-semibold text-pine hover:text-pine-deep">
          Details →
        </Link>
      </div>
      <address className="mt-3 text-[15px] not-italic leading-relaxed text-muted">
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
      <div className="mt-6 flex flex-wrap gap-3">
        <BookButton href={loc.bookingUrl} event={loc.bookEvent} variant="primary">
          Book in {loc.city}
        </BookButton>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-pine/30 px-6 py-3 text-[15px] font-semibold text-pine transition-colors hover:bg-pine hover:text-cream"
        >
          Get directions
        </a>
      </div>
    </div>
  );
}
