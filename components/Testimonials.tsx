"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import type { Review, ReviewData, ReviewSeed } from "@/lib/reviews";
import { Stars, GoogleG } from "./icons";

// The first page of quotes is server-rendered into the HTML for SEO. Google
// caps its API at 5 reviews per place with no pagination, so there is a small
// ceiling here by design; the first arrow press fetches whatever else exists
// from /api/reviews, and every press after that is in-memory.
export default function Testimonials({ initial }: { initial: ReviewSeed }) {
  const [reviews, setReviews] = useState<Review[]>(initial.reviews);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initial.hasMore);
  const fetched = useRef(false);

  // Track how many cards fit so paging matches what the visitor can see.
  useEffect(() => {
    const mqTablet = window.matchMedia("(min-width: 768px)");
    const sync = () => setPerPage(mqTablet.matches ? 3 : 1);
    sync();
    mqTablet.addEventListener("change", sync);
    return () => mqTablet.removeEventListener("change", sync);
  }, []);

  // Pull the rest of the reviews the first time someone asks for more, and
  // hand the caller the resulting list so the very first press can page onto
  // freshly arrived quotes rather than wrapping around to the start.
  const loadMore = useCallback(async (): Promise<Review[]> => {
    if (fetched.current) return reviews;
    fetched.current = true;
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      if (!res.ok) return reviews;
      const data = (await res.json()) as ReviewData;
      if (!Array.isArray(data.reviews) || data.reviews.length <= reviews.length) {
        setHasMore(false);
        return reviews;
      }
      setReviews(data.reviews);
      setHasMore(false); // /api/reviews returns the complete set in one go
      return data.reviews;
    } catch {
      setHasMore(false);
      return reviews; // keep whatever is already on screen
    } finally {
      setLoading(false);
    }
  }, [reviews]);

  const pageCount = Math.max(1, Math.ceil(reviews.length / perPage));
  const current = Math.min(page, pageCount - 1);
  const visible = reviews.slice(current * perPage, current * perPage + perPage);

  async function go(delta: number) {
    const list = await loadMore();
    const pages = Math.max(1, Math.ceil(list.length / perPage));
    setPage((p) => {
      const next = Math.min(p, pages - 1) + delta;
      if (next < 0) return pages - 1;
      if (next > pages - 1) return 0;
      return next;
    });
  }

  // Controls appear when there is somewhere to go: either more quotes are
  // waiting on the server, or the ones we have span more than one page (which
  // is the usual case on mobile, where only one card fits).
  const showControls = hasMore || reviews.length > perPage;

  return (
    <>
      <div className="relative">
        <div
          className="grid gap-6 md:grid-cols-3"
          aria-live="polite"
          aria-busy={loading}
        >
          {visible.map((t, i) => (
            <figure
              key={`${t.name}-${t.quote.slice(0, 16)}`}
              style={{ animationDelay: `${i * 70}ms` }}
              className="lift animate-fade-up flex flex-col rounded-[18px] border border-pine/10 bg-white p-7 shadow-sm"
            >
              <Stars className="mb-4" />
              <blockquote className="font-display text-xl leading-snug text-pine-deep">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted">
                <span className="font-semibold text-ink">{t.name}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>

        {showControls && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselButton label="Previous reviews" onClick={() => void go(-1)} dir="prev" />
            <p className="min-w-[4.5rem] text-center text-sm tabular-nums text-muted">
              {loading ? "Loading…" : `${current + 1} / ${pageCount}`}
            </p>
            <CarouselButton label="Next reviews" onClick={() => void go(1)} dir="next" />
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <a
          href={business.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-sweep arrow-link inline-flex items-center gap-2 font-semibold text-pine hover:text-pine-deep"
        >
          <GoogleG size={18} />
          Read all {initial.count} reviews on Google <span className="arrow">&rarr;</span>
        </a>
      </div>
    </>
  );
}

function CarouselButton({
  label,
  onClick,
  dir,
}: {
  label: string;
  onClick: () => void;
  dir: "prev" | "next";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="press raise flex h-11 w-11 items-center justify-center rounded-full border border-pine/25 bg-white text-pine shadow-sm hover:border-pine hover:bg-pine hover:text-cream hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {dir === "prev" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  );
}
