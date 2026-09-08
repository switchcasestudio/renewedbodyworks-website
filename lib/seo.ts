import type { Metadata } from "next";
import { SITE_URL, business } from "./business";

// Builds per-page metadata with a unique title + description and a canonical
// URL (audit SEO-04). Titles lead with service + city.
export function pageMeta({
  title,
  description,
  path,
  image = "/images/hero-poster.webp",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  // The `title.template` in the root layout only rewrites <title>; Open Graph
  // and Twitter titles are passed through untouched, so brand them here rather
  // than baking the suffix into each page's `title` and doubling it up.
  const social = title.includes(business.name) ? title : `${title} | ${business.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: social,
      description,
      url,
      siteName: business.name,
      type: "website",
      locale: "en_US",
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: [`${SITE_URL}${image}`],
    },
  };
}
