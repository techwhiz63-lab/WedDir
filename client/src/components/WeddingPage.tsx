import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Calendar, Instagram, ExternalLink, Sparkles, X, Heart } from 'lucide-react';
import { weddingData } from '@/data/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface WeddingEvent {
  title: string;
  place: string;
  date: string;
  time: string;
  location: string;
  googleMapUrl: string;
  description: string;
  invitationCardUrl: string;
}

export default function WeddingPage(): React.JSX.Element {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [selectedCard, setSelectedCard] = useState<WeddingEvent | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingData.wedding.date.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { groom, bride, wedding, media } = weddingData;
  const events: WeddingEvent[] = [wedding.ceremony, wedding.reception];

    return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="relative min-h-screen bg-[#FAF7F2] text-[#1C1B1A] selection:bg-[#C5A059] selection:text-white overflow-x-hidden"
    >
      {/* LAYER 1: Ambient Champagne & Warm Silk Mesh Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Top-left warm gold aura */}
        <div
          className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full opacity-35 blur-[120px] animate-pulse"
          style={{
            background: "radial-gradient(circle, #DFC286 0%, transparent 70%)",
            animationDuration: "8s",
          }}
        />
        {/* Mid-right soft rose-sand aura */}
        <div
          className="absolute top-[38%] -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #E6D3B8 0%, transparent 70%)",
          }}
        />
        {/* Bottom-left heritage gold glow */}
        <div
          className="absolute -bottom-32 left-[15%] w-[550px] h-[550px] rounded-full opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)",
          }}
        />
      </div>

      {/* LAYER 2: Fine Luxury Paper Grain Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://w3.org id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LAYER 3: Subtle Kasavu-Inspired Architectural Viewport Border */}
      <div className="pointer-events-none fixed inset-3 md:inset-5 z-40 rounded-[1.75rem] border border-[#C5A059]/25">
        <div className="absolute inset-1 rounded-[1.5rem] border border-[#C5A059]/10" />
      </div>

      {/* CONTENT WRAPPER (Keeps all sections crisp above the background layers) */}
      <div className="relative z-10">

            {/* 1. CINEMATIC HERO SECTION */}
      <header className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-[#1A1612]">
        {/* Layer A: Vibrant Floral / Wedding Backdrop Image (fills wide laptop screens) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 blur-[3px] brightness-75 pointer-events-none"
          style={{
            backgroundImage: "url('/backg.jpg')",
          }}
        />

        {/* Warm Wedding Color Tint (blends floral colors with your Kasavu gold theme) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#2A1E12]/70 via-transparent to-[#2A1E12]/70 pointer-events-none"
        />

        {/* Layer B: Full Uncropped Video (framed cleanly in center on laptop, fullscreen on mobile) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={media.coupleBg}
          className="absolute inset-0 m-auto w-full h-full md:w-auto md:max-w-[560px] object-contain md:object-cover md:rounded-2xl md:border md:border-[#E5C687]/35 md:shadow-2xl filter brightness-90 pointer-events-none"
        >
          {/* <source src={media.coupleVideo} type="video/mp4" /> */}
        </video>

        {/* Bottom Fade into Page Background (#FAF7F2) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-[#FAF7F2] pointer-events-none" />

        {/* Layer C: Dead-Center Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 w-full max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[11px] sm:text-xs md:text-sm text-white/95 mb-3 sm:mb-4 font-medium drop-shadow">
            Together with their families
          </p>

          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-tight leading-[1.05] drop-shadow-md"
          >
            {groom.name}{" "}
            <span className="italic text-[#E5C687]">&amp;</span>{" "}
            {bride.name}
          </h1>

          <div className="mt-6 sm:mt-8 inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-black/30 backdrop-blur-md border border-[#E5C687]/40 text-white text-xs sm:text-sm tracking-widest uppercase">
            <span>{wedding.dateShort}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5C687]" />
            <span>Kerala, India</span>
          </div>
        </div>
      </header>

      {/* 2. FLOATING COUNTDOWN BAR */}
      <section className="relative z-20 -mt-16 max-w-3xl mx-auto px-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-[#EAE5DC] p-6 md:p-8 grid grid-cols-4 gap-4 text-center">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl md:text-5xl font-normal text-[#1C1B1A]"
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#7A746C] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL COUPLE SHOWCASE */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
            The Couple
          </span>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl md:text-5xl mt-3 font-normal"
          >
            Two Souls, One Frame
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          {/* Groom Card */}
          <div className="group bg-white rounded-[2rem] p-6 md:p-8 border border-[#EAE5DC] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-8 bg-[#F2EFE9]">
                <img
                  src={groom.photoUrl}
                  alt={groom.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium">
                  {groom.role}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-[#1C1B1A]">
                  {groom.fullName}
                </h3>
                {groom.social?.instagram && (
                  <a href={groom.social.instagram} target="_blank" rel="noreferrer" className="text-[#7A746C] hover:text-[#C5A059] transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-1 font-medium">
                {groom.profession} • {groom.company}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[#5C5751] mt-4 italic text-xl leading-relaxed">
                "{groom.quote}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0ECE4] text-sm text-[#6E685F] space-y-1">
              <p><span className="font-medium text-[#1C1B1A]">Parents:</span> {groom.family.father} &amp; {groom.family.mother}</p>
              <p><span className="font-medium text-[#1C1B1A]">From:</span> {groom.location}</p>
            </div>
          </div>

          {/* Bride Card */}
          <div className="group bg-white rounded-[2rem] p-6 md:p-8 border border-[#EAE5DC] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-8 bg-[#F2EFE9]">
                <img
                  src={bride.photoUrl}
                  alt={bride.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium">
                  {bride.role}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-[#1C1B1A]">
                  {bride.fullName}
                </h3>
                {bride.social?.instagram && (
                  <a href={bride.social.instagram} target="_blank" rel="noreferrer" className="text-[#7A746C] hover:text-[#C5A059] transition">
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-xs uppercase tracking-widest text-[#C5A059] mt-1 font-medium">
                {bride.profession} • {bride.company}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[#5C5751] mt-4 italic text-xl leading-relaxed">
                "{bride.quote}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0ECE4] text-sm text-[#6E685F] space-y-1">
              <p><span className="font-medium text-[#1C1B1A]">Parents:</span> {bride.family.father} &amp; {bride.family.mother}</p>
              <p><span className="font-medium text-[#1C1B1A]">Siblings:</span> {bride.family.sister} &amp; {bride.family.brother}</p>
              <p><span className="font-medium text-[#1C1B1A]">From:</span> {bride.location}</p>
            </div>
          </div>
        </div>
      </section>
            {/* 4. FULL-BLEED COUPLE FEATURE BANNER */}
      <section className="px-6 max-w-6xl mx-auto mb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden h-[450px] md:h-[550px]">
          <img src={media.coupleImg} alt="Akhil and Sethu" className="w-full h-auto block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8 md:p-14">
            <div className="max-w-xl text-white">
              <Sparkles className="w-6 h-6 text-[#E5C687] mb-3" />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl md:text-4xl leading-snug">
                "In all the world, there is no heart for me like yours."
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EVENTS & VENUES TIMELINE */}
      <section className="py-20 bg-[#F3EFE8] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
              The Celebrations
            </span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-4xl md:text-5xl mt-3">
              When &amp; Where
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event: WeddingEvent, idx: number) => (
              <div
                key={event.title}
                className="bg-[#FAF8F5] rounded-[2rem] p-8 md:p-10 border border-[#E5DEC9] flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#C5A059]/15 text-[#9A7836] text-xs uppercase tracking-widest font-semibold mb-4">
                    Event 0{idx + 1}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-[#1C1B1A] mb-3">
                    {event.title}
                  </h3>
                  <p className="text-[#5C5751] text-sm leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <div className="space-y-3.5 text-sm text-[#3A3734] border-t border-[#EAE5DC] pt-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-[#1C1B1A]">{event.place}</p>
                        <p className="text-[#6E685F] mt-0.5">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-[#EAE5DC] flex flex-wrap gap-3">
                  <a
                    href={event.googleMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#1C1B1A] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#33312F] transition"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCard(event)}
                    className="px-5 py-3.5 rounded-xl border border-[#1C1B1A]/20 text-xs uppercase tracking-widest font-medium hover:bg-white transition cursor-pointer"
                  >
                    View Invite Card
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MINIMALIST FOOTER */}
      <footer className="py-16 text-center px-6 bg-[#FAF8F5] border-t border-[#EAE5DC]">
        <Heart className="w-5 h-5 text-[#C5A059] mx-auto mb-4" />
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-3xl text-[#1C1B1A]">
          {groom.name} &amp; {bride.name}
        </h4>
        <p className="text-xs uppercase tracking-[0.25em] text-[#7A746C] mt-2">
          {wedding.dateString} • Forever Begins
        </p>
      </footer>

      {/* 7. INVITATION CARD LIGHTBOX MODAL */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl p-4 shadow-2xl"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              aria-label="Close modal"
              className="absolute -top-4 -right-4 bg-white text-[#1C1B1A] p-2.5 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
                        </button>
            <img
              src={selectedCard.invitationCardUrl}
              alt={selectedCard.title}
              className="w-full h-auto rounded-2xl"
            />
            <p className="text-center text-xs uppercase tracking-widest text-[#6E685F] mt-3 mb-1">
              {selectedCard.title}
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}


