import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { MindbodyRegistration } from "@/components/Mindbody";

export const metadata: Metadata = pageMeta({
  title: "Create Your Account | Renewed Bodyworks",
  description:
    "Create your Renewed Bodyworks client account to book massage in Eugene or Portland, Oregon and check out faster next time.",
  path: "/register",
});

export default function RegisterPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book", path: "/book" },
          { name: "Register", path: "/register" },
        ])}
      />

      <section className="hero-wash">
        <div className="stagger-in mx-auto max-w-3xl px-4 pt-16 pb-8 text-center sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">New clients</p>
          <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl md:text-[3.5rem]">
            Create your account
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Takes about a minute. Once you&rsquo;re set up, head to{" "}
            <Link href="/book" className="link-sweep font-semibold text-pine hover:text-pine-deep">
              the booking page
            </Link>{" "}
            to pick your time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <div className="rounded-[18px] border border-pine/10 bg-white p-3 shadow-sm sm:p-6">
          <MindbodyRegistration />
        </div>
      </section>
    </>
  );
}
