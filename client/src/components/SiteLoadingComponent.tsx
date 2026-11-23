import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/weddingData";
import { Sparkles, Volume2 } from "lucide-react";

interface SiteLoadingComponentProps {
  onLoadingComplete: () => void;
  onUserEnter?: () => void;
}

const LOGO_URL = "/images/logo.jpeg";

export function SiteLoadingComponent({
  onLoadingComplete,
  onUserEnter,
}: SiteLoadingComponentProps) {
  const [isReady, setIsReady] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (onUserEnter) {
      onUserEnter();
    }
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onLoadingComplete, 850);
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsReady(true);
    img.onerror = () => setIsReady(true);
    img.src = LOGO_URL;

    const fallback = setTimeout(() => setIsReady(true), 400);
    return () => clearTimeout(fallback);
  }, []);

  const groomName = weddingData.groom?.name || "Groom";
  const brideName = weddingData.bride?.name || "Bride";
  const dateShort = weddingData.wedding?.dateShort || "December 29, 2026";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      transition={{ duration: 0.45, delay: 0.35 }}
      onClick={handleOpen}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#FAF6EF] select-none px-4 cursor-pointer"
    >
      {/* Left & Right Silk Curtain Doors */}
      <motion.div
        animate={{ x: isOpening ? "-100%" : "0%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-y-0 left-0 w-1/2 bg-gradient-to-br from-[#FBF8F1] via-[#F5ECE0] to-[#EFE1CE] border-r border-amber-400/40 z-0"
      />
      <motion.div
        animate={{ x: isOpening ? "100%" : "0%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#FBF8F1] via-[#F5ECE0] to-[#EFE1CE] border-l border-amber-400/40 z-0"
      />

      {/* Center Monogram Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={
          isOpening ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-[380px] rounded-[2rem] bg-white/95 border border-amber-300/80 p-8 shadow-2xl text-center"
      >
        <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-amber-400/35" />

        <div className="mx-auto w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-500 via-amber-200 to-rose-400 shadow-md mb-5">
          <img
            src={LOGO_URL}
            alt="Couple Monogram"
            className="w-full h-full object-cover rounded-full bg-white"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-amber-800/80 font-semibold mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Royal Wedding Invitation</span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-rose-950">
          {groomName}{" "}
          <span className="font-script text-amber-600 font-normal px-1">
            &amp;
          </span>{" "}
          {brideName}
        </h1>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-stone-500 font-medium">
          {dateShort}
        </p>

        <div className="my-5 h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        <button
          type="button"
          disabled={!isReady && false}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-rose-950 via-amber-900 to-rose-950 text-amber-50 text-xs uppercase tracking-[0.22em] font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>Tap to Enter</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
