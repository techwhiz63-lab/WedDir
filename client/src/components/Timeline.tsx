import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineScenes } from "@/data/timelineData";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export function Timeline() {
  const [currentScene, setCurrentScene] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const totalScenes = timelineScenes.length;

  const goToScene = useCallback(
    (index: number) => {
      setCurrentScene(Math.max(0, Math.min(totalScenes - 1, index)));
    },
    [totalScenes]
  );

  const goToNext = useCallback(
    () => goToScene(currentScene + 1),
    [currentScene, goToScene]
  );
  const goToPrev = useCallback(
    () => goToScene(currentScene - 1),
    [currentScene, goToScene]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToNext, goToPrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -45) goToNext();
    if (diff > 45) goToPrev();
    touchStartX.current = null;
  };

  const scene = timelineScenes[currentScene];

  return (
    <section
      id="story"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative py-20 lg:py-28 bg-transparent overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeading title="Our Love Story" subtitle="Chapters of Forever" />

        {/* Interactive Chapter Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {timelineScenes.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToScene(idx)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                idx === currentScene
                  ? "bg-gradient-to-r from-rose-900 via-amber-800 to-rose-900 text-amber-50 shadow-md scale-105"
                  : "bg-white/75 text-stone-600 border border-amber-300/60 hover:bg-amber-50"
              }`}
            >
              0{idx + 1}. {item.title}
            </button>
          ))}
        </div>

        {/* Active Chapter Showcase Card */}
        <div className="relative kasavu-glass rounded-[2rem] p-6 sm:p-10 lg:p-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              {/* Local Scene Photo */}
              <div className="relative aspect-[4/5] max-w-md w-full mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-amber-300/60 bg-amber-50">
                <img
                  src={scene.image.src}
                  alt={scene.image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: scene.image.focalPoint || "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] uppercase tracking-widest font-semibold text-amber-950">
                  Chapter 0{currentScene + 1} / 0{totalScenes}
                </span>
              </div>

              {/* Story Details */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/70 text-amber-900 text-xs uppercase tracking-[0.22em] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{scene.date}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold bg-gradient-to-r from-rose-950 via-amber-900 to-rose-900 bg-clip-text text-transparent leading-tight">
                  {scene.title}
                </h3>

                <div className="h-1 w-20 bg-gradient-to-r from-rose-600 to-amber-500 rounded-full" />

                <blockquote className="relative bg-white/80 rounded-2xl p-6 border border-amber-200/70 shadow-sm">
                  <p className="text-base sm:text-lg leading-relaxed text-stone-700 font-light">
                    &ldquo;{scene.message}&rdquo;
                  </p>
                </blockquote>

                {/* Prev / Next Controls */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    {timelineScenes.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Chapter ${i + 1}`}
                        onClick={() => goToScene(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentScene
                            ? "w-8 bg-rose-800"
                            : "w-2 bg-amber-400/60"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPrev}
                      disabled={currentScene === 0}
                      aria-label="Previous chapter"
                      className="p-2.5 rounded-full bg-white border border-amber-300 text-stone-800 disabled:opacity-40 hover:bg-amber-50 transition cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      disabled={currentScene === totalScenes - 1}
                      aria-label="Next chapter"
                      className="p-2.5 rounded-full bg-rose-900 text-amber-50 disabled:opacity-40 hover:bg-rose-800 transition cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
