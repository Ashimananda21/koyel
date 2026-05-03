import { useState } from "react";

export function CakeSection() {
  const [cut, setCut] = useState(false);

  return (
    <section className="relative py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="font-script text-4xl md:text-5xl text-gradient-rose mb-3">A sweet little surprise</p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground/90 mb-12">
          Touch the cake, Koyel <span className="font-bengali">— তোমার জন্য</span>
        </h2>

        <button
          onClick={() => setCut(true)}
          aria-label="Cut the cake"
          className="relative mx-auto block w-[280px] h-[280px] md:w-[360px] md:h-[360px] focus:outline-none group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-3xl pulse-soft" />

          {/* Cake container */}
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Left half */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-[1400ms] ease-out ${
                cut ? "-translate-x-[140%] -rotate-12" : ""
              }`}
            >
              <CakeHalf side="left" lit={!cut} />
            </div>
            {/* Right half */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-all duration-[1400ms] ease-out ${
                cut ? "translate-x-[40%] rotate-12" : ""
              }`}
            >
              <CakeHalf side="right" lit={!cut} />
            </div>

            {/* Knife slice line flash */}
            {cut && (
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gradient-to-b from-transparent via-white to-transparent animate-[fade-out_1s_ease-out_forwards]" />
            )}
          </div>

          {!cut && (
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-foreground/60 drift">
              tap the cake ✨
            </span>
          )}
        </button>

        {/* Message */}
        <div
          className={`mt-16 transition-all duration-1000 ${
            cut ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <p className="font-script text-5xl md:text-7xl shimmer-text leading-tight">
            Many many happy returns of the day
          </p>
          <p className="font-bengali text-xl md:text-2xl text-foreground/80 mt-4">
            শুভ জন্মদিন
          </p>
        </div>
      </div>
    </section>
  );
}

function CakeHalf({ side, lit }: { side: "left" | "right"; lit: boolean }) {
  const clip = side === "left" ? "polygon(0 0, 50% 0, 50% 100%, 0 100%)" : "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)";
  return (
    <div style={{ clipPath: clip }} className="relative">
      <div className="relative w-[240px] md:w-[320px] flex flex-col items-center">
        {/* Candle */}
        <div className="relative mb-1">
          <div className="w-1.5 h-10 md:h-14 bg-gradient-to-b from-rose-300 to-rose-500 rounded-sm mx-auto" />
          {lit && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="w-3 h-5 bg-gradient-to-t from-amber-400 via-yellow-200 to-white rounded-full blur-[1px] animate-pulse" />
              <div className="absolute inset-0 w-3 h-5 bg-amber-300/60 rounded-full blur-md" />
            </div>
          )}
        </div>
        {/* Top tier */}
        <div className="w-[70%] h-12 md:h-16 rounded-t-lg bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-glow relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-100 via-white to-rose-100" style={{ clipPath: "polygon(0 50%, 10% 0, 20% 50%, 30% 0, 40% 50%, 50% 0, 60% 50%, 70% 0, 80% 50%, 90% 0, 100% 50%, 100% 100%, 0 100%)" }} />
        </div>
        {/* Mid tier */}
        <div className="w-[90%] h-16 md:h-20 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-600 relative shadow-soft">
          <div className="absolute top-0 left-0 right-0 h-2 bg-white/70" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 85% 0, 75% 100%, 65% 0, 55% 100%, 45% 0, 35% 100%, 25% 0, 15% 100%, 5% 0, 0 100%)" }} />
          <div className="absolute inset-0 flex items-center justify-around px-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-yellow-200/80" />
            ))}
          </div>
        </div>
        {/* Bottom tier */}
        <div className="w-full h-20 md:h-24 bg-gradient-to-b from-rose-400 via-rose-500 to-rose-700 rounded-b-md relative shadow-soft">
          <div className="absolute top-0 left-0 right-0 h-2 bg-white/70" style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 85% 0, 75% 100%, 65% 0, 55% 100%, 45% 0, 35% 100%, 25% 0, 15% 100%, 5% 0, 0 100%)" }} />
        </div>
        {/* Plate */}
        <div className="w-[110%] h-3 bg-gradient-to-b from-foreground/20 to-foreground/5 rounded-full mt-1" />
      </div>
    </div>
  );
}
