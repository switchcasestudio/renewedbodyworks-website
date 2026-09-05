"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// React strips the `muted` attribute from SSR HTML (facebook/react#10389),
// so the browser refuses to autoplay. Re-assert muted and kick playback on mount.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  // The poster is the video's own first frame in its own layer, and the video
  // cross-fades over it once frames are rolling. If autoplay stays blocked,
  // `playing` never flips and the poster is what the visitor sees.
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
    <div className="absolute inset-0">
      <Image
        src="/images/hero-poster.webp"
        alt="Scott Hartzell working a client's neck and shoulders at Renewed Bodyworks"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        ref={ref}
        poster="/images/hero-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlaying={() => setPlaying(true)}
        data-playing={playing}
        aria-label="Scott Hartzell giving a therapeutic massage at Renewed Bodyworks"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      >
        {/* VP9 first: roughly 20% smaller than the H.264 at matching quality. */}
        <source src="/videos/hero-720.webm" type="video/webm" />
        <source src="/videos/hero-720.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
