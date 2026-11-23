import { motion } from "framer-motion";
import { Countdown } from "@/components/Countdown";
import { Heart, Sparkles } from "lucide-react";
import { weddingData as defaultWeddingData } from "@/data/weddingData";
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import { RoyalInviteCard } from "@/components/RoyalInviteCard";

interface RightDetailsComponentProps {
  weddingData?: typeof defaultWeddingData;
}

export function RightDetailsComponent({
  weddingData = defaultWeddingData,
}: RightDetailsComponentProps) {
  return (
    <div className="w-full flex items-center justify-center bg-transparent relative py-8 sm:py-16 lg:py-0 lg:pt-20">
      <div className="text-center px-4 sm:px-8 md:px-12 max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 sm:space-y-8 bg-white/75 backdrop-blur-md border border-amber-300/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(180,83,9,0.15)]"
        >
          {/* Top Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <ShinyText
              text="Save the Date"
              speed={3.5}
              className="text-xs uppercase tracking-[0.3em] font-bold"
            />
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          {/* Names Section - Mobile & Desktop Safe */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
            <SplitText
              text={weddingData.groom.name}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight leading-tight"
              letterClassName="text-rose-950"
              delay={55}
            />

            <motion.div
              animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="py-1"
            >
              <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600 fill-rose-500 drop-shadow-[0_2px_10px_rgba(225,29,72,0.45)]" />
            </motion.div>

            <SplitText
              text={weddingData.bride.name}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight leading-tight"
              letterClassName="text-amber-900"
              delay={55}
            />
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/70" />
            <span className="text-amber-600 text-sm">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/70" />
          </div>

          {/* Wedding Date Pill */}
          <div>
            <div className="inline-block px-7 py-2.5 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-900 text-amber-50 rounded-full shadow-md border border-amber-300/40">
              <p className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase">
                {weddingData.wedding.dateShort}
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="pt-1">
            <Countdown targetDate={weddingData.wedding.date} />
          </div>

          <div className="pt-2">
            <RoyalInviteCard />
          </div>

          {/* Bottom Tagline */}
          <div className="pt-1">
            <ShinyText
              text="Together With Their Families • We're Getting Married"
              speed={4.5}
              className="text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
