import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltedCard } from "@/components/TiltedCard";
import { X, Expand } from "lucide-react";

interface GalleryPhoto {
  src: string;
  caption: string;
}

const LOCAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/images/couple/coupleI-banner.jpeg", caption: "Together Forever" },
  { src: "/images/timeline/scene-1.jpg", caption: "Where It All Began" },
  { src: "/images/timeline/scene-2.png", caption: "Cherished Conversations" },
  { src: "/images/engagement-bg.jpg", caption: "The Engagement Bliss" },
  { src: "/images/timeline/scene-3.jpg", caption: "Golden Hour Memories" },
  { src: "/images/timeline/scene-5.jpg", caption: "Counting Down to Forever" },
];

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeading
          title="Captured Moments"
          subtitle="Our Pre-Wedding Gallery"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCAL_GALLERY_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group"
            >
              <TiltedCard
                maxTilt={7}
                className="aspect-[4/5] border-2 border-amber-300/60 rounded-2xl bg-white/60"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                  <p className="font-display text-lg text-amber-50">
                    {photo.caption}
                  </p>
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                    <Expand className="w-4 h-4 text-amber-200" />
                  </span>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white/10 border border-amber-300/40 rounded-3xl p-3 shadow-2xl"
            >
              <button
                type="button"
                aria-label="Close photo"
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-4 -right-4 p-2.5 rounded-full bg-white text-stone-900 shadow-lg hover:bg-amber-50 transition cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />
              <p className="text-center font-display text-xl text-amber-100 mt-3 mb-1">
                {selectedPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;
