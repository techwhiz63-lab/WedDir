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

export function RightDetailsComponent({ weddingData = defaultWeddingData }: RightDetailsComponentProps) {
  return (
    <div className="w-full flex items-center justify-center bg-transparent relative py-10 sm:py-16 lg:py-0 lg:pt-20">
      <div className="text-center px-4 sm:px-8 md:px-12 max-w-2xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-7 sm:space-y-9 bg-white/60 backdrop-blur-md border border-amber-300/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(180,83,9,0.15)]"
        >
          {/* Shimmering Top Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <ShinyText
              text="Save the Date"
              speed={3.5}
              className="text-xs uppercase tracking-[0.35em] font-bold"
            />
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          </div>

          {/* Names Section with SplitText + Rich Gradient Color */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5">
            <SplitText
              text={weddingData.groom.name}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold bg-gradient-to-r from-rose-900 via-amber-800 to-rose-800 bg-clip-text text-transparent tracking-tight leading-tight"
              delay={65}
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
              className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold bg-gradient-to-r from-amber-800 via-rose-800 to-rose-900 bg-clip-text text-transparent tracking-tight leading-tight"
              delay={65}
            />
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500/70" />
            <span className="text-amber-600 text-sm">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500/70" />
          </div>

          {/* Wedding Date Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="inline-block px-7 py-2.5 bg-gradient-to-r from-rose-900 via-amber-900 to-rose-900 text-amber-50 rounded-full shadow-md border border-amber-300/40">
              <p className="text-xs sm:text-sm tracking-[0.28em] font-medium uppercase">
                {weddingData.wedding.dateShort}
              </p>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="pt-1"
          >
            <Countdown targetDate={weddingData.wedding.date} />
          </motion.div>
          <div className="pt-2">
            <RoyalInviteCard />
          </div>

          {/* Shimmering Bottom Tagline */}
          <div className="pt-1">
            <ShinyText
              text="Together With Their Families • We're Getting Married"
              speed={4.5}
              className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}



// import { motion } from "framer-motion";
// import { Countdown } from "@/components/Countdown";
// import { Heart } from "lucide-react";
// import { weddingData as WeddingDataType } from "@/data/weddingData";

// interface RightDetailsComponentProps {
//   weddingData: typeof WeddingDataType;
// }

// export function RightDetailsComponent({ weddingData }: RightDetailsComponentProps) {
//   return (
//     <div className="w-full lg:w-3/5 flex items-center justify-center bg-white relative py-12 sm:py-16 lg:py-0 lg:pt-24">
      
//       <div className="text-center px-4 sm:px-8 md:px-16 max-w-xl mx-auto relative">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, ease: "easeOut" }}
//           className="space-y-10"
//         >
//           {/* Header Text */}
//           <div className="space-y-3">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="inline-block"
//             >
//               <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/50 font-medium">
//                 Save the Date
//               </span>
//             </motion.div>
//           </div>
          
//           {/* Names Section */}
//           <div className="space-y-4 sm:space-y-6 lg:space-y-0">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-6 space-y-4 sm:space-y-6 lg:space-y-0">
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 }}
//               >
//                 <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-foreground tracking-tight leading-none">
//                   {weddingData.groom.name}
//                 </h1>
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: 0.5 }}
//                 className="py-1 lg:py-0"
//               >
//                 <Heart className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-rose-400 fill-rose-400" />
//               </motion.div>
              
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.6 }}
//               >
//                 <h1 className="text-3xl sm:text-4xl md:text-6xl font-light text-foreground tracking-tight leading-none">
//                   {weddingData.bride.name}
//                 </h1>
//               </motion.div>
//             </div>
//           </div>

//           {/* Wedding Date */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//             className="space-y-2"
//           >
//             <div className="inline-block px-6 py-2 border border-foreground/10 rounded-full">
//               <p className="text-sm tracking-[0.2em] text-foreground/70 font-light">
//                 {weddingData.wedding.dateShort}
//               </p>
//             </div>
//           </motion.div>

//           {/* Countdown */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1 }}
//             className="pt-2"
//           >
//             <Countdown targetDate={weddingData.wedding.date} />
//           </motion.div>

//           {/* Bottom Message */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 1.2 }}
//             className="pt-2"
//           >
//             <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground/40 font-medium">
//               We're Getting Married
//             </p>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
