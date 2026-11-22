import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 4,
  className = "",
}) => {
  return (
    <>
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-gold-shimmer {
          background: linear-gradient(
            110deg,
            #78350f 20%,
            #b45309 38%,
            #f59e0b 50%,
            #9f1239 62%,
            #78350f 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: goldShimmer var(--shimmer-duration, 4s) linear infinite;
        }
      `}</style>
      <span
        style={{ "--shimmer-duration": `${speed}s` } as React.CSSProperties}
        className={`${disabled ? "" : "animate-gold-shimmer"} inline-block ${className}`}
      >
        {text}
      </span>
    </>
  );
};

export default ShinyText;
