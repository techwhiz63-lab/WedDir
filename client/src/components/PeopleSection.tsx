import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { weddingData } from "@/data/weddingData";
import { Instagram } from "lucide-react";
import { TiltedCard } from "@/components/TiltedCard";

export function PeopleSection() {
  return (
    <section id="people" className="py-24 lg:py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <SectionHeading title="Important People" subtitle="Our Beloved Family" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {weddingData.people.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltedCard
                maxTilt={10}
                className="group relative aspect-[3/4] border border-amber-300/60 rounded-2xl shadow-lg"
              >
                <img
                  src={person.profileUrl}
                  alt={person.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-2xl font-display text-amber-50 mb-1">{person.name}</h4>
                      <p className="text-amber-200/90 font-light text-sm mb-1">{person.relationship}</p>
                      <p className="text-white/60 font-light text-xs uppercase tracking-wider">
                        {person.side === "groom" ? "Groom's Side" : "Bride's Side"}
                      </p>
                    </div>
                    {person.instagramUrl && (
                      <a
                        href={person.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/15 backdrop-blur-md hover:bg-rose-500 transition-colors"
                      >
                        <Instagram className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
