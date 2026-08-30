import Image from "next/image";
import type { Metadata } from "next";
import { benefits } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = pageMeta({
  title: "Why Massage? Benefits of Massage Therapy",
  description:
    "From stress and pain relief to better sleep, flexibility, and faster recovery, see how regular massage therapy improves physical and mental health at Renewed Bodyworks.",
  path: "/why-massage",
  image: "/images/why-massage-sunrise.jpg",
});

export default function WhyMassagePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Why Massage", path: "/why-massage" },
        ])}
      />

      {/* Hero over sunrise image — matches the sunrise in Scott's logo */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/why-massage-sunrise.jpg"
          alt="Person meditating at sunrise, framed by warm morning light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pine-900/70" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:py-32">
          <h1 className="font-display text-4xl font-semibold text-cream sm:text-5xl md:text-6xl">
            Why massage?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
            Massage therapy offers a range of benefits that meaningfully improve both physical and
            mental health, and it encourages a deeper awareness of the body and mind.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          title="Nine reasons to make it a habit"
          intro="Integrating massage into your lifestyle can yield significant benefits, making it an essential practice for overall well-being."
          center
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal
              key={b.title}
              delay={(i % 3) * 80}
              className="rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm"
            >
              <span className="font-display text-4xl font-semibold text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 font-display text-2xl font-semibold text-pine-deep">{b.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl rounded-[18px] bg-pine px-8 py-10 text-center text-cream">
          <p className="font-display text-2xl leading-snug sm:text-3xl">
            And Scott&rsquo;s favorite reason, because it just feels good.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
