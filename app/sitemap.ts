import type { MetadataRoute } from "next";
import { SITE_URL, locations } from "@/lib/business";
import { allPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    { path: "/", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/why-massage", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/book", priority: 0.9 },
    { path: "/register", priority: 0.5 },
    { path: "/blog", priority: 0.6 },
  ];
  const locationPaths = locations.map((l) => ({ path: `/${l.slug}`, priority: 0.9 }));

  const postEntries = allPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...[...staticPaths, ...locationPaths].map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...postEntries,
  ];
}
