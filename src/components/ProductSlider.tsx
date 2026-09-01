"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { ProductDefinition } from "@/lib/products";
import { products } from "@/lib/products";
import { ProductCard } from "./ProductCard";

/**
 * Mobile-only horizontal widget slider for product cards.
 * Features:
 * - Smooth horizontal snap scrolling
 * - Pop-up widget elevation (scale up & shadow) on active card
 * - Touch & swipe optimized with no scrollbar
 * - Interactive pagination dots
 */
export function ProductSlider({ items = products }: { items?: ProductDefinition[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll listener to update active index based on scroll position
  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollLeft = track.scrollLeft;
    const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth + 16 : 280;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(0, index), items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (card) {
      const trackWidth = track.offsetWidth;
      const cardWidth = card.offsetWidth;
      const targetScroll = card.offsetLeft - (trackWidth - cardWidth) / 2;
      track.scrollTo({ left: targetScroll, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:hidden">
      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 py-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((product, i) => {
          const isActive = activeIndex === i;
          return (
            <div
              key={product.slug}
              className={`snap-center shrink-0 transition-all duration-300 ${
                isActive
                  ? "scale-100 opacity-100 shadow-2xl shadow-ink/20 ring-2 ring-gold/40"
                  : "scale-95 opacity-70"
              }`}
              style={{
                width: "82vw",
                maxWidth: 320,
                borderRadius: "1rem",
              }}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>

      {/* Pagination Indicators & Swipe Hint */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Lihat produk ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-gold" : "w-2 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] font-medium tracking-wide text-muted">
          Geser untuk melihat semua produk ({activeIndex + 1}/{items.length})
        </p>
      </div>
    </div>
  );
}
