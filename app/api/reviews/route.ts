import { NextResponse } from "next/server";
import { getReviewData } from "@/lib/reviews";

// Lazy endpoint for the testimonials carousel. The first three quotes are
// server-rendered into the page for SEO; this is only hit when a visitor
// actually presses an arrow, so the initial load pays nothing for it.
// getReviewData is cached for a day, so repeat calls do not hit Google.
export async function GET() {
  const data = await getReviewData();
  return NextResponse.json(data, {
    headers: {
      // Safe to cache at the edge: the payload is public and changes daily.
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
