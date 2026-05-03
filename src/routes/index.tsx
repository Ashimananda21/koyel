import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Slideshow } from "@/components/Slideshow";
import { WallOfMoments } from "@/components/WallOfMoments";
import { CakeSection } from "@/components/CakeSection";
import { LoveLetter } from "@/components/LoveLetter";
import { MusicToggle } from "@/components/MusicToggle";
import { HeartsBackground } from "@/components/HeartsBackground";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Happy Birthday, My Love — A Letter in Photos" },
      { name: "description", content: "A cinematic, romantic birthday tribute — moments, music, and a love letter, framed in forever." },
      { property: "og:title", content: "Happy Birthday, My Love" },
      { property: "og:description", content: "A cinematic, romantic birthday tribute crafted just for you." },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HeartsBackground />
      <div className="relative z-10">
        <Hero />
        <CakeSection />
        <Slideshow />
        <WallOfMoments />
        <LoveLetter />
        <footer className="border-t border-foreground/10 py-10 text-center text-xs tracking-[0.4em] uppercase text-foreground/50">
          made with ♥ — only for you
        </footer>
      </div>
      <MusicToggle />
    </main>
  );
}
