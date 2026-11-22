import React, { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  isPetal: boolean;
}

const COLORS = ["#D4AF37", "#F59E0B", "#E11D48", "#FDE68A", "#FB7185"];

export const ClickSpark: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isRunning = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBurst = (x: number, y: number) => {
      const count = window.innerWidth < 768 ? 10 : 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = 1.5 + Math.random() * 3.5;
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: 3 + Math.random() * 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.15,
          isPetal: i % 3 === 0,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((s) => s.alpha > 0.02);

      if (sparksRef.current.length === 0) {
        isRunning = false;
        return; // Stops loop when no sparks are active (0% idle mobile CPU!)
      }

      sparksRef.current.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.vx *= 0.98;
        s.alpha *= 0.94;
        s.rotation += s.vRot;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;

        if (s.isPetal) {
          ctx.beginPath();
          ctx.ellipse(0, 0, s.size * 1.4, s.size * 0.7, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, s.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    const handlePointerDown = (e: PointerEvent) => {
      spawnBurst(e.clientX, e.clientY);
      if (!isRunning) {
        isRunning = true;
        render();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9998] pointer-events-none"
      />
      {children}
    </>
  );
};
