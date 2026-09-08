import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, business } from "@/lib/business";
import { organizationSchema, personSchema } from "@/lib/schema";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Therapeutic Massage in Eugene & Portland, OR | Renewed Bodyworks",
    template: "%s | Renewed Bodyworks",
  },
  description:
    "Renewed Bodyworks offers therapeutic, Swedish, sports, and customized massage in Eugene and Portland, Oregon. Rated 5.0 on Google. Book online today.",
  applicationName: business.name,
  keywords: [
    "massage Eugene OR",
    "massage Portland OR",
    "therapeutic massage",
    "deep tissue massage",
    "sports massage",
    "Swedish massage",
    "licensed massage therapist Oregon",
  ],
  authors: [{ name: business.practitioner }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/renewed-logo.png", apple: "/renewed-logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh">
        <JsonLd data={[organizationSchema(), personSchema()]} />
        <a
          href="#main"
          className="press sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-pine focus:px-4 focus:py-2 focus:text-cream focus:shadow-lg focus:shadow-pine/30"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookingBar />
        <Analytics />
      </body>
    </html>
  );
}
