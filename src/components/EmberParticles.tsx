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
  alpha: number;
  color: string;
}

export function EmberParticles({
  className,
  density = 16,
}: {
  className?: string;
  density?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Di layar mobile (<768px), nonaktifkan canvas particle untuk mencegah lag GPU / delay scrolling
    if (window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];
    let animId = 0;
    let isRunning = false;

    function spawn(): Particle {
      const warm = Math.random() > 0.45;
      return {
        x: Math.random() * (width || 300),
        y: (height || 200) + Math.random() * 20,
        r: 1 + Math.random() * 1.8,
        vy: 0.3 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.25,
        life: 0,
        maxLife: 180 + Math.random() * 200,
        alpha: 0,
        color: warm ? "224, 182, 114" : "203, 106, 68",
      };
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    particles = Array.from({ length: density }, spawn);

    function tick() {
      if (!ctx || !isRunning) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.life * 0.025) * 0.12;
        p.life += 1;

        const ratio = p.life / p.maxLife;
        const fade = ratio < 0.15 ? ratio / 0.15 : ratio > 0.75 ? (1 - ratio) / 0.25 : 1;
        p.alpha = Math.max(0, Math.min(1, fade));

        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = spawn();
        }
      }

      animId = requestAnimationFrame(tick);
    }

    function start() {
      if (isRunning) return;
      isRunning = true;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(tick);
    }

    function stop() {
      isRunning = false;
      cancelAnimationFrame(animId);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState !== "hidden") {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

