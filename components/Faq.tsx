"use client";

import { useState } from "react";
import { faqs } from "@/lib/business";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-pine/10 overflow-hidden rounded-[18px] border border-pine/10 bg-white shadow-sm">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="row-hover">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="press flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pine/40"
              >
                <span
                  className={`font-display text-xl font-semibold transition-colors duration-200 ${
                    isOpen ? "text-pine" : "text-pine-deep"
                  }`}
                >
                  {f.q}
                </span>
                {/* Plus rotates to a close cross - the same glyph, re-oriented. */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                  className={`faq-icon shrink-0 text-pine transition-transform duration-300 ease-snappy ${
                    isOpen ? "rotate-[135deg]" : ""
                  }`}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div id={`faq-panel-${i}`} data-open={isOpen} className="disclose">
              <div>
                <p className="px-6 pb-5 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
