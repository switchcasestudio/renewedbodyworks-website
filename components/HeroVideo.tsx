"use client";

import { useEffect, useRef } from "react";

// React strips the `muted` attribute from SSR HTML (facebook/react#10389),
// so the browser refuses to autoplay. Re-assert muted and kick playback on mount.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const kick = () => {
      el.muted = true;
      el.play().catch(() => {
        /* poster stays visible if autoplay is still blocked */
      });
    };
    kick();
    // Chrome pauses muted video in hidden tabs; resume when the tab is shown.
    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return (
    <video
      ref={ref}
      src="/videos/hero.mp4"
      poster="/images/hero-deep-tissue.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Scott Hartzell giving a therapeutic massage at Renewed Bodyworks"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
