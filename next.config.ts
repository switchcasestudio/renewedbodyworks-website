import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All imagery is self-hosted under /public/images, so no remotePatterns needed.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // 301 the old Wix default slugs to the new clean URLs (audit SEO-05).
  async redirects() {
    return [
      { source: "/home-1", destination: "/about", permanent: true },
      { source: "/home-1-1", destination: "/services", permanent: true },
      { source: "/home-1-2", destination: "/why-massage", permanent: true },
      { source: "/blank", destination: "/contact", permanent: true },
      { source: "/fullscreen-page", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
