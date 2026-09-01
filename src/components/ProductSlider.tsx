"use client";

import { useRef, useEffect, useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

/**
 * Mobile-only horizontal snap slider for product cards.
 * The center card scales up (pop-up effect) while side cards dim slightly.
 * On sm+ screens this component is hidden — the normal grid is shown instead.
 */
export function ProductSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect which card is most centred in the scroll track
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index ?? 0,
            );
            setActiveIndex(index);
          }
        });
      },
      { root: track, threshold: 0.6 },
    );

    const cards = track.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={trackRef}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 sm:hidden"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {products.map((product, i) => (
        <div
          key={product.slug}
          data-index={i}
          className="snap-center shrink-0 transition-all duration-300"
          style={{
            width: "78vw",
            maxWidth: 320,
            transform: activeIndex === i ? "scale(1.04)" : "scale(0.93)",
            opacity: activeIndex === i ? 1 : 0.6,
          }}
        >
          {/* Shadow "pop up" glow beneath active card */}
          {activeIndex === i && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
              style={{
                boxShadow: "0 20px 40px -8px rgba(0,0,0,0.35)",
                borderRadius: "1rem",
              }}
            />
          )}
          <ProductCard product={product} />
        </div>
      ))}
      {/* Trailing spacer so last card can snap centre on small viewports */}
      <div className="shrink-0" style={{ width: "calc(50vw - 39vw)" }} />
    </div>
  );
}
