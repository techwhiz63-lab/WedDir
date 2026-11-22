import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  Heart,
  BookOpen,
  CalendarHeart,
  Users,
  MessageCircleHeart,
  Volume2,
  VolumeX,
} from "lucide-react";

interface FloatingDockProps {
  isMuted: boolean;
  onToggleAudio: () => void;
  showAudio: boolean;
}

interface DockItemConfig {
  label: string;
  href?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: DockItemConfig;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (item.href) {
      const el = document.querySelector(item.href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      style={{ width, height: width }}
      whileTap={{ scale: 0.9 }}
      aria-label={item.label}
      className={`group relative flex items-center justify-center rounded-full border transition-colors cursor-pointer ${
        item.isActive
          ? "bg-gradient-to-br from-rose-800 to-amber-700 text-amber-50 border-amber-300 shadow-md"
          : "bg-white/90 hover:bg-amber-50 text-stone-700 hover:text-rose-800 border-amber-300/60 shadow-sm"
      }`}
    >
      <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
        {item.icon}
      </span>

      {/* Hover Tooltip on Desktop */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-stone-900/90 text-amber-50 text-[10px] uppercase tracking-widest font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block shadow-md">
        {item.label}
      </span>
    </motion.button>
  );
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  isMuted,
  onToggleAudio,
  showAudio,
}) => {
  const mouseX = useMotionValue(Infinity);

  const navItems: DockItemConfig[] = [
    { label: "Couple", href: "#couple", icon: <Heart className="w-4 h-4" /> },
    { label: "Our Story", href: "#story", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Events", href: "#wedding", icon: <CalendarHeart className="w-4 h-4" /> },
    { label: "Family", href: "#family", icon: <Users className="w-4 h-4" /> },
    { label: "Blessings", href: "#greetings", icon: <MessageCircleHeart className="w-4 h-4" /> },
  ];

  if (showAudio) {
    navItems.push({
      label: isMuted ? "Unmute Music" : "Mute Music",
      onClick: onToggleAudio,
      isActive: !isMuted,
      icon: isMuted ? (
        <VolumeX className="w-4 h-4 text-stone-500" />
      ) : (
        <Volume2 className="w-4 h-4 animate-pulse" />
      ),
    });
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 rounded-full bg-white/75 backdrop-blur-xl border border-amber-300/70 shadow-[0_12px_40px_-8px_rgba(120,53,15,0.28)]"
      >
        {navItems.map((item) => (
          <DockIcon key={item.label} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
