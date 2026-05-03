import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/media";

const BG_IMAGES = IMAGES.slice(20, 41);

export function LoveLetter() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* 🔥 BACKGROUND SLIDESHOW */}
      <div className="absolute inset-0">
        {BG_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-contain brightness-[0.6] scale-110 transition-transform duration-[6000ms] ease-linear"
            />
          </div>
        ))}
      </div>

      {/* 🔥 GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* 🔥 TEXT CONTENT */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-3xl text-left text-[#fdf6ee]">

          {/* TOP LABEL */}
          <p className="text-center text-sm tracking-[0.6em] text-[#c9a96e] mb-10 font-light">
            A LETTER FOR YOU
          </p>

          {/* GREETING */}
          <p className="text-2xl md:text-3xl italic mb-6 text-white
          [text-shadow:0_0_8px_rgba(0,0,0,0.9)]">
            My dearest,
          </p>

          {/* BODY */}
          <div className="mt-8 space-y-8 font-script text-white text-2xl md:text-3xl leading-snug
          [text-shadow:0_0_8px_rgba(0,0,0,0.9),0_0_16px_rgba(0,0,0,0.6)]">
           <p>
              On this day the world received its softest gift — <em className="text-gradient-rose">KOYEL</em>.
              And somewhere along the way, my heart received its home.
            </p>
            <p>
              Every photograph above is a small forever — a glance, a laugh, a quiet evening
              that became the loudest joy of my life.
            </p>
            <p>I am lucky to have you as my friend... </p>
            <p>Hope your birthday is as special as you are. </p>
            <p>May God grant all your wishes and all of your dreams come true.</p>
            <p>Thanks for being such a great friend. 
              Happy birthday, dear friend.
            </p>
          </div>

          {/* SIGNATURE */}
          <div className="mt-12 text-xl md:text-2xl italic text-white
          [text-shadow:0_0_8px_rgba(0,0,0,0.9)]">
            <p>Forever yours,</p>
            <p>Your person 💛</p>
          </div>

        </div>
      </div>
    </section>
  );
}