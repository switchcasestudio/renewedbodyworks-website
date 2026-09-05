// ---------------------------------------------------------------------------
// Live Google review data.
//
// The rating and the review COUNT are fetched on the server and baked into the
// static HTML, so every place the number appears (hero badge, trust strip,
// testimonials link, JSON-LD aggregateRating) shows the same live figure and
// search engines see it without running JavaScript. Revalidates daily.
//
// Google's Places API returns at most 5 reviews per place and offers no
// pagination, so `fetchGoogleReviews` is capped there by the API, not by us.
// The curated quotes in lib/business.ts remain the floor: if the key is
// missing or Google is down, the site renders exactly as it does today.
//
// Setup: set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID (see .env.example).
// ---------------------------------------------------------------------------

import { business, testimonials } from "./business";

export type Review = {
  quote: string;
  name: string;
  role: string;
  /** ISO date, when Google supplies one. Used only for ordering. */
  publishedAt?: string;
};

export type ReviewData = {
  /** "5.0" */
  rating: string;
  /** Total number of Google reviews on the profile. */
  count: number;
  reviews: Review[];
  /** Where the numbers came from, so the UI can avoid over-claiming. */
  source: "google" | "fallback";
};

/** What the carousel is seeded with: the first page plus a "there is more" flag. */
export type ReviewSeed = ReviewData & { hasMore: boolean };

/**
 * Only the first page of quotes goes into the HTML. That is what search
 * engines need and what the visitor sees first; the rest is a click away via
 * /api/reviews, so the initial document stays small.
 */
export function seedFor(data: ReviewData, pageSize = 3): ReviewSeed {
  return {
    ...data,
    reviews: data.reviews.slice(0, pageSize),
    hasMore: data.reviews.length > pageSize,
  };
}

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const ONE_DAY = 86400;

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: {
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string };
    publishTime?: string;
    rating?: number;
  }[];
};

/** The site's own numbers, used whenever Google is unavailable. */
export function fallbackReviewData(): ReviewData {
  return {
    rating: business.rating.value,
    count: business.rating.count,
    reviews: testimonials.map((t) => ({ ...t })),
    source: "fallback",
  };
}

/**
 * Server-side only. Cached for a day, so a page render costs no network call
 * in the common case and the numbers still refresh without a redeploy.
 */
export async function getReviewData(): Promise<ReviewData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return fallbackReviewData();

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: ONE_DAY },
    });
    if (!res.ok) return fallbackReviewData();

    const data = (await res.json()) as PlacesResponse;
    const count = typeof data.userRatingCount === "number" ? data.userRatingCount : null;
    const rating = typeof data.rating === "number" ? data.rating.toFixed(1) : null;

    // Only 5-star reviews with actual text are worth showing as testimonials.
    const live: Review[] = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 5)
      .map((r) => ({
        quote: (r.originalText?.text ?? r.text?.text ?? "").trim(),
        name: r.authorAttribution?.displayName?.trim() || "Google reviewer",
        role: "Google review",
        publishedAt: r.publishTime,
      }))
      .filter((r) => r.quote.length > 0);

    const fallback = fallbackReviewData();
    return {
      rating: rating ?? fallback.rating,
      count: count ?? fallback.count,
      reviews: mergeReviews(fallback.reviews, live),
      source: count === null ? "fallback" : "google",
    };
  } catch {
    return fallbackReviewData();
  }
}

/**
 * Curated quotes lead (they are the ones vetted for the page), then any Google
 * review we do not already have. Matching on author name plus the opening of
 * the quote catches the same review even after Google reflows its text.
 */
export function mergeReviews(curated: Review[], live: Review[]): Review[] {
  const seen = new Set(curated.map(fingerprint));
  const extra = live.filter((r) => !seen.has(fingerprint(r)));
  return [...curated, ...extra];
}

function fingerprint(r: Review): string {
  return `${r.name.toLowerCase()}|${r.quote.slice(0, 40).toLowerCase()}`;
}
