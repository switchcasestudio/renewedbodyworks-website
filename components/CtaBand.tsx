import Image from "next/image";
import { locations } from "@/lib/business";
import { BookButton, PhoneLink } from "./Buttons";

// Full-width closing CTA over the Oregon evergreen photo. Ties the page back to
// Scott's pine/mountain brand mark.
export default function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/oregon-evergreen-aerial.jpg"
        alt="Aerial view of an evergreen forest road in Oregon"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-pine-900/80" />
      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
        <p className="eyebrow mb-3 text-amber-soft">Two Oregon studios</p>
        <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl md:text-[2.75rem]">
          Ready to feel renewed?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-cream/80">
          Book online in Eugene or Portland, or call and Scott will find a time that works. New
          clients start with a short intake so every session fits your body.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <BookButton href={locations[0].bookingUrl} event="book_click_eugene" variant="amber">
            Book in Eugene
          </BookButton>
          <BookButton href={locations[1].bookingUrl} event="book_click_portland" variant="amber">
            Book in Portland
          </BookButton>
          <PhoneLink
            variant="outline"
            className="border-cream/40 text-cream hover:bg-cream hover:text-pine-deep"
          />
        </div>
      </div>
    </section>
  );
}
