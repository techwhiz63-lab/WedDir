// client/src/components/FloatingDock.tsx
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
  Images,
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

  const widthSync = useTransform(distance, [-110, 0, 110], [38, 52, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
      return;
    }
    if (item.href) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
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
          ? "bg-gradient-to-br from-rose-900 to-amber-800 text-amber-50 border-amber-300 shadow-md"
          : "bg-white/95 hover:bg-amber-50 text-stone-700 hover:text-rose-900 border-amber-300/70 shadow-sm"
      }`}
    >
      <span className="w-4 h-4 flex items-center justify-center">
        {item.icon}
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
    { label: "Story", href: "#story", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Gallery", href: "#gallery", icon: <Images className="w-4 h-4" /> },
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
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[96vw]">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex items-end gap-1.5 sm:gap-2.5 px-3 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-amber-300/75 shadow-[0_12px_36px_-8px_rgba(120,53,15,0.28)]"
      >
        {navItems.map((item) => (
          <DockIcon key={item.label} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
};
