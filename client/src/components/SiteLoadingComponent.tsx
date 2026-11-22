import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Sparkles, ArrowUpRight } from "lucide-react";

interface SiteLoadingComponentProps {
  onLoadingComplete: () => void;
}

const LOGO_URL = "/images/logo.jpeg";

export function SiteLoadingComponent({ onLoadingComplete }: SiteLoadingComponentProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onLoadingComplete();
    }, 1100);
  };

  useEffect(() => {
    let isMounted = true;

    const finishLoading = () => {
      if (!isMounted) return;
      setProgress(100);
      setIsReady(true);
    };

    const img = new Image();
    img.onload = finishLoading;
    img.onerror = finishLoading;
    img.src = LOGO_URL;

    const fallback = setTimeout(finishLoading, 1000);

    return () => {
      isMounted = false;
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!isReady || isOpening) return;
    const timer = setTimeout(() => {
      handleOpen();
    }, 2200);
    return () => clearTimeout(timer);
  }, [isReady, isOpening]);

  const groomName = weddingData.groom?.name || "Groom";
  const brideName = weddingData.bride?.name || "Bride";
  const dateShort = weddingData.wedding?.dateShort || "December 29, 2026";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF6EF] select-none px-4"
      >
        <motion.div
          animate={{ x: isOpening ? "-100%" : "0%" }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#FBF8F1] via-[#F5ECE0] to-[#EFE1CE] border-r border-amber-400/40 z-0"
        />
        <motion.div
          animate={{ x: isOpening ? "100%" : "0%" }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#FBF8F1] via-[#F5ECE0] to-[#EFE1CE] border-l border-amber-400/40 z-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={
            isOpening
              ? { opacity: 0, scale: 1.08, y: -15 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => isReady && handleOpen()}
          className={`relative z-10 w-full max-w-[360px] sm:max-w-[420px] rounded-[2rem] bg-white/95 md:bg-white/85 md:backdrop-blur-xl border border-amber-300/80 p-7 sm:p-10 shadow-xl text-center ${
            isReady && !isOpening ? "cursor-pointer" : ""
          }`}
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-amber-400/35" />

          <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-6">
            <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-amber-500 via-amber-200 to-rose-400 shadow-md">
              <img
                src={LOGO_URL}
                alt="Couple Monogram"
                className="w-full h-full object-cover rounded-full bg-white"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-amber-800/80 font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Wedding Invitation</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-rose-950 via-amber-900 to-rose-900 bg-clip-text text-transparent tracking-tight leading-tight">
            {groomName} <span className="font-script text-amber-600 font-normal px-1">&amp;</span> {brideName}
          </h1>

          <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-stone-500 font-medium">
            {dateShort}
          </p>

          <div className="my-6 h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          <div className="h-12 flex items-center justify-center">
            {!isReady ? (
              <div className="w-full max-w-[220px] space-y-2">
                <div className="h-1 w-full bg-amber-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
                  Loading • {progress}%
                </p>
              </div>
            ) : (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpen}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-rose-950 via-amber-900 to-rose-950 text-amber-50 text-xs uppercase tracking-[0.25em] font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <span>Open Invitation</span>
                <ArrowUpRight className="w-4 h-4 text-amber-300" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}




// import { useEffect, useState } from "react";
// import logo from "@assets/logo_1768316403138.jpeg";

// interface SiteLoadingComponentProps {
//   onLoadingComplete: () => void;
// }

// export function SiteLoadingComponent({ onLoadingComplete }: SiteLoadingComponentProps) {
//   const [progress, setProgress] = useState(0);
//   const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
//   const [isLetterRevealing, setIsLetterRevealing] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     let loadedCount = 0;
//     const totalAssets = 3; // logo + audio + video

//     const updateProgress = () => {
//       if (!isMounted) return;
//       loadedCount++;
//       const newProgress = Math.min((loadedCount / totalAssets) * 100, 100);
//       setProgress(newProgress);

//       if (loadedCount >= totalAssets) {
//         triggerOpenSequence();
//       }
//     };

//     const triggerOpenSequence = () => {
//       setTimeout(() => {
//         if (!isMounted) return;
//         setIsEnvelopeOpening(true);
//         setTimeout(() => {
//           if (!isMounted) return;
//           setIsLetterRevealing(true);
//           setTimeout(() => {
//             if (!isMounted) return;
//             onLoadingComplete();
//           }, 1600);
//         }, 750);
//       }, 400);
//     };

//     // 1. Preload Image
//     const img = new Image();
//     img.onload = updateProgress;
//     img.onerror = updateProgress;
//     img.src = logo;

//     // 2. Preload Audio properly
//     const audio = new Audio();
//     audio.oncanplaythrough = updateProgress;
//     audio.onerror = updateProgress;
//     audio.src = "/wedding-music.mp3";

//     // 3. Preload Video
//     const videoToPreload = document.createElement("video");
//     videoToPreload.src = "/couple_video.mp4";
//     videoToPreload.preload = "auto";
//     videoToPreload.onloadeddata = updateProgress;
//     videoToPreload.onerror = updateProgress;

//     // Fallback timeout
//     const timeout = setTimeout(() => {
//       if (isMounted && loadedCount < totalAssets) {
//         setProgress(100);
//         triggerOpenSequence();
//       }
//     }, 8000);

//     return () => {
//       isMounted = false;
//       clearTimeout(timeout);
//       videoToPreload.remove();
//     };
//   }, [onLoadingComplete]);

//   return (
//     <div className="fixed inset-0 z-[9999] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fff8f6] via-[#fceae8] to-[#f3d8d5] flex items-center justify-center overflow-hidden">
//       {/* Ambient Background Glows & Sparkles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Soft Warm Orbs */}
//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-rose-300/25 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] bg-amber-200/30 rounded-full blur-3xl animate-pulse delay-1500" />
//         <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000" />

//         {/* Subtle Floating Gold Dust Particles */}
//         <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 bg-amber-400/60 rounded-full animate-float" />
//         <div className="absolute top-[28%] right-[25%] w-2 h-2 bg-rose-400/50 rounded-full animate-float delay-1000" />
//         <div className="absolute bottom-[25%] left-[30%] w-2 h-2 bg-amber-300/70 rounded-full animate-float delay-1200" />
//         <div className="absolute bottom-[32%] right-[20%] w-1.5 h-1.5 bg-rose-300/70 rounded-full animate-float" />
//         <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-amber-500/50 rounded-full animate-float delay-1000" />
//       </div>

//       {/* Main Envelope & Progress Wrapper */}
//       <div className="relative z-10 flex flex-col items-center">
//         {/* 3D Perspective Container */}
//         <div style={{ perspective: "1200px" }}>
//           <div
//             className={`relative w-[340px] sm:w-[380px] h-[230px] sm:h-[250px] transition-all duration-1000 ease-out ${
//               isEnvelopeOpening ? "scale-105 translate-y-6" : "scale-100"
//             }`}
//           >
//             {/* 1. Envelope Inner Back Lining */}
//             <div className="absolute inset-0 bg-gradient-to-b from-[#e8b4b8] to-[#d89a9e] rounded-xl shadow-[0_20px_50px_rgba(159,18,57,0.18)] border border-rose-300/60 overflow-hidden">
//               {/* Subtle Damask/Floral Dot Pattern Inside */}
//               <div
//                 className="absolute inset-0 opacity-20"
//                 style={{
//                   backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
//                   backgroundSize: "14px 14px",
//                 }}
//               />
//             </div>

//             {/* 2. Invitation Card Inside */}
//             <div
//               className={`absolute inset-x-4 top-3 bottom-3 bg-[#fffdfa] rounded-lg shadow-lg border border-amber-200/80 flex flex-col items-center justify-center p-4 transition-all duration-1000 ease-in-out ${
//                 isLetterRevealing
//                   ? "-translate-y-[68%] scale-105 shadow-2xl z-30"
//                   : "translate-y-0 z-10"
//               }`}
//             >
//               {/* Gold Inner Frame on Card */}
//               <div className="w-full h-full border border-amber-300/60 rounded flex flex-col items-center justify-center px-3 py-2 relative">
//                 {/* Corner Flourishes */}
//                 <span className="absolute top-1.5 left-2 text-[10px] text-amber-400">✦</span>
//                 <span className="absolute top-1.5 right-2 text-[10px] text-amber-400">✦</span>
//                 <span className="absolute bottom-1.5 left-2 text-[10px] text-amber-400">✦</span>
//                 <span className="absolute bottom-1.5 right-2 text-[10px] text-amber-400">✦</span>

//                 {/* Logo */}
//                 <div className="mb-2.5 relative">
//                   <div className="absolute inset-0 rounded-full bg-amber-300/30 blur-md" />
//                   <img
//                     src={logo}
//                     alt="Wedding Logo"
//                     className="relative w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full shadow-md border-2 border-amber-300"
//                   />
//                 </div>

//                 {/* Bride and Groom Names */}
//                 <div className="text-center">
//                   <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600/80 font-medium mb-1">
//                     Together with their families
//                   </p>
//                   <div className="flex items-center justify-center gap-2.5 mb-1">
//                     <span className="text-xl font-serif text-stone-800 font-semibold tracking-wide">
//                       Bride
//                     </span>
//                     <span className="text-rose-500 text-base">♥</span>
//                     <span className="text-xl font-serif text-stone-800 font-semibold tracking-wide">
//                       Groom
//                     </span>
//                   </div>
//                   <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-1.5" />
//                   <p className="text-xs font-serif text-rose-700 font-medium tracking-wider">
//                     December 29, 2026
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* 3. Envelope Front Pocket (Left, Right & Bottom Flaps) */}
//             <div className="absolute inset-0 z-20 pointer-events-none rounded-xl overflow-hidden">
//               <svg viewBox="0 0 380 250" preserveAspectRatio="none" className="w-full h-full">
//                 <defs>
//                   <linearGradient id="pocket-left" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#fdf2f4" />
//                     <stop offset="100%" stopColor="#f5d0d6" />
//                   </linearGradient>
//                   <linearGradient id="pocket-right" x1="100%" y1="0%" x2="0%" y2="100%">
//                     <stop offset="0%" stopColor="#fce7eb" />
//                     <stop offset="100%" stopColor="#f3c6ce" />
//                   </linearGradient>
//                   <linearGradient id="pocket-bottom" x1="0%" y1="100%" x2="0%" y2="0%">
//                     <stop offset="0%" stopColor="#f9d8de" />
//                     <stop offset="100%" stopColor="#fff5f7" />
//                   </linearGradient>
//                   <filter id="flap-shadow" x="-10%" y="-10%" width="120%" height="120%">
//                     <feDropShadow
//                       dx="0"
//                       dy="-2"
//                       stdDeviation="3"
//                       floodColor="#881337"
//                       floodOpacity="0.12"
//                     />
//                   </filter>
//                 </defs>

//                 {/* Left Side Flap */}
//                 <polygon points="0,0 195,135 0,250" fill="url(#pocket-left)" />
//                 {/* Right Side Flap */}
//                 <polygon points="380,0 185,135 380,250" fill="url(#pocket-right)" />
//                 {/* Bottom Flap with subtle gold trim */}
//                 <polygon
//                   points="0,250 190,118 380,250"
//                   fill="url(#pocket-bottom)"
//                   filter="url(#flap-shadow)"
//                 />
//                 <polyline
//                   points="0,250 190,118 380,250"
//                   fill="none"
//                   stroke="#e5b887"
//                   strokeWidth="1"
//                   opacity="0.6"
//                 />
//               </svg>
//             </div>
            
//             {/* 4. Envelope Top Flap with 3D Flip & Wax Seal */}
//             <div
//               className={`absolute top-0 left-0 right-0 h-[145px] origin-top transition-all duration-1000 ease-in-out ${
//                 isEnvelopeOpening ? "rotate-x-180 z-0" : "rotate-x-0 z-30"
//               }`}
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <svg
//                 viewBox="0 0 380 145"
//                 preserveAspectRatio="none"
//                 className="w-full h-full overflow-visible"
//                 style={{ filter: "drop-shadow(0 6px 8px rgba(136, 19, 55, 0.14))" }}
//               >
//                 <defs>
//                   <linearGradient id="top-flap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#fff1f3" />
//                     <stop offset="50%" stopColor="#fad2d9" />
//                     <stop offset="100%" stopColor="#f2bac4" />
//                   </linearGradient>
//                   <filter id="flap-shadow" x="-10%" y="-10%" width="120%" height="120%">
//                     <feDropShadow
//                       dx="0"
//                       dy="-2"
//                       stdDeviation="3"
//                       floodColor="#881337"
//                       floodOpacity="0.12"
//                     />
//                   </filter>
//                 </defs>

//                 {/* Left Side Flap */}
//                 <polygon points="0,0 195,135 0,250" fill="url(#pocket-left)" />
//                 {/* Right Side Flap */}
//                 <polygon points="380,0 185,135 380,250" fill="url(#pocket-right)" />
//                 {/* Bottom Flap with subtle gold trim */}
//                 <polygon
//                   points="0,250 190,118 380,250"
//                   fill="url(#pocket-bottom)"
//                   filter="url(#flap-shadow)"
//                 />
//                 <polyline
//                   points="0,250 190,118 380,250"
//                   fill="none"
//                   stroke="#e5b887"
//                   strokeWidth="1"
//                   opacity="0.6"
//                 />
//               </svg>
//             </div>

//             {/* 4. Envelope Top Flap with 3D Flip & Wax Seal */}
//             <div
//               className={`absolute top-0 left-0 right-0 h-[145px] origin-top transition-all duration-1000 ease-in-out ${
//                 isEnvelopeOpening ? "rotate-x-180 z-0" : "rotate-x-0 z-30"
//               }`}
//               style={{ transformStyle: "preserve-3d" }}
//             >
//               <svg
//                 viewBox="0 0 380 145"
//                 preserveAspectRatio="none"
//                 className="w-full h-full overflow-visible"
//                 style={{ filter: "drop-shadow(0 6px 8px rgba(136, 19, 55, 0.14))" }}
//               >
//                 <defs>
//                   <linearGradient id="top-flap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                     <stop offset="0%" stopColor="#fff1f3" />
//                     <stop offset="50%" stopColor="#fad2d9" />
//                     <stop offset="100%" stopColor="#f2bac4" />
//                   </linearGradient>
//                   <radialGradient id="wax-seal-grad" cx="35%" cy="35%" r="65%">
//                     <stop offset="0%" stopColor="#e11d48" />
//                     <stop offset="65%" stopColor="#9f1239" />
//                     <stop offset="100%" stopColor="#700b27" />
//                   </radialGradient>
//                 </defs>

//                 {/* Triangular Top Flap */}
//                 <polygon points="0,0 190,132 380,0" fill="url(#top-flap-gradient)" />
//                 {/* Gold Foil Edge on Top Flap */}
//                 <polyline
//                   points="0,0 190,132 380,0"
//                   fill="none"
//                   stroke="#d4a373"
//                   strokeWidth="1.2"
//                   opacity="0.75"
//                 />

//                 {/* Realistic Wax Seal */}
//                 {!isEnvelopeOpening && (
//                   <g className="transition-opacity duration-300">
//                     <circle
//                       cx="190"
//                       cy="122"
//                       r="25"
//                       fill="url(#wax-seal-grad)"
//                       style={{ filter: "drop-shadow(0 4px 5px rgba(0,0,0,0.25))" }}
//                     />
//                     <circle
//                       cx="190"
//                       cy="122"
//                       r="19"
//                       fill="none"
//                       stroke="#fda4af"
//                       strokeWidth="1.2"
//                       opacity="0.55"
//                     />
//                     <text
//                       x="190"
//                       y="128"
//                       textAnchor="middle"
//                       fill="#ffe4e6"
//                       fontSize="16"
//                       fontFamily="serif"
//                     >
//                       ♥
//                     </text>
//                   </g>
//                 )}
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Loading Progress Bar */}
//         <div
//           className={`mt-10 text-center transition-opacity duration-500 ${
//             isLetterRevealing ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           <div className="w-64 h-1.5 bg-rose-200/70 rounded-full overflow-hidden mx-auto mb-3 shadow-inner p-[1px]">
//             <div
//               className="h-full bg-gradient-to-r from-amber-400 via-rose-400 to-rose-600 transition-all duration-300 ease-out rounded-full"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <p className="text-xs uppercase tracking-[0.2em] text-rose-800/80 font-serif animate-pulse">
//             {progress < 100 ? "Preparing your invitation..." : "Breaking the seal..."}
//           </p>
//         </div>
//       </div>

//       {/* Custom Animations & 3D Transform Utilities */}
//       <style>{`
//         .rotate-x-180 {
//           transform: rotateX(-180deg);
//         }
//         .rotate-x-0 {
//           transform: rotateX(0deg);
//         }
//         .delay-500 {
//           animation-delay: 500ms;
//         }
//         .delay-700 {
//           animation-delay: 700ms;
//         }
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px) scale(1);
//             opacity: 0.4;
//           }
//           50% {
//             transform: translateY(-18px) scale(1.2);
//             opacity: 0.9;
//           }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }




// // import { useEffect, useState } from "react";
// // import logo from "@assets/logo_1768316403138.jpeg";

// // interface SiteLoadingComponentProps {
// //   onLoadingComplete: () => void;
// // }

// // export function SiteLoadingComponent({ onLoadingComplete }: SiteLoadingComponentProps) {
// //   const [progress, setProgress] = useState(0);
// //   const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);
// //   const [isLetterRevealing, setIsLetterRevealing] = useState(false);

// //   useEffect(() => {
// //     // Preload all assets
// //     const imagesToPreload = [
// //       "/wedding-music.mp3",
// //       logo,
// //     ];

// //     // Add video element to preload
// //     const videoToPreload = document.createElement("video");
// //     videoToPreload.src = "/couple_video.mp4";
// //     videoToPreload.preload = "auto";

// //     let loadedCount = 0;
// //     const totalAssets = imagesToPreload.length + 1; // images + video

// //     const updateProgress = () => {
// //       loadedCount++;
// //       const newProgress = (loadedCount / totalAssets) * 100;
// //       setProgress(newProgress);

// //       if (loadedCount >= totalAssets) {
// //         // Start envelope opening animation
// //         setTimeout(() => {
// //           setIsEnvelopeOpening(true);
          
// //           // Start letter reveal
// //           setTimeout(() => {
// //             setIsLetterRevealing(true);
            
// //             // Complete loading
// //             setTimeout(() => {
// //               onLoadingComplete();
// //             }, 1500);
// //           }, 800);
// //         }, 500);
// //       }
// //     };

// //     // Preload images
// //     imagesToPreload.forEach((src) => {
// //       const img = new Image();
// //       img.onload = updateProgress;
// //       img.onerror = updateProgress;
// //       img.src = src;
// //     });

// //     // Preload video
// //     videoToPreload.onloadeddata = updateProgress;
// //     videoToPreload.onerror = updateProgress;

// //     // Fallback timeout in case some assets fail
// //     const timeout = setTimeout(() => {
// //       if (progress < 100) {
// //         setProgress(100);
// //         setIsEnvelopeOpening(true);
// //         setTimeout(() => {
// //           setIsLetterRevealing(true);
// //           setTimeout(() => {
// //             onLoadingComplete();
// //           }, 1500);
// //         }, 800);
// //       }
// //     }, 8000);

// //     return () => {
// //       clearTimeout(timeout);
// //       videoToPreload.remove();
// //     };
// //   }, [onLoadingComplete, progress]);

// //   return (
// //     <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 flex items-center justify-center overflow-hidden">
// //       {/* Decorative elements */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-10 left-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl animate-pulse"></div>
// //         <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
// //         <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-200/30 rounded-full blur-2xl animate-pulse delay-500"></div>
// //       </div>

// //       {/* Envelope Container */}
// //       <div className="relative z-10">
// //         {/* Envelope Body */}
// //         <div 
// //           className={`relative w-80 h-56 transition-all duration-1000 ${
// //             isEnvelopeOpening ? 'scale-110' : 'scale-100'
// //           }`}
// //         >
// //           {/* Envelope Back */}
// //           <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 rounded-lg shadow-2xl border-2 border-rose-200">
// //             {/* Decorative pattern */}
// //             <div className="absolute inset-0 opacity-10">
// //               <div className="absolute top-4 left-4 text-rose-400">❤</div>
// //               <div className="absolute top-4 right-4 text-rose-400">❤</div>
// //               <div className="absolute bottom-4 left-4 text-rose-400">❤</div>
// //               <div className="absolute bottom-4 right-4 text-rose-400">❤</div>
// //             </div>
// //           </div>

// //           {/* Letter/Card Inside */}
// //           <div 
// //             className={`absolute inset-4 bg-white rounded shadow-xl flex flex-col items-center justify-center transition-all duration-1000 ${
// //               isLetterRevealing ? 'translate-y-[-120%] opacity-100' : 'translate-y-0 opacity-90'
// //             }`}
// //           >
// //             {/* Logo on the letter */}
// //             <div className="mb-3">
// //               <img 
// //                 src={logo} 
// //                 alt="Wedding Logo" 
// //                 className="w-20 h-20 object-contain rounded-full shadow-lg border-4 border-rose-200"
// //               />
// //             </div>
            
// //             {/* Bride and Groom Names */}
// //             <div className="text-center px-4 mb-2">
// //               <div className="flex items-center justify-center gap-2 mb-2">
// //                 <span className="text-lg font-serif text-gray-800 font-semibold">Bride</span>
// //                 <span className="text-rose-500 text-xl">♥</span>
// //                 <span className="text-lg font-serif text-gray-800 font-semibold">Groom</span>
// //               </div>
// //               <p className="text-xs font-serif text-gray-500 italic mb-1">You're Invited</p>
// //               <p className="text-sm font-serif text-rose-600 font-medium">December 29, 2026</p>
// //             </div>
// //           </div>

// //           {/* Envelope Flap - Top */}
// //           <div 
// //             className={`absolute top-0 left-0 right-0 h-32 transition-all duration-1000 origin-top ${
// //               isEnvelopeOpening ? 'rotate-x-180 -translate-y-1' : 'rotate-x-0'
// //             }`}
// //             style={{
// //               transformStyle: 'preserve-3d',
// //             }}
// //           >
// //             <svg 
// //               viewBox="0 0 320 128" 
// //               className="w-full h-full"
// //               style={{
// //                 filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
// //               }}
// //             >
// //               <polygon 
// //                 points="0,0 160,100 320,0" 
// //                 className={`transition-all duration-1000 ${
// //                   isEnvelopeOpening 
// //                     ? 'fill-rose-200' 
// //                     : 'fill-gradient-to-br from-rose-200 to-pink-200'
// //                 }`}
// //                 fill="url(#flap-gradient)"
// //               />
// //               <defs>
// //                 <linearGradient id="flap-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
// //                   <stop offset="0%" stopColor="#fecdd3" />
// //                   <stop offset="100%" stopColor="#fbcfe8" />
// //                 </linearGradient>
// //               </defs>
// //               {/* Decorative seal */}
// //              </div> {!isEnvelopeOpening && (
// //                 <circle cx="160" cy="50" r="20" fill="#be123c" opacity="0.7" />
// //               )}
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Loading Progress */}
// //         {!isLetterRevealing && (
// //           <div className="mt-8 text-center">
// //             <div className="w-64 h-1.5 bg-rose-200 rounded-full overflow-hidden mx-auto mb-3">
// //               <div 
// //                 className="h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-300 ease-out rounded-full"
// //                 style={{ width: `${progress}%` }}
// //               ></div>
// //             </div>
// //             <p className="text-sm text-rose-600 font-serif animate-pulse">
// //               {progress < 100 ? 'Preparing your invitation...' : 'Opening...'}
// //             </p>
// //           </div>
// //         )}
// //       </div>

// //       {/* CSS for 3D transform */}
// //       <style>{`
// //         .rotate-x-180 {
// //           transform: rotateX(-180deg);
// //         }
// //         .rotate-x-0 {
// //           transform: rotateX(0deg);
// //         }
// //         .delay-500 {
// //           animation-delay: 500ms;
// //         }
// //         .delay-700 {
// //           animation-delay: 700ms;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }