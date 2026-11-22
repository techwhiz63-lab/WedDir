import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

export function Countdown({ targetDate, className }: CountdownProps) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const totalSeconds = differenceInSeconds(targetDate, now);

    if (totalSeconds <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={cn("flex items-center justify-center gap-2 sm:gap-4 md:gap-6", className)}>
      <TimeBox value={timeLeft.days} label="Days" />
      <span className="text-amber-600/50 text-xl sm:text-2xl font-light pb-5">:</span>
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <span className="text-amber-600/50 text-xl sm:text-2xl font-light pb-5">:</span>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <span className="text-amber-600/50 text-xl sm:text-2xl font-light pb-5">:</span>
      <TimeBox value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden flex items-center justify-center w-14 h-16 sm:w-18 sm:h-20 md:w-20 md:h-24 rounded-2xl bg-gradient-to-b from-white to-amber-50/80 border border-amber-300/60 shadow-[0_8px_20px_-6px_rgba(180,83,9,0.18)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formatted}
            initial={{ y: 18, opacity: 0, filter: "blur(3px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -18, opacity: 0, filter: "blur(3px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold bg-gradient-to-b from-rose-950 to-amber-800 bg-clip-text text-transparent"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-900/70 font-semibold">
        {label}
      </span>
    </div>
  );
}


// import { useState, useEffect } from "react";
// import { differenceInSeconds, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
// import { cn } from "@/lib/utils";

// interface CountdownProps {
//   targetDate: Date;
//   className?: string;
// }

// export function Countdown({ targetDate, className }: CountdownProps) {
//   const calculateTimeLeft = () => {
//     const now = new Date();
//     const totalSeconds = differenceInSeconds(targetDate, now);
    
//     if (totalSeconds <= 0) {
//       return { days: 0, hours: 0, minutes: 0, seconds: 0 };
//     }
    
//     const days = Math.floor(totalSeconds / (24 * 60 * 60));
//     const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
//     const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
//     const seconds = totalSeconds % 60;
    
//     return { days, hours, minutes, seconds };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className={cn("flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 lg:space-x-12", className)}>
//       <TimeBox value={timeLeft.days} label="Days" />
//       <div className="text-primary/10 text-lg sm:text-xl font-light pt-2">:</div>
//       <TimeBox value={timeLeft.hours} label="Hrs" />
//       <div className="text-primary/10 text-lg sm:text-xl font-light pt-2">:</div>
//       <TimeBox value={timeLeft.minutes} label="Min" />
//       <div className="text-primary/10 text-lg sm:text-xl font-light pt-2">:</div>
//       <TimeBox value={timeLeft.seconds} label="Sec" />
//     </div>
//   );
// }

// function TimeBox({ value, label }: { value: number; label: string }) {
//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex items-center justify-center min-w-[3rem] sm:min-w-[4rem] md:min-w-[5rem] lg:min-w-[6rem]">
//         <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-light text-primary/80">
//           {String(value).padStart(2, "0")}
//         </span>
//       </div>
//       <div className="mt-2 sm:mt-3 md:mt-4 h-[1px] w-3 sm:w-4 bg-primary/20" />
//       <span className="mt-2 sm:mt-3 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground/60 font-medium">
//         {label}
//       </span>
//     </div>
//   );
// }
