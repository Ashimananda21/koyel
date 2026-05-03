import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/media";

const HERO_PICKS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((i) => IMAGES[i % IMAGES.length]);

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_PICKS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {HERO_PICKS.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt=""
            className="h-full w-full object-contain bg-#E07A9B ken-burns"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-noir/30 to-noir" style={{ background: "linear-gradient(to bottom, oklch(0.12 0.03 340 / 0.55), oklch(0.12 0.03 340 / 0.35), oklch(0.12 0.03 340))" }} />
      <div className="absolute inset-0 bg-aurora opacity-70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-6xl font-light leading-[1.05] sm:text-8xl md:text-9xl">
          <span className="italic text-gradient-rose">HAPPY BIRTHDAY TO YOU DEAR</span>
          <br />
          <span className="italic text-gradient-rose">KOYEL</span>
        </h1>

        <a
          href="#gallery"
          className="mt-12 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-8 py-3 text-sm font-medium tracking-widest uppercase backdrop-blur transition-all hover:border-foreground/50 hover:bg-foreground/10"
        >
          Open the memories
          <span aria-hidden>↓</span>
        </a>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-foreground/50 drift">
        <span className="text-xs tracking-[0.4em] uppercase">scroll</span>
      </div>
    </section>
  );
}
