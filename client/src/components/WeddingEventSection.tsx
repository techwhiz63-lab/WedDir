import { useState } from "react";
import { weddingData } from "@/data/weddingData";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Eye,
  ExternalLink,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export function WeddingEventSection() {
  const ceremony = weddingData.wedding.ceremony;
  const [showCardModal, setShowCardModal] = useState(false);

  const generateCalendarUrl = () => {
    const startDate = new Date(weddingData.wedding.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    return `https://google.com{encodeURIComponent(
      ceremony.title
    )}&dates=${formatDate(startDate)}/${formatDate(
      endDate
    )}&details=${encodeURIComponent(
      ceremony.description
    )}&location=${encodeURIComponent(ceremony.location)}`;
  };

  return (
    <section
      id="wedding"
      className="py-16 lg:py-24 relative overflow-hidden bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="The Wedding" subtitle="Sacred Muhurtham" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/95 rounded-3xl shadow-[0_14px_45px_-12px_rgba(120,53,15,0.16)] overflow-hidden border border-amber-300/60">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Column - Local Hero Backdrop */}
              <div
                style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                className="relative bg-cover bg-center p-8 lg:p-10 flex flex-col justify-between min-h-[380px]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/35 pointer-events-none"
                />

                <div className="relative z-10">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 text-xs uppercase tracking-widest font-semibold mb-4">
                    Ceremony Venue
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display text-white mb-4 leading-tight">
                    {ceremony.place}
                  </h3>
                  <div className="flex items-start gap-3 text-white/90">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-300" />
                    <p className="text-sm sm:text-base leading-relaxed">
                      {ceremony.location}
                    </p>
                  </div>
                </div>

                <a
                  href={ceremony.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-8 inline-flex items-center justify-center gap-3 bg-white text-rose-900 rounded-xl px-6 py-4 font-semibold text-sm uppercase tracking-wider shadow-lg hover:bg-amber-50 transition-all"
                >
                  <Navigation className="w-4 h-4 text-rose-700" />
                  Navigate to Venue
                  <ExternalLink className="w-4 h-4 opacity-60" />
                </a>
              </div>

              {/* Right Column - Details & Actions */}
              <div className="p-8 lg:p-10 flex flex-col justify-between bg-white">
                <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-light italic border-l-4 border-rose-400 pl-4 mb-8">
                  &ldquo;{ceremony.description}&rdquo;
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-amber-50/60 rounded-2xl p-4 text-center border border-amber-200/70">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2.5">
                      <Calendar className="w-5 h-5 text-rose-700" />
                    </div>
                    <p className="text-[11px] uppercase text-stone-500 font-semibold tracking-wider mb-1">
                      Date
                    </p>
                    <p className="text-sm font-bold text-stone-800">
                      {ceremony.date}
                    </p>
                  </div>

                  <div className="bg-amber-50/60 rounded-2xl p-4 text-center border border-amber-200/70">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2.5">
                      <Clock className="w-5 h-5 text-amber-700" />
                    </div>
                    <p className="text-[11px] uppercase text-stone-500 font-semibold tracking-wider mb-1">
                      Time
                    </p>
                    <p className="text-sm font-bold text-stone-800">
                      {ceremony.time}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={generateCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-900 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:bg-stone-800 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Add to Calendar
                  </a>

                  <button
                    type="button"
                    onClick={() => setShowCardModal(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-700 text-white rounded-xl px-4 py-3.5 font-medium text-sm hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View Invite Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Local Invitation Card Modal */}
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
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 shadow-2xl border border-amber-300/60"
            >
              <button
                type="button"
                onClick={() => setShowCardModal(false)}
                aria-label="Close invitation card"
                className="absolute -top-3 -right-3 bg-white text-stone-800 p-2 rounded-full shadow-lg hover:bg-rose-50 transition cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[80vh] overflow-y-auto rounded-2xl">
                <img
                  src={
                    ceremony.invitationCardUrl ||
                    "/images/invites/wedding_card.png"
                  }
                  alt={ceremony.title}
                  className="w-full h-auto rounded-2xl object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
