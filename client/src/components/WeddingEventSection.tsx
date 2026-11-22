import { useState } from "react";
import { weddingData } from "@/data/weddingData";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Navigation, Eye, ExternalLink, X } from "lucide-react";

export function WeddingEventSection() {
  const ceremony = weddingData.wedding.ceremony;
  const [showCardModal, setShowCardModal] = useState(false);

  const generateCalendarUrl = () => {
    const startDate = new Date(weddingData.wedding.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };
    return `https://google.com{encodeURIComponent(ceremony.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(ceremony.description)}&location=${encodeURIComponent(ceremony.location)}`;
  };

  return (
    <section id="wedding" className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-display text-center text-stone-800 mb-12"
        >
          Wedding
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          {/* Single Card Container */}
          <div className="bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] overflow-hidden border border-stone-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Venue & Navigation */}
              <div
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                className="relative bg-cover bg-center p-8 lg:p-10 flex flex-col justify-between min-h-[400px]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-black/50 pointer-events-none"
                />
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-4 leading-tight">
                    {ceremony.place}
                  </h3>

                  <div className="flex items-start gap-3 text-white/90">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="text-sm sm:text-base leading-relaxed">
                      {ceremony.location}
                    </p>
                  </div>
                </div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={ceremony.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-3 bg-white text-rose-700 rounded-xl px-6 py-4 font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Navigation className="w-5 h-5" />
                  Navigate to Venue
                  <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </div>

              {/* Right Column - Details & Actions */}
              <div className="p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div className="mb-8">
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light italic border-l-4 border-rose-200 pl-4">
                    &ldquo;{ceremony.description}&rdquo;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="w-5 h-5 text-rose-600" />
                    </div>
                    <p className="text-xs uppercase text-stone-500 font-medium tracking-wider mb-1">Date</p>
                    <p className="text-sm font-semibold text-stone-800">{ceremony.date}</p>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-4 text-center border border-stone-100">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-5 h-5 text-pink-600" />
                    </div>
                    <p className="text-xs uppercase text-stone-500 font-medium tracking-wider mb-1">Time</p>
                    <p className="text-sm font-semibold text-stone-800">{ceremony.time}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={generateCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:bg-stone-800 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </motion.a>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowCardModal(true)}
                    className="flex items-center justify-center gap-2 bg-rose-600 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View Card
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* View Invitation Card Lightbox Modal */}
      <AnimatePresence>
        {showCardModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCardModal(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-rose-200/60"
            >
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                aria-label="Close invitation card"
                className="absolute -top-3 -right-3 bg-white text-stone-800 p-2 rounded-full shadow-lg hover:bg-rose-50 hover:text-rose-700 transition cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[80vh] overflow-y-auto rounded-2xl">
                <img
                  src={ceremony.invitationCardUrl}
                  alt={ceremony.title}
                  className="w-full h-auto rounded-2xl object-contain"
                />
              </div>

              <p className="text-center text-xs uppercase tracking-widest text-stone-500 font-medium mt-3 mb-1">
                {ceremony.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
