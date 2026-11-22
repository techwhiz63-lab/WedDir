import React, { useEffect, useRef } from "react";

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk: React.FC<SilkProps> = ({
  speed = 2.4,
  scale = 1.15,
  color = "#D4AF37",
  noiseIntensity = 1.35,
  rotation = 0.12,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.01 * speed;
      const { width, height } = canvas;

      ctx.clearRect(0, 0, width, height);

      // Rich warm ivory -> rose-blush -> champagne backdrop
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, "rgba(253, 244, 231, 0.95)");
      baseGrad.addColorStop(0.5, "rgba(250, 232, 224, 0.85)");
      baseGrad.addColorStop(1, "rgba(245, 224, 195, 0.95)");
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.translate(-width / 2, -height / 2);

      // Layered rose-gold & antique gold silk ribbons
      const ribbons = [
        { top: "rgba(212, 175, 55, 0.22)", mid: "rgba(244, 194, 194, 0.28)" },
        { top: "rgba(225, 173, 102, 0.24)", mid: "rgba(255, 236, 210, 0.35)" },
        { top: "rgba(190, 130, 90, 0.18)", mid: "rgba(248, 210, 200, 0.26)" },
        { top: "rgba(212, 175, 55, 0.20)", mid: "rgba(255, 248, 235, 0.40)" },
        { top: "rgba(232, 165, 152, 0.20)", mid: "rgba(212, 175, 55, 0.16)" },
      ];

      ribbons.forEach((palette, i) => {
        ctx.beginPath();
        const phase = time + i * 1.25;
        const amplitude = height * 0.11 * noiseIntensity;
        const yBase = (height / (ribbons.length + 1)) * (i + 1);

        ctx.moveTo(-120, height + 120);
        for (let x = -120; x <= width + 120; x += 20) {
          const y =
            yBase +
            Math.sin(x * 0.0032 + phase) * amplitude +
            Math.cos(x * 0.0018 - phase * 0.75) * (amplitude * 0.55);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width + 120, height + 120);
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(0, yBase - amplitude, 0, yBase + amplitude * 1.8);
        ribbonGrad.addColorStop(0, palette.top);
        ribbonGrad.addColorStop(0.55, palette.mid);
        ribbonGrad.addColorStop(1, "rgba(255, 250, 245, 0)");

        ctx.fillStyle = ribbonGrad;
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

export default Silk;
