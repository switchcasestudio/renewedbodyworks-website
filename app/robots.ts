import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/business";

// Permissive robots + sitemap pointer. The old Wix site served a site-wide
// noindex (audit SEO-01); this rebuild is fully indexable.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
