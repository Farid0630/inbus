"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  life: number;
  maxLife: number;
  warm: boolean;
}

export function EmberParticles({
  className,
  density = 40,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let animId = 0;

    function spawn(): Particle {
      return {
        x: Math.random() * width,
        y: height + Math.random() * 40,
        r: 1 + Math.random() * 2,
        vy: 0.25 + Math.random() * 0.55,
        vx: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 220 + Math.random() * 260,
        warm: Math.random() > 0.5,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    particles = Array.from({ length: density }, spawn);

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.15;
        p.life += 1;

        const lifeRatio = p.life / p.maxLife;
        const alpha =
          lifeRatio < 0.15 ? lifeRatio / 0.15 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1;
        const color = p.warm ? "224, 182, 114" : "203, 106, 68";

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `rgba(${color}, ${Math.max(alpha, 0) * 0.9})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -20) {
          Object.assign(p, spawn());
        }
      }

      animId = requestAnimationFrame(tick);
    }

    function start() {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(tick);
    }
    function stop() {
      cancelAnimationFrame(animId);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
