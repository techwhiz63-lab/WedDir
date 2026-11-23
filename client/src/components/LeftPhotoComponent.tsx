import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LeftPhotoComponentProps {
  videoUrl: string;
  posterUrl?: string;
}

export function LeftPhotoComponent({
  videoUrl,
  posterUrl = "/images/couple/coupleI-banner.jpeg",
}: LeftPhotoComponentProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return; // Respect mobile Data Saver mode

    const timer = setTimeout(() => setShouldLoadVideo(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[52vh] sm:h-[60vh] lg:h-screen relative overflow-hidden flex items-center justify-center bg-transparent p-4 sm:p-6 lg:p-10 lg:pt-28">
      <div className="relative w-full h-full max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/60 bg-amber-50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 z-10 pointer-events-none" />
        {shouldLoadVideo ? (
          <motion.video
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <img
            src={posterUrl}
            alt="Couple"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
}
