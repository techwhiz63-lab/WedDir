import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  letterClassName = "text-rose-950",
  delay = 50,
}) => {
  const letters = Array.from(text || "");

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block ${letterClassName}`}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
