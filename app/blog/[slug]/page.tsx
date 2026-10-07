import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { business } from "@/lib/business";
import { pageMeta } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { allPosts, formatPostDate, getPost } from "@/lib/posts";
import JsonLd from "@/components/JsonLd";
import PostBody from "@/components/PostBody";
import CtaBand from "@/components/CtaBand";

type Params = { params: Promise<{ slug: string }> };

// Posts are data in lib/posts.ts, so every slug is known at build time.
export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = allPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          ...(post.faqs?.length ? [faqSchema(post.faqs)] : []),
        ]}
      />

      <article>
        <header className="hero-wash">
          <div className="stagger-in mx-auto max-w-3xl px-4 pt-14 pb-10 sm:px-6 lg:pt-20">
            <Link
              href="/blog"
              className="link-sweep text-sm font-semibold text-pine hover:text-pine-deep"
            >
              &larr; All posts
            </Link>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-pine-deep sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden> · </span>
              {post.readMinutes} min read
              <span aria-hidden> · </span>
              {business.name}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] shadow-lg shadow-pine/15">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 pt-10 pb-16 sm:px-6">
          <PostBody blocks={post.body} />

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-6 font-display text-3xl font-semibold leading-tight text-pine-deep">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {post.faqs.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-pine-deep">{f.q}</dt>
                    <dd className="mt-2 text-[17px] leading-[1.8] text-ink/90">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <aside className="mt-12 flex items-center gap-5 rounded-[18px] border border-pine/10 bg-white p-6 shadow-sm">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/scott-hartzell.webp"
                alt="Scott Hartzell, LMT"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <p className="text-[15px] leading-relaxed text-muted">
              <span className="font-semibold text-pine-deep">{business.practitioner}</span> is the
              licensed massage therapist behind {business.name} (Oregon LMT #{business.license}),
              with studios in Eugene and Portland.{" "}
              <Link
                href="/about"
                className="font-medium text-pine underline decoration-pine/30 underline-offset-4 hover:decoration-pine"
              >
                Meet Scott
              </Link>
            </p>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <h2 className="mb-5 font-display text-2xl font-semibold text-pine-deep">Keep reading</h2>
          <ul className="space-y-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="link-sweep arrow-link font-semibold text-pine hover:text-pine-deep"
                >
                  {p.title} <span className="arrow">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand />
    </>
  );
}
