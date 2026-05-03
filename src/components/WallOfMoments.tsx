import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/media";

export function WallOfMoments() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open === null) return;
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % IMAGES.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="font-script text-3xl text-gradient-rose">A Wall of Yours</p>
          <h2 className="mt-2 font-display text-5xl sm:text-6xl">
            <em className="italic shimmer-text">Every</em> <span className="text-gradient-rose">moment matters</span>
          </h2>
        </div>

        <div className="masonry">
          {IMAGES.map((src, i) => (
            <button
              key={src}
              onClick={() => setOpen(i)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-soft transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={src}
                alt={`Moment ${i + 1}`}
                loading="lazy"
                className="w-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "linear-gradient(to top, oklch(0.55 0.22 18 / 0.5), transparent 60%)" }} />
              <span className="pointer-events-none absolute bottom-3 left-4 font-script text-2xl text-foreground opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                ♥ {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-xl animate-fade-in"
          style={{ background: "oklch(0.12 0.03 340 / 0.95)" }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(null); }}
            className="absolute right-6 top-6 rounded-full border border-foreground/30 bg-foreground/10 p-3 hover:bg-foreground/20"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length)); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-foreground/10 p-3 hover:bg-foreground/20"
            aria-label="Previous"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i + 1) % IMAGES.length)); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-foreground/30 bg-foreground/10 p-3 hover:bg-foreground/20"
            aria-label="Next"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          <img
            src={IMAGES[open]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-glow animate-scale-in"
          />
        </div>
      )}
    </section>
  );
}
