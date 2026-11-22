import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltedCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = "",
  maxTilt = 10,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setRotate({
      x: (0.5 - py) * maxTilt * 2,
      y: (px - 0.5) * maxTilt * 2,
    });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl"
      >
        {children}

        {/* Specular Light Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-20"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 250, 230, 0.8), transparent 65%)`,
          }}
        />
      </motion.div>
    </div>
  );
};
