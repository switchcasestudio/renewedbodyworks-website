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
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: business.name,
      type: "website",
      locale: "en_US",
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: business.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${image}`],
    },
  };
}
