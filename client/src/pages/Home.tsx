"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FloatingDock } from "@/components/FloatingDock";

// Layout & Section Components
import { Navbar } from "@/components/Navbar";
import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
import { RightDetailsComponent } from "@/components/RightDetailsComponent";
import { CoupleSection } from "@/components/CoupleSection";
import { StorySection } from "@/components/StorySection";
import { WeddingEventSection } from "@/components/WeddingEventSection";
import { ReceptionEventSection } from "@/components/ReceptionEventSection";
import { PeopleSection } from "@/components/PeopleSection";
import { FamilySection } from "@/components/FamilySection";
import { GreetingSection } from "@/components/GreetingSection";
import { FooterSection } from "@/components/FooterSection";
import { SiteLoadingComponent } from "@/components/SiteLoadingComponent";
import { WeddingMarquee } from "@/components/WeddingMarquee";
import { weddingData } from "@/data/weddingData";

// Interactive Components
import AnimatedContent from "@/components/AnimatedContent";
import { ClickSpark } from "@/components/ClickSpark";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    const tryAutoplay = async () => {
      try {
        audio.muted = false;
        await audio.play();
        setIsMuted(false);
        setShowButton(true);
      } catch {
        try {
          audio.muted = true;
          setIsMuted(true);
          await audio.play();
          setShowButton(true);
        } catch {
          setIsMuted(true);
          setShowButton(true);
        }
      }
    };

    tryAutoplay();

    const unlockAudio = () => {
      if (!audioRef.current) return;
      audioRef.current.muted = false;
      audioRef.current.volume = 0.35;
      audioRef.current
        .play()
        .then(() => {
          setIsMuted(false);
          setShowButton(true);
        })
        .catch(() => {});

      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || isMuted) {
      audio.muted = false;
      audio.volume = 0.35;
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <ClickSpark>
      <audio
        ref={audioRef}
        src={weddingData.musicUrl || "/audio/wedding-music.mp3"}
        loop
        playsInline
        preload="none"
      />

      {isLoading ? (
        <SiteLoadingComponent onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <div
          id="home"
          className="relative min-h-screen w-full overflow-x-hidden bg-[#FDF6EC] text-stone-800 selection:bg-amber-300/60"
        >
          {/* Top Golden Scroll Progress Ribbon */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-700 via-amber-400 to-rose-700 origin-left z-50"
          />

          {/* INNOVATIVE ROYAL BACKGROUND (60fps GPU-Accelerated on Mobile & Desktop) */}
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {/* 1. Rich Warm Champagne-to-Rose Silk Base */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 15% 15%, rgba(251, 191, 36, 0.24) 0%, transparent 45%), radial-gradient(circle at 85% 30%, rgba(225, 29, 72, 0.14) 0%, transparent 50%), radial-gradient(circle at 50% 85%, rgba(217, 119, 6, 0.22) 0%, transparent 55%), linear-gradient(180deg, #FFFBF2 0%, #FDF1E2 50%, #F9E6D2 100%)",
              }}
            />

            {/* 2. Traditional Kasavu & Temple Geometric Jaali Pattern */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://w3.org fill='none' stroke='%2392400E' stroke-width='1'%3E%3Cpath d='M40 0L80 40L40 80L0 40Z'/%3E%3Ccircle cx='40' cy='40' r='16'/%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3Cpath d='M0 0L20 20M80 0L60 20M0 80L20 60M80 80L60 60'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px",
              }}
            />

            {/* 3. Subtle Rotating Sacred Mandala Watermark in Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] sm:w-[760px] sm:h-[760px] opacity-[0.08] animate-[spin_90s_linear_infinite]">
              <svg viewBox="0 0 200 200" className="w-full h-full stroke-amber-800 fill-none">
                <circle cx="100" cy="100" r="95" strokeWidth="0.6" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="78" strokeWidth="0.8" />
                <circle cx="100" cy="100" r="58" strokeWidth="0.5" strokeDasharray="2 4" />
                <polygon points="100,8 192,100 100,192 8,100" strokeWidth="0.6" />
                <polygon points="35,35 165,35 165,165 35,165" strokeWidth="0.6" />
                <circle cx="100" cy="100" r="28" strokeWidth="0.8" />
              </svg>
            </div>

            {/* 4. Floating Gold & Rose Shimmer Sparkles */}
            <style>{`
              @keyframes floatSparkle {
                0%, 100% { transform: translateY(0px) scale(1); opacity: 0.35; }
                50% { transform: translateY(-28px) scale(1.3); opacity: 0.85; }
              }
            `}</style>
            <div className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b] animate-[floatSparkle_5s_ease-in-out_infinite]" />
            <div className="absolute top-[32%] right-[15%] w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_12px_#fb7185] animate-[floatSparkle_6.5s_ease-in-out_infinite_1s]" />
            <div className="absolute top-[65%] left-[20%] w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_#d97706] animate-[floatSparkle_7s_ease-in-out_infinite_2s]" />
            <div className="absolute top-[78%] right-[22%] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_12px_#e11d48] animate-[floatSparkle_5.5s_ease-in-out_infinite_1.5s]" />

            {/* 5. Kasavu Gold Zari Border Frame */}
            <div className="fixed inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl border border-amber-500/25" />
          </div>

          {/* Main Page Content */}
          <div className="relative z-10">
            <Navbar />

            {/* Split Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 min-h-screen pt-20 lg:pt-0">
              <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen">
                <LeftPhotoComponent
                  videoUrl={weddingData.media?.coupleVideo || "/video/couple_video.mp4"}
                />
              </div>

              <div className="lg:col-span-7 flex items-center justify-center">
                <RightDetailsComponent weddingData={weddingData} />
              </div>
            </section>

            <WeddingMarquee />

            <div className="flex flex-col">
              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <CoupleSection />
              </AnimatedContent>

              <StorySection />

              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <WeddingEventSection />
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <ReceptionEventSection />
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <FamilySection />
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <PeopleSection />
              </AnimatedContent>

              <AnimatedContent distance={30} direction="vertical" duration={0.6}>
                <GreetingSection />
              </AnimatedContent>

              <FooterSection />
            </div>
          </div>

          <FloatingDock
            isMuted={isMuted}
            onToggleAudio={toggleAudio}
            showAudio={showButton}
          />
        </div>
      )}
    </ClickSpark>
  );
}






// import { useEffect, useRef, useState } from "react";
// import { Volume2, VolumeX } from "lucide-react";
// import { Navbar } from "@/components/Navbar";
// import { LeftPhotoComponent } from "@/components/LeftPhotoComponent";
// import { RightDetailsComponent } from "@/components/RightDetailsComponent";
// import { CoupleSection } from "@/components/CoupleSection";
// import { StorySection } from "@/components/StorySection";
// import { GallerySection } from "@/components/GallerySection";
// import { WeddingEventSection } from "@/components/WeddingEventSection";
// import { ReceptionEventSection } from "@/components/ReceptionEventSection";
// import { PeopleSection } from "@/components/PeopleSection";
// import { FooterSection } from "@/components/FooterSection";
// import { SiteLoadingComponent } from "@/components/SiteLoadingComponent";
// import { weddingData } from "@/data/weddingData";
// import { FamilySection } from "@/components/FamilySection";
// import { GreetingSection } from "@/components/GreetingSection";

// export default function Home() {
//   const audioRef = useRef<HTMLAudioElement>(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showButton, setShowButton] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const playMusic = async () => {
//       if (audioRef.current) {
//         audioRef.current.volume = 0.3;
        
//         try {
//           // Try playing directly first
//           await audioRef.current.play();
//           setShowButton(true);
//         } catch (error) {
//           // If blocked, try with muted first
//           try {
//             audioRef.current.muted = true;
//             setIsMuted(true);
//             await audioRef.current.play();
//             setShowButton(true);
//             // Unmute after small delay
//             setTimeout(() => {
//               if (audioRef.current) {
//                 audioRef.current.muted = false;
//                 setIsMuted(false);
//               }
//             }, 100);
//           } catch (err) {
//             // If still blocked, show button and wait for user interaction
//             setShowButton(true);
//             const startOnInteraction = async () => {
//               if (audioRef.current) {
//                 try {
//                   await audioRef.current.play();
//                 } catch (error) {
//                   console.error("Failed to play music:", error);
//                 }
//               }
//             };

//             document.addEventListener('click', startOnInteraction, { once: true });
//             document.addEventListener('touchstart', startOnInteraction, { once: true });
//           }
//         }
//       }
//     };

//     const timer = setTimeout(playMusic, 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const toggleMute = () => {
//     if (audioRef.current) {
//       if (isMuted) {
//         audioRef.current.muted = false;
//         setIsMuted(false);
//       } else {
//         audioRef.current.muted = true;
//         setIsMuted(true);
//       }
//     }
//   };

//   const handleLoadingComplete = () => {
//     setIsLoading(false);
//   };

//   return (
//     <>
//       {/* Background Music - Always rendered */}
//       <audio
//         ref={audioRef}
//         loop
//         preload="auto"
//         src="/wedding-music.mp3"
//       />

//       {/* Music Control Button - Always rendered */}
//       {showButton && (
//         <button
//           onClick={toggleMute}
//           className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
//           aria-label={isMuted ? "Unmute music" : "Mute music"}
//         >
//           {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//         </button>
//       )}

//       {isLoading ? (
//         <SiteLoadingComponent onLoadingComplete={handleLoadingComplete} />
//       ) : (
//         <div className="bg-background min-h-screen">
//           <Navbar />

//           {/* HERO SECTION */}
//           <section id="home" className="min-h-screen relative flex items-stretch overflow-hidden pt-20 sm:pt-24 lg:pt-0">
//             <div className="flex flex-col lg:flex-row w-full min-h-screen">
//               <LeftPhotoComponent videoUrl={weddingData.couple.videoUrl} />
//               <RightDetailsComponent weddingData={weddingData} />
//             </div>
//           </section>

//           <CoupleSection />
//           <StorySection />
//           {/* <GallerySection /> */}
//           <WeddingEventSection />
//           <ReceptionEventSection />
//           <FamilySection />
//           <GreetingSection />
//           {/* <PeopleSection /> */}
//           <FooterSection />
//         </div>
//       )}
//     </>
//   );
// }
