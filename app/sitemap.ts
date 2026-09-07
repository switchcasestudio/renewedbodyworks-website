import type { MetadataRoute } from "next";
import { SITE_URL, locations } from "@/lib/business";

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
  ];
  const locationPaths = locations.map((l) => ({ path: `/${l.slug}`, priority: 0.9 }));

  return [...staticPaths, ...locationPaths].map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.priority,
  }));
}
