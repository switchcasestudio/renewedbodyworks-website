"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// The still poster is the hero's LCP element, so it gets the network to itself:
// the ~1.5 MB video is only attached after the page has finished loading and
// the browser is idle. The video then cross-fades in over the poster once
// frames are rolling. If autoplay is blocked (or the visitor has Save-Data
// on), `playing` never flips and the poster is what they see.
//
// React strips the `muted` attribute from SSR HTML (facebook/react#10389),
// so muted is re-asserted before every play() call.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Wait for window load + idle before fetching the video.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setLoadVideo(true), { timeout: 2000 });
      } else {
        timeoutId = setTimeout(() => setLoadVideo(true), 200);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  // Once sources are attached, start playback (and resume when the tab is shown,
  // since Chrome pauses muted video in hidden tabs).
  useEffect(() => {
    const el = ref.current;
    if (!loadVideo || !el) return;
    const kick = () => {
      el.muted = true;
      el.play().catch(() => {
        /* poster stays visible if autoplay is blocked */
      });
    };
    el.load();
    kick();
    const onVisible = () => {
      if (document.visibilityState === "visible") kick();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [loadVideo]);

  return (
    <div className="absolute inset-0">
      <Image
        src="/images/hero-poster.webp"
        alt="Scott Hartzell working a client's neck and shoulders at Renewed Bodyworks"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      {/* No `poster` attribute: the Image above already shows the same frame,
          and a poster would download the full-size file a second time. */}
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        data-playing={playing}
        aria-label="Scott Hartzell giving a therapeutic massage at Renewed Bodyworks"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      >
        {loadVideo && (
          <>
            {/* VP9 first: roughly 20% smaller than the H.264 at matching quality. */}
            <source src="/videos/hero-720.webm" type="video/webm" />
            <source src="/videos/hero-720.mp4" type="video/mp4" />
          </>
        )}
      </video>
    </div>
  );
}
