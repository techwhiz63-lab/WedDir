import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { WeddingMarquee } from "@/components/WeddingMarquee";
import { CoupleSection } from "@/components/CoupleSection";
import { StorySection } from "@/components/StorySection";
import { GallerySection } from "@/components/GallerySection";
import { WeddingEventSection } from "@/components/WeddingEventSection";
import { ReceptionEventSection } from "@/components/ReceptionEventSection";
import { FamilySection } from "@/components/FamilySection";
import { PeopleSection } from "@/components/PeopleSection";
import { GreetingSection } from "@/components/GreetingSection";
import { FooterSection } from "@/components/FooterSection";
import { SiteLoadingComponent } from "@/components/SiteLoadingComponent";
import { FloatingDock } from "@/components/FloatingDock";
import { ClickSpark } from "@/components/ClickSpark";
import AnimatedContent from "@/components/AnimatedContent";
import { weddingData } from "@/data/weddingData";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userMutedRef = useRef(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const startMusicImmediately = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userMutedRef.current) return;
    if (!audio.paused && !audio.muted) return;

    audio.muted = false;
    audio.volume = 0.4;

    // Mobile Safari/Chrome requires load() if metadata hasn't buffered yet
    if (audio.readyState === 0) {
      audio.load();
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          setIsMuted(true);
        });
    }
  }, []);

  useEffect(() => {
    // Attempt autoplay immediately on desktop
    startMusicImmediately();

    // Retry on every user tap/click until mobile browser unlocks audio
    const handleFirstInteraction = () => {
      const audio = audioRef.current;
      if (!audio || userMutedRef.current) return;

      if (!audio.paused && !audio.muted) {
        cleanup();
        return;
      }

      audio.muted = false;
      audio.volume = 0.4;
      if (audio.readyState === 0) {
        audio.load();
      }

      audio
        .play()
        .then(() => {
          setIsMuted(false);
          cleanup();
        })
        .catch(() => {});
    };

    const cleanup = () => {
      window.removeEventListener("click", handleFirstInteraction, true);
      window.removeEventListener("touchend", handleFirstInteraction, true);
      window.removeEventListener("keydown", handleFirstInteraction, true);
    };

    window.addEventListener("click", handleFirstInteraction, true);
    window.addEventListener("touchend", handleFirstInteraction, true);
    window.addEventListener("keydown", handleFirstInteraction, true);

    return cleanup;
  }, [startMusicImmediately]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || isMuted) {
      userMutedRef.current = false;
      audio.muted = false;
      audio.volume = 0.4;
      if (audio.readyState === 0) {
        audio.load();
      }
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      userMutedRef.current = true;
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <ClickSpark>
      <audio
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        loop
        playsInline
        preload="auto"
      />

      {isLoading ? (
        <SiteLoadingComponent
          onUserEnter={startMusicImmediately}
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <div
          id="home"
          className="relative min-h-screen w-full overflow-x-hidden bg-[#FDF6EC] text-stone-800"
        >
          {/* Top Royal Gold Scroll Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-800 via-amber-400 to-rose-800 origin-left z-50"
          />

          {/* Lightweight GPU-Only Royal Kasavu & Temple Geometry Backdrop */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 12% 14%, rgba(251,191,36,0.22) 0%, transparent 45%), radial-gradient(circle at 88% 28%, rgba(190,18,60,0.12) 0%, transparent 48%), radial-gradient(circle at 50% 88%, rgba(217,119,6,0.18) 0%, transparent 55%), linear-gradient(180deg, #FFFDF8 0%, #FDF2E3 52%, #F8E5CE 100%)",
              }}
            />

            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://w3.org fill='none' stroke='%2392400E' stroke-width='1'%3E%3Cpath d='M36 0L72 36L36 72L0 36Z'/%3E%3Ccircle cx='36' cy='36' r='14'/%3E%3Ccircle cx='36' cy='36' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "72px 72px",
              }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[760px] md:h-[760px] opacity-[0.07] animate-[spin_100s_linear_infinite]">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full stroke-amber-800 fill-none"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="95"
                  strokeWidth="0.6"
                  strokeDasharray="3 3"
                />
                <circle cx="100" cy="100" r="76" strokeWidth="0.8" />
                <polygon points="100,8 192,100 100,192 8,100" strokeWidth="0.6" />
                <polygon points="35,35 165,35 165,165 35,165" strokeWidth="0.6" />
                <circle cx="100" cy="100" r="28" strokeWidth="0.8" />
              </svg>
            </div>

            <div className="fixed inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl border border-amber-500/25" />
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <Navbar />

            <section className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-20 lg:pt-0">
              <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen">
                <LeftPhotoComponent
                  videoUrl={
                    weddingData.media?.coupleVideo || "/video/couple_video.mp4"
                  }
                  posterUrl={
                    weddingData.media?.coupleImg ||
                    "/images/couple/coupleI-banner.jpeg"
                  }
                />
              </div>
              <div className="lg:col-span-7 flex items-center justify-center">
                <RightDetailsComponent weddingData={weddingData} />
              </div>
            </section>

            <WeddingMarquee />

            <main className="flex flex-col">
              <AnimatedContent distance={24} duration={0.55}>
                <CoupleSection />
              </AnimatedContent>

              <StorySection />

              <AnimatedContent distance={24} duration={0.55}>
                <GallerySection />
              </AnimatedContent>

              <AnimatedContent distance={24} duration={0.55}>
                <WeddingEventSection />
              </AnimatedContent>

              <AnimatedContent distance={24} duration={0.55}>
                <ReceptionEventSection />
              </AnimatedContent>

              <AnimatedContent distance={24} duration={0.55}>
                <FamilySection />
              </AnimatedContent>

              <AnimatedContent distance={24} duration={0.55}>
                <PeopleSection />
              </AnimatedContent>

              <AnimatedContent distance={24} duration={0.55}>
                <GreetingSection />
              </AnimatedContent>
            </main>

            <FooterSection />
          </div>

          <FloatingDock
            isMuted={isMuted}
            onToggleAudio={toggleAudio}
            showAudio={true}
          />
        </div>
      )}
    </ClickSpark>
  );
}
