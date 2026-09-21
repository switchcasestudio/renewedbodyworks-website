import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { allPosts, formatPostDate } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = pageMeta({
  title: "Massage Therapy Blog: Advice from a Licensed Therapist",
  description:
    "Plain-language advice on massage therapy, recovery, and getting more from your sessions, from Scott Hartzell, LMT at Renewed Bodyworks in Eugene and Portland, Oregon.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = allPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="hero-wash">
        <div className="stagger-in mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 lg:pt-20">
          <p className="eyebrow mb-4">The Renewed Bodyworks blog</p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] text-pine-deep sm:text-5xl md:text-6xl">
            Notes on massage, recovery, and feeling better in your body
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Straight answers to the questions clients ask most, so you can get more out of every
            session.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {lead && (
          <Reveal
            as="article"
            className="lift group overflow-hidden rounded-[24px] border border-pine/10 bg-white shadow-sm"
          >
            <Link href={`/blog/${lead.slug}`} className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[360px]">
                <Image
                  src={lead.image}
                  alt={lead.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-sm text-muted">
                  <time dateTime={lead.date}>{formatPostDate(lead.date)}</time>
                  <span aria-hidden> · </span>
                  {lead.readMinutes} min read
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-pine-deep sm:text-4xl">
                  {lead.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{lead.description}</p>
                <span className="arrow-link mt-6 inline-block text-sm font-semibold text-pine">
                  Read the post <span className="arrow">&rarr;</span>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal
                key={post.slug}
                as="article"
                delay={(i % 3) * 80}
                className="lift group overflow-hidden rounded-[18px] border border-pine/10 bg-white shadow-sm"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="img-zoom object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden> · </span>
                      {post.readMinutes} min read
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-pine-deep">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{post.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <CtaBand />
    </>
  );
}
