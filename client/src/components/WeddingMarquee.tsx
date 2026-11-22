import React from "react";
import { weddingData } from "@/data/weddingData";

export const WeddingMarquee: React.FC = () => {
  const items = [
    `${weddingData.groom.name} ♥ ${weddingData.bride.name}`,
    weddingData.wedding.dateShort,
    "Two Souls, One Heart",
    weddingData.wedding.location || "Kerala, India",
    "Join Our Celebration",
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 bg-gradient-to-r from-rose-950 via-amber-900 to-rose-950 border-y border-amber-400/40 shadow-md z-20">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-wedding-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 26s linear infinite;
        }
        .animate-wedding-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-wedding-marquee">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-100 font-display font-medium px-6">
              {text}
            </span>
            <span className="text-amber-400 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
