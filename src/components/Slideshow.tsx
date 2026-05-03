import { useEffect, useRef, useState } from "react";
import { IMAGES, ROMANTIC_QUOTES } from "@/lib/media";

const DURATION = 5000;

export function Slideshow() {
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (!paused) {
        const elapsed = now - startRef.current;
        const p = Math.min(elapsed / DURATION, 1);
        setProgress(p);
        if (p >= 1) {
          setIdx((i) => (i + 1) % IMAGES.length);
          startRef.current = now;
        }
      } else {
        startRef.current = now - progress * DURATION;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, progress]);

  const go = (delta: number) => {
    setIdx((i) => (i + delta + IMAGES.length) % IMAGES.length);
    startRef.current = performance.now();
    setProgress(0);
  };

  const quote = ROMANTIC_QUOTES[idx % ROMANTIC_QUOTES.length];

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="font-script text-3xl text-gradient-rose">Your story</p>
          <h2 className="mt-2 font-display text-5xl sm:text-6xl">
            <span className="shimmer-text">Moments,</span> <em className="italic text-gradient-rose">framed in love</em>
          </h2>
        </div>

        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-glow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Memory ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
                i === idx ? "opacity-100 ken-burns" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.12 0.03 340 / 0.85) 0%, transparent 55%)" }} />

          {/* Quote overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12">
            <p key={quote} className="font-display text-2xl italic text-foreground/95 sm:text-4xl animate-fade-in">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="mt-3 text-xs tracking-[0.3em] text-foreground/60 uppercase">
              {String(idx + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
            </p>
          </div>

          {/* Controls */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-foreground/30 bg-foreground/10 p-3 backdrop-blur transition hover:bg-foreground/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-foreground/30 bg-foreground/10 p-3 backdrop-blur transition hover:bg-foreground/25"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="absolute inset-x-0 top-0 h-1 bg-foreground/10">
            <div className="h-full bg-gradient-romance transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
