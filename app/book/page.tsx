import type { Metadata } from "next";
import Link from "next/link";
import { business, locations } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { MindbodyAppointments } from "@/components/Mindbody";

export const metadata: Metadata = pageMeta({
  title: "Book Online | Massage in Eugene & Portland",
  description:
    "Book a massage with Scott Hartzell, LMT in Eugene or Portland, Oregon. Pick your service, studio, and time and confirm online in a minute.",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
        ])}
      />

      <section className="hero-wash">
        <div className="stagger-in mx-auto max-w-3xl px-4 pt-16 pb-8 text-center sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">Book online</p>
          <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl md:text-[3.5rem]">
            Pick a service, a studio, and a time
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Choose {locations.map((l) => l.city).join(" or ")}, then confirm your appointment below.
            First time here?{" "}
            <Link href="/register" className="link-sweep font-semibold text-pine hover:text-pine-deep">
              Create your account
            </Link>{" "}
            first so checkout is quick.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">
        <div className="rounded-[18px] border border-pine/10 bg-white p-3 shadow-sm sm:p-6">
          <MindbodyAppointments />
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Prefer to talk it through? Text Scott at{" "}
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
    </>
  );
}
