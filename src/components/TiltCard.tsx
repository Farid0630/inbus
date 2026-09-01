"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import clsx from "clsx";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  function handlePointerEnter() {
    const el = ref.current;
    if (!el) return;
    rectRef.current = el.getBoundingClientRect();
    el.style.willChange = "transform";
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    const rect = rectRef.current;
    if (!el || !rect) return;

    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function handlePointerLeave() {
    const el = ref.current;
    if (!el) return;
    rectRef.current = null;
    el.style.transform = "";
    el.style.willChange = "";
  }

  return (
    <div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ transformStyle: "preserve-3d" }}
      className={clsx("transition-transform duration-150 ease-out", className)}
    >
      {children}
    </div>
  );
}

