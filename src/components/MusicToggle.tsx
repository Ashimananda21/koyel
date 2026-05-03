import { useEffect, useRef, useState } from "react";
import { MUSIC_SRC } from "@/lib/media";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    // Try autoplay
    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // Browser blocked — wait for first interaction
        const onFirst = async () => {
          try {
            await audio.play();
            setPlaying(true);
          } catch {}
          window.removeEventListener("click", onFirst);
          window.removeEventListener("touchstart", onFirst);
          window.removeEventListener("keydown", onFirst);
        };
        window.addEventListener("click", onFirst, { once: true });
        window.addEventListener("touchstart", onFirst, { once: true });
        window.addEventListener("keydown", onFirst, { once: true });
      }
    };
    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-romance text-foreground shadow-glow pulse-soft backdrop-blur transition-transform hover:scale-110"
    >
      {playing ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
