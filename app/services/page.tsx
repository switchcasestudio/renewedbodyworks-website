import Image from "next/image";
import type { Metadata } from "next";
import { services, mobileService, locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { BookButton } from "@/components/Buttons";
import { SectionHeading, PriceRow } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "Massage Services & Prices in Eugene & Portland",
  description:
    "Therapeutic, customized, Swedish, and sports massage from $120 for 60 minutes and $165 for 90 minutes, plus a $55 focused session. See all Renewed Bodyworks services and prices.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <section className="hero-wash">
        <div className="stagger-in mx-auto max-w-3xl px-4 pt-16 pb-12 text-center sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">Services &amp; pricing</p>
          <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl md:text-[3.5rem]">
            Massage &amp; bodywork in Eugene and Portland
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Clear pricing, no surprises. Every service is available at both studios in 60 and 90
            minute sessions unless noted.
          </p>
        </div>
      </section>

      {/* Price list up front */}
      <section className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
        <Reveal dir="scale" className="lift rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-pine-deep">Price list</h2>
          <div className="mt-4">
            {services.map((s) => (
              <PriceRow key={s.slug} service={s} />
            ))}
            <div className="row-hover -mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-3">
              <span className="text-ink">{mobileService.name}</span>
              <span className="font-medium text-pine-deep">By quote</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            Payment by cash, credit, or debit. New clients complete a short health intake so Scott can
            tailor the session.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-pine/10 pt-6">
            <BookButton href={locations[0].bookingUrl} event="book_click_eugene" variant="primary">
              Book in Eugene
            </BookButton>
            <BookButton href={locations[1].bookingUrl} event="book_click_portland" variant="amber">
              Book in Portland
            </BookButton>
          </div>
        </Reveal>
      </section>

      {/* Detailed service sections */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="space-y-8">
          {services.map((s, i) => (
            <Reveal
              as="article"
              key={s.slug}
              id={s.slug}
              dir={i % 2 === 1 ? "right" : "left"}
              className="lift group grid gap-8 overflow-hidden rounded-[24px] border border-pine/10 bg-white shadow-sm md:grid-cols-2"
            >
              <div className={`relative min-h-[240px] overflow-hidden ${i % 2 === 1 ? "md:order-last" : ""}`}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="p-7 sm:p-9">
                <h2 className="font-display text-3xl font-semibold text-pine-deep">{s.name}</h2>
                <p className="mt-3 leading-relaxed text-muted">{s.description}</p>
                <p className="mt-5 text-sm text-pine">
                  <span className="font-semibold">Best for:</span> {s.best}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                  {s.durations.map((d) => (
                    <span key={d.minutes} className="font-display text-2xl font-semibold text-pine-deep">
                      ${d.price}
                      <span className="ml-1 font-sans text-sm font-normal text-muted">
                        / {d.minutes} min
                      </span>
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookButton href={locations[0].bookingUrl} event="book_click_eugene" variant="primary">
                    Book in Eugene
                  </BookButton>
                  <BookButton href={locations[1].bookingUrl} event="book_click_portland" variant="outline">
                    Book in Portland
                  </BookButton>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Mobile & corporate */}
          <Reveal as="article" dir="scale" className="lift rounded-[24px] border border-dashed border-pine/25 bg-cream-deep/40 p-8 text-center">
            <h2 className="font-display text-3xl font-semibold text-pine-deep">{mobileService.name}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-muted">{mobileService.description}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
