import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { business, locations, services } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Testimonials from "@/components/Testimonials";
import { BookNow, LinkButton } from "@/components/Buttons";
import { RatingBadge, SectionHeading, ServiceCard, TrustStrip, LocationCard } from "@/components/ui";
import { getReviewData, seedFor } from "@/lib/reviews";

export const metadata: Metadata = pageMeta({
  title: "Therapeutic Massage in Eugene & Portland, OR",
  description:
    "Therapeutic, Swedish, sports, and customized massage in Eugene and Portland, Oregon with Scott Hartzell, LMT. Rated 5.0 on Google. Book online today.",
  path: "/",
});

export default async function HomePage() {
  // Live rating and review count, baked into the static HTML and refreshed
  // daily, so the hero badge, trust strip and testimonials all agree.
  const reviews = await getReviewData();

  return (
    <>
      <JsonLd
        data={[
          faqSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />

      {/* Hero - full-bleed video background */}
      {/* `isolate` plus a negative z-index used to bury the media behind the
          section's own background, so the video never showed. Everything now
          stacks forward from a solid ground layer. */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-pine-900" />
        <div className="absolute inset-0">
          <HeroVideo />
        </div>
        {/* Legibility overlay: heavier on the left where the copy sits */}
        <div className="absolute inset-0 bg-gradient-to-r from-pine-900/90 via-pine-900/55 to-pine-900/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-pine-900/70 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-6xl items-center px-4 py-20 sm:px-6 lg:py-28">
          <div className="stagger-in max-w-2xl">
            <p className="eyebrow mb-4 text-amber-soft! [text-shadow:0_1px_8px_rgba(27,51,36,0.8)]">
              Eugene & Portland, Oregon
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl md:text-6xl">
              Therapeutic massage &amp; bodywork to unwind, heal, and restore
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
              Custom sessions with Scott Hartzell, LMT, built around your body, whether you need
              deep tissue relief, sports recovery, or a calm reset.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookNow variant="amber" />
              <LinkButton href="/services" variant="creamOutline">
                View services &amp; prices
              </LinkButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <RatingBadge rating={reviews.rating} count={reviews.count} />
              <span className="text-sm font-medium text-cream/80">
                Two studios · Eugene &amp; Portland
              </span>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip rating={reviews.rating} count={reviews.count} />

      {/* Services preview - card grid */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What Scott offers"
            title="Bodywork tailored to what your body needs"
            intro="Every session begins with your goals. Choose a focus, or let Scott build a plan with you."
          />
          <LinkButton href="/services" variant="outline" className="hidden shrink-0 sm:inline-flex">
            All services &amp; prices
          </LinkButton>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 3).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <LinkButton href="/services" variant="outline" className="w-full">
            All services &amp; prices
          </LinkButton>
        </div>
      </section>

      {/* Meet Scott - about teaser */}
      <section className="border-t border-pine/10 bg-cream-deep/50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal dir="left" className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-lg shadow-pine/15">
              <Image
                src="/images/scott-hartzell.webp"
                alt="Scott Hartzell, licensed massage therapist and owner of Renewed Bodyworks"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
            <div className="lift absolute -bottom-5 -right-5 hidden rounded-2xl border border-pine/10 bg-cream px-5 py-3 shadow-md sm:block">
              <p className="font-display text-xl font-semibold text-pine-deep">Scott Hartzell</p>
              <p className="text-sm text-muted">Licensed Massage Therapist</p>
            </div>
          </Reveal>
          <div>
            <p className="eyebrow mb-3">Meet your therapist</p>
            <h2 className="font-display text-3xl font-semibold text-pine-deep sm:text-4xl md:text-[2.75rem]">
              Every session tailored to your needs
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Scott is the licensed massage therapist behind Renewed Bodyworks, practicing in both
              Eugene and Portland. His approach blends various modalities to include Deep Tissue,
              Trigger Point, Swedish, Sports, and assisted stretches in a single session, all chosen
              around your goals rather than a fixed routine. Clients describe their experience as
              intuitive, effective work that finds the source of the tension.
            </p>
            <div className="mt-7">
              <LinkButton href="/about" variant="outline">
                More about Scott
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* The Renewed difference - feature split */}
      <section className="bg-pine-900 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <Reveal dir="left" className="relative order-last aspect-[5/4] overflow-hidden rounded-[24px] shadow-lg lg:order-first lg:aspect-auto lg:self-stretch">
            <Image
              src="/images/renewed-difference-massage.webp"
              alt="Close-up of two hands working a client's lower back"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              A holistic approach to healing
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cream/80">
              Renewed Bodyworks started from a desire to help others experience the restorative
              power of touch, and the body&rsquo;s own ability to heal. Scott treats the mind, body, and
              spirit together.
            </p>
            <ul className="mt-8 space-y-5">
              {[
                ["Listens first", "Scott goes over your health history and goals before every session and focuses on what you need that day."],
                ["Truly customized", "Multiple modalities in one session, from Swedish and deep tissue to trigger point and stretching."],
                ["Built for real relief", "Chronic pain, injury recovery, mobility, sports performance, or simply a calmer nervous system."],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90} dir="left" className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber text-pine-900">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-cream">{t}</p>
                    <p className="text-cream/70">{d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8">
              <LinkButton href="/why-massage" variant="amber">
                Why massage works
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Find the studios"
          title="Two studios across Oregon"
          intro="Book at whichever location suits you. Both offer the full range of services."
          center
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.key} delay={i * 90} className="h-full">
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-deep/50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading title="What clients say" center />
          <div className="mt-10">
            <Testimonials initial={seedFor(reviews)} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading title="Common questions" center />
        <div className="mt-10">
          <Faq />
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-muted">
          Still have a question? Text{" "}
          <a href={business.smsHref} className="link-sweep font-semibold text-pine hover:text-pine-deep">
            {business.phone}
          </a>{" "}
          or{" "}
          <Link href="/contact" className="link-sweep font-semibold text-pine hover:text-pine-deep">
            send a message
          </Link>
          .
        </p>
      </section>

      <CtaBand />
    </>
  );
}
