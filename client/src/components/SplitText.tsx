import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
}) => {
  const letters = Array.from(text);

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export default SplitText;
