import React from "react";
import { motion } from "framer-motion";

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 50,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  delay = 0,
  className = "",
}) => {
  const offset = reverse ? -distance : distance;

  const initial = {
    opacity: animateOpacity ? initialOpacity : 1,
    x: direction === "horizontal" ? offset : 0,
    y: direction === "vertical" ? offset : 0,
    scale,
  };

  const whileInView = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContent;
