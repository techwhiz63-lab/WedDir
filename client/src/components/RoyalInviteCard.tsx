import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCw, X, MapPin, Calendar, Share2, Check } from "lucide-react";
import { weddingData } from "@/data/weddingData";
import ShinyText from "@/components/ShinyText";

export const RoyalInviteCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${weddingData.groom.name} & ${weddingData.bride.name} - Wedding Invitation`,
      text: `You are cordially invited to celebrate the wedding of ${weddingData.groom.name} & ${weddingData.bride.name} on ${weddingData.wedding.dateString}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard copy
      }
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Trigger Pill Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          setIsFlipped(false);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-100 via-amber-50 to-rose-100 border border-amber-400/70 text-amber-950 text-xs uppercase tracking-[0.2em] font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        <span>Open VIP Invite Pass</span>
      </motion.button>

      {/* Interactive 3D Card Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md"
              style={{ perspective: 1400 }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close invite pass"
                className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/25 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 3D Flippable Card Container */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative w-full aspect-[3/4] cursor-pointer"
                onClick={() => setIsFlipped((f) => !f)}
              >
                {/* FRONT OF CARD */}
                <div
                  style={{ backfaceVisibility: "hidden" }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2C1618] via-[#4A1C24] to-[#1F1209] p-6 sm:p-8 border-2 border-amber-400/80 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between text-center overflow-hidden"
                >
                  {/* Decorative Inner Kasavu Gold Border */}
                  <div className="absolute inset-3 rounded-2xl border border-amber-300/40 pointer-events-none" />
                  <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

                  <div className="relative z-10 pt-2">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300/80 font-medium">
                      Royal Wedding Invitation
                    </p>
                    <div className="mt-3 inline-flex items-center justify-center w-14 h-14 rounded-full border border-amber-300/60 bg-amber-500/10 text-amber-200 font-display text-xl">
                      {weddingData.groom.name.charAt(0)}&amp;{weddingData.bride.name.charAt(0)}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-3 my-auto">
                    <p className="text-xs italic font-serif text-amber-100/75">
                      Together with their families
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-display text-amber-100 tracking-wide leading-tight">
                      {weddingData.groom.name}
                      <span className="block text-xl text-amber-400 italic my-1">&amp;</span>
                      {weddingData.bride.name}
                    </h3>
                    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                    <p className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold pt-1">
                      {weddingData.wedding.dateString}
                    </p>
                  </div>

                  <div className="relative z-10 pb-1 flex items-center justify-center gap-1.5 text-[11px] text-amber-300/80">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Tap card to flip for venue details</span>
                  </div>
                </div>

                {/* BACK OF CARD */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FDF6EC] to-[#F7E8D0] p-6 sm:p-8 border-2 border-amber-500/70 shadow-[0_25px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between text-stone-800 overflow-hidden"
                >
                  <div className="absolute inset-3 rounded-2xl border border-amber-400/40 pointer-events-none" />

                  <div className="relative z-10 text-center pt-2">
                    <ShinyText
                      text="Celebration Itinerary"
                      className="text-xs uppercase tracking-[0.3em] font-bold"
                    />
                    <h4 className="text-2xl font-display text-rose-950 mt-1">
                      Save the Moments
                    </h4>
                  </div>

                  <div className="relative z-10 space-y-4 my-auto text-left px-2">
                    <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-300/50 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest text-rose-600 font-bold">
                        Wedding Ceremony
                      </p>
                      <p className="font-display text-lg text-stone-900 font-semibold mt-0.5">
                        {weddingData.wedding.ceremony.place}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{weddingData.wedding.ceremony.date} • {weddingData.wedding.ceremony.time}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-stone-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{weddingData.wedding.ceremony.location}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-300/50 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest text-amber-700 font-bold">
                        Grand Reception
                      </p>
                      <p className="font-display text-lg text-stone-900 font-semibold mt-0.5">
                        {weddingData.wedding.reception.place}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-stone-600 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>{weddingData.wedding.reception.date} • {weddingData.wedding.reception.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                      <RotateCw className="w-3.5 h-3.5" />
                      Tap to flip back
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-900 text-amber-50 text-xs font-medium hover:bg-rose-800 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copied ? "Link Copied!" : "Share Invite"}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
