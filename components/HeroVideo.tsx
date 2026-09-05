"use client";

import { useEffect, useRef, useState } from "react";

// React strips the `muted` attribute from SSR HTML (facebook/react#10389),
// so the browser refuses to autoplay. Re-assert muted and kick playback on mount.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  // The poster sits in its own layer and the video cross-fades over it once
  // frames are actually rolling — a hard cut on first frame reads as a glitch.
  // If autoplay stays blocked, `playing` never flips and the poster remains.
  const [playing, setPlaying] = useState(false);

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
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url(/images/hero-deep-tissue.jpg)" }}
    >
      <video
        ref={ref}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setPlaying(true)}
        data-playing={playing}
        aria-label="Scott Hartzell giving a therapeutic massage at Renewed Bodyworks"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
