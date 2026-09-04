import Image from "next/image";
import type { Metadata } from "next";
import { business } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { LinkButton } from "@/components/Buttons";
import { RatingBadge } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "About Scott Hartzell, LMT & Renewed Bodyworks",
  description:
    "Renewed Bodyworks is the massage practice of Scott Hartzell, LMT, serving Eugene and Portland, Oregon with a holistic, client-led approach to therapeutic bodywork.",
  path: "/about",
  image: "/images/oregon-forest-path.jpg",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div>
            <p className="eyebrow mb-4">Scott&rsquo;s story</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.06] text-pine-deep sm:text-5xl md:text-6xl">
              Helping you reconnect with yourself
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Renewed Bodyworks is the practice of Scott Hartzell, LMT, focused on helping you unwind, heal, and restore. His holistic
              approach recognizes that true healing involves the mind, body, and spirit.
            </p>
            <div className="mt-8">
              <RatingBadge />
            </div>
          </div>
          <Reveal className="relative aspect-[5/4] overflow-hidden rounded-[24px] shadow-lg">
            <Image
              src="/images/oregon-forest-path.jpg"
              alt="Sunlit path through a tall Oregon evergreen forest"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="prose-lg space-y-5 text-lg leading-relaxed text-ink/90">
          <p>
            Scott first discovered the power of bodywork after sustaining a back injury. Seeing
            incredible, long-term improvement through regular treatment, massage quickly became an
            essential part of his own wellness routine. For years, his massage therapist recognized
            his passion and persistently encouraged him to pursue a massage therapy license. Scott
            finally took the leap, moving to Costa Rica for six months to immerse himself in
            studying massage therapy.
          </p>
          <Reveal className="relative aspect-[3/2] overflow-hidden rounded-[24px] shadow-lg">
            <Image
              src="/images/trigger-point-massage.jpg"
              alt="Close-up of a therapist's hand applying trigger-point pressure to a client's back"
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </Reveal>
          <p>
            Renewed Bodyworks started from that experience, a desire to help others feel the
            restorative power of touch, and the ability our bodies have to heal themselves. Scott
            creates a welcoming, calming environment for stress relief, with sessions that target
            your specific tension while promoting overall relaxation.
          </p>
          <p>
            Using a range of techniques, Scott aims to restore balance and tranquility, helping you
            reconnect with yourself and enjoy the benefits of therapeutic touch. Whether you are
            seeking chronic pain relief, sports recovery, or simple stress management, your
            priorities guide the work.
          </p>
          <p>
            Because education and lifelong learning are core pillars of his practice, Scott&rsquo;s
            journey didn&rsquo;t stop at graduation day. He remains deeply committed to constantly
            honing his skills and exploring advanced techniques, to ensure his clients always
            receive the highest level of care.
          </p>
          <p>
            Before every appointment Scott goes over your health history and goals, giving you the
            chance to share which areas to focus on or avoid, so each session is genuinely yours.
          </p>
        </div>
      </section>

      {/* Practitioner */}
      <section className="bg-pine-900 text-cream">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[24px] shadow-lg md:mx-0">
            <Image
              src="/images/scott-hartzell.jpg"
              alt="Scott Hartzell, licensed massage therapist and owner of Renewed Bodyworks"
              fill
              sizes="(max-width: 768px) 80vw, 320px"
              className="object-cover"
            />
          </Reveal>
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Scott Hartzell, LMT</h2>
            <p className="mt-4 leading-relaxed text-cream/80">
              Scott is the licensed massage therapist behind Renewed Bodyworks, practicing in both
              Eugene and Portland. His approach blends various modalities to include Deep Tissue,
              Trigger Point, Swedish, Sports, and assisted stretches in a single session, all chosen
              around your goals rather than a fixed routine. Clients describe their experience as
              intuitive, effective work that finds the source of the tension.
            </p>
            <p className="mt-4 text-sm text-cream/60">
              Licensed Massage Therapist, State of Oregon. License number displayed at each studio
              and on request.
            </p>
            <div className="mt-6">
              <LinkButton href="/services" variant="amber">
                See services
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
