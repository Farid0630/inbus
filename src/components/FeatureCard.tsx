import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

export function FeatureCard({
  icon: Icon,
  title,
  desc,
  tone = "light",
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4 rounded-2xl border p-6",
        tone === "light" ? "border-line bg-cream" : "border-white/10 bg-white/5",
      )}
    >
      <span
        className={clsx(
          "flex size-11 items-center justify-center rounded-xl",
          tone === "light" ? "bg-forest/10 text-forest" : "bg-gold/15 text-gold-light",
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3
          className={clsx(
            "font-display text-lg font-semibold",
            tone === "light" ? "text-ink" : "text-cream",
          )}
        >
          {title}
        </h3>
        <p
          className={clsx(
            "text-sm leading-relaxed",
            tone === "light" ? "text-muted" : "text-cream/65",
          )}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}
