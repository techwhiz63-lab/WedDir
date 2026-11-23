import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const LOGO_URL = "/images/logo.jpeg";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Couple", href: "#couple" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Wedding", href: "#wedding" },
  { label: "Reception", href: "#reception" },
  { label: "Family", href: "#family" },
  { label: "Blessings", href: "#greetings" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    const performScroll = () => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    };

    if (location === "/") {
      performScroll();
      return;
    }

    setLocation("/");
    setMobileOpen(false);
    setTimeout(performScroll, 200);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-display",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-amber-300/40 shadow-sm py-2 sm:py-3"
            : "bg-white/90 backdrop-blur-sm lg:bg-transparent py-4 sm:py-6"
        )}
      >
        <div className="container mx-auto px-3 sm:px-6 flex items-center justify-between max-w-7xl">
          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="lg:hidden text-stone-800 p-2 hover:bg-amber-100/60 rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Left Links */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 flex-1 justify-end">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs uppercase tracking-[0.25em] hover:text-rose-800 transition-all duration-300 text-stone-700 hover:tracking-[0.28em] font-semibold"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Center Monogram Logo */}
          <div className="mx-4 sm:mx-8 lg:mx-10 flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="relative block"
            >
              <div
                className={cn(
                  "rounded-full border-2 border-amber-400 transition-all duration-500 hover:scale-105 bg-white p-1 shadow-md",
                  scrolled
                    ? "h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
                    : "h-16 w-16 sm:h-20 sm:w-20 lg:h-22 lg:w-22"
                )}
              >
                <img
                  src={LOGO_URL}
                  alt="Couple Monogram"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </a>
          </div>

          {/* Desktop Right Links */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 flex-1 justify-start">
            {NAV_ITEMS.slice(4).map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-xs uppercase tracking-[0.25em] hover:text-rose-800 transition-all duration-300 text-stone-700 hover:tracking-[0.28em] font-semibold"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="w-8 lg:hidden" />
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#FDF6EC]/95 backdrop-blur-xl z-[9999] lg:hidden overflow-y-auto">
          <button
            type="button"
            aria-label="Close Menu"
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/80 border border-amber-300/60 text-stone-800 z-[10000]"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24 gap-6">
            <img
              src={LOGO_URL}
              alt="Logo"
              className="w-16 h-16 rounded-full border-2 border-amber-400 object-cover mb-2 shadow"
            />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-2xl sm:text-3xl font-display text-stone-800 hover:text-rose-800 transition-colors duration-300 text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
