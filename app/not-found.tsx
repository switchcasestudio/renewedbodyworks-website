import Link from "next/link";
import { LinkButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="eyebrow mb-3">Page not found</p>
      <h1 className="font-display text-4xl font-semibold text-pine-deep sm:text-5xl">
        Let&rsquo;s get you back on track
      </h1>
      <p className="mt-4 text-lg text-muted">
        The page you&rsquo;re looking for has moved. Try the services page or book a session.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <LinkButton href="/" variant="primary">Back home</LinkButton>
        <LinkButton href="/services" variant="outline">View services</LinkButton>
      </div>
      <Link href="/contact" className="mt-6 text-sm font-semibold text-pine hover:text-pine-deep">
        Get in touch →
      </Link>
    </section>
  );
}
