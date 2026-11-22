import React, { useEffect, useRef } from "react";

interface ParticlesProps {
  particleColors?: string[];
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleBaseSize?: number;
  moveParticlesOnHover?: boolean;
  alphaParticles?: boolean;
  disableRotation?: boolean;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  phase: number;
}

const Particles: React.FC<ParticlesProps> = ({
  particleColors = ["#D4AF37", "#F3E5AB", "#E6BE8A"],
  particleCount = 65,
  speed = 0.06,
  particleBaseSize = 85,
  moveParticlesOnHover = true,
  alphaParticles = true,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Scale down particle count slightly on smaller mobile viewports for smooth 60fps
    const effectiveCount =
      window.innerWidth < 768 ? Math.floor(particleCount * 0.6) : particleCount;

    const particles: Particle[] = Array.from({ length: effectiveCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed * 8,
      vy: -Math.abs(Math.random() * speed * 8) - 0.1,
      size: Math.max(1.5, (Math.random() * 0.8 + 0.4) * (particleBaseSize / 25)),
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: Math.random() * 0.6 + 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    if (moveParticlesOnHover) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.phase += 0.02;
        p.x += p.vx + Math.sin(p.phase) * 0.15;
        p.y += p.vy;

        if (moveParticlesOnHover && mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            p.x += (dx / dist) * 0.6;
            p.y += (dy / dist) * 0.6;
          }
        }

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = alphaParticles
          ? p.alpha * (0.7 + 0.3 * Math.sin(p.phase))
          : 0.8;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      if (moveParticlesOnHover) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [particleColors, particleCount, speed, particleBaseSize, moveParticlesOnHover, alphaParticles]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

export default Particles;
