import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import ShinyText from "@/components/ShinyText";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-14 space-y-3", className)}>
      {subtitle && (
        <span className="font-script text-3xl md:text-4xl block mb-1">
          {light ? (
            <span className="text-amber-200">{subtitle}</span>
          ) : (
            <ShinyText text={subtitle} speed={4} />
          )}
        </span>
      )}

      <div className="relative inline-block">
        <h2
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider relative z-10 font-semibold",
            light
              ? "text-white"
              : "bg-gradient-to-r from-rose-950 via-amber-900 to-rose-900 bg-clip-text text-transparent"
          )}
        >
          {title}
        </h2>
        <div className="flex justify-center mt-4 items-center gap-3">
          <div className={cn("h-[1.5px] w-14 md:w-24 rounded-full", light ? "bg-white/50" : "bg-gradient-to-r from-transparent to-amber-500")} />
          <Heart className={cn("w-4 h-4 fill-current animate-pulse", light ? "text-amber-300" : "text-rose-500")} />
          <div className={cn("h-[1.5px] w-14 md:w-24 rounded-full", light ? "bg-white/50" : "bg-gradient-to-l from-transparent to-amber-500")} />
        </div>
      </div>
    </div>
  );
}
// import { cn } from "@/lib/utils";
// import { Heart } from "lucide-react";

// interface SectionHeadingProps {
//   title: string;
//   subtitle?: string;
//   className?: string;
//   light?: boolean;
// }

// export function SectionHeading({ title, subtitle, className, light = false }: SectionHeadingProps) {
//   return (
//     <div className={cn("text-center mb-16 space-y-4", className)}>
//       {subtitle && (
//         <span className={cn(
//           "font-script text-3xl md:text-4xl block mb-2",
//           light ? "text-primary/90" : "text-primary"
//         )}>
//           {subtitle}
//         </span>
//       )}
      
//       <div className="relative inline-block">
//         <h2 className={cn(
//           "text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-wider relative z-10",
//           light ? "text-white" : "text-foreground"
//         )}>
//           {title}
//         </h2>
//         <div className="flex justify-center mt-4 items-center gap-4 opacity-60">
//           <div className={cn("h-[1px] w-12 md:w-24", light ? "bg-white/50" : "bg-primary/30")} />
//           <Heart className={cn("w-4 h-4 fill-current", light ? "text-white/70" : "text-primary/40")} />
//           <div className={cn("h-[1px] w-12 md:w-24", light ? "bg-white/50" : "bg-primary/30")} />
//         </div>
//       </div>
//     </div>
//   );
// }
