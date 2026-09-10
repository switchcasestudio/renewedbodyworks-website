import { SITE_URL, business, locations, services, faqs, type Location } from "./business";

// Maps our published hour labels to schema.org OpeningHoursSpecification.
const dayMap: Record<string, string[]> = {
  "Mon - Fri": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "Mon - Wed": ["Monday", "Tuesday", "Wednesday"],
  "Thu - Fri": ["Thursday", "Friday"],
  Saturday: ["Saturday"],
  Sunday: ["Sunday"],
  Thursday: ["Thursday"],
};

function openingHours(loc: Location) {
  return loc.hours
    .filter((h) => h.open && h.close)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayMap[h.days] ?? [h.days],
      opens: h.open,
      closes: h.close,
    }));
}

/**
 * One MassageTherapy node per physical location (audit SEO-06).
 * Pass the live rating so the structured data cannot drift from the number
 * rendered on the page; falls back to the static figure when omitted.
 */
export function localBusinessSchema(
  loc: Location,
  rating: { value: string; count: number } = business.rating,
) {
  return {
    "@context": "https://schema.org",
    "@type": ["MassageTherapy", "HealthAndBeautyBusiness", "LocalBusiness"],
    "@id": `${SITE_URL}/${loc.slug}#business`,
    name: `${business.name} - ${loc.city}`,
    image: `${SITE_URL}/images/hero-poster.webp`,
    url: `${SITE_URL}/${loc.slug}`,
    telephone: business.phone,
    email: business.email,
    priceRange: "$50-$165",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.addressLocality,
      addressRegion: loc.addressRegion,
      postalCode: loc.postalCode,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
    openingHoursSpecification: openingHours(loc),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${business.name} ${loc.streetAddress} ${loc.addressLocality} ${loc.addressRegion}`,
    )}`,
    areaServed: { "@type": "City", name: loc.addressLocality },
    founder: { "@type": "Person", name: "Scott Hartzell", jobTitle: "Licensed Massage Therapist" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating.value,
      reviewCount: rating.count,
      bestRating: "5",
    },
    makesOffer: services.flatMap((s) =>
      s.durations.map((d) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: d.price,
        itemOffered: {
          "@type": "Service",
          name: `${s.name} (${d.minutes} min)`,
          serviceType: s.name,
        },
      })),
    ),
    sameAs: [loc.bookingUrl],
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Scott Hartzell",
    jobTitle: "Licensed Massage Therapist",
    worksFor: { "@type": "Organization", name: business.legalName },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: `Oregon Licensed Massage Therapist #${business.license}`,
      recognizedBy: { "@type": "Organization", name: "Oregon Board of Massage Therapists" },
    },
    telephone: business.phone,
    email: business.email,
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: business.name,
    legalName: business.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/renewed-logo.png`,
    image: `${SITE_URL}/images/hero-poster.webp`,
    telephone: business.phone,
    email: business.email,
    location: locations.map((l) => ({ "@id": `${SITE_URL}/${l.slug}#business` })),
    sameAs: locations.map((l) => l.bookingUrl),
  };
}
