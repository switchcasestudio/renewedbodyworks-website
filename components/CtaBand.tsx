import Image from "next/image";
import Reveal from "./Reveal";
import { BookNow, PhoneLink } from "./Buttons";

// Full-width closing CTA over the Oregon evergreen photo. Ties the page back to
// Scott's pine/mountain brand mark. One booking button, not a Eugene/Portland
// pair competing for the same click.
export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/oregon-evergreen-aerial.webp"
        alt="Aerial view of an evergreen forest road in Oregon"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-pine-900/80" />
      <Reveal className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
        <p className="eyebrow mb-3 text-amber-soft">Two Oregon studios</p>
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl md:text-[2.75rem]">
          Ready to feel renewed?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
          Book online at either studio, or text and Scott will find a time that works. New clients
          start with a short intake so every session fits your body.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <BookNow variant="amber" />
          <PhoneLink variant="creamOutline" />
        </div>
      </Reveal>
    </section>
  );
}
