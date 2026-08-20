import clsx from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-start",
      )}
    >
      {eyebrow ? (
        <span
          className={clsx(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase",
            tone === "light"
              ? "border-forest/20 bg-forest/5 text-forest"
              : "border-white/20 bg-white/10 text-gold-light",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={clsx(
          "font-display text-3xl leading-tight font-semibold text-balance sm:text-4xl",
          tone === "light" ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={clsx(
            "max-w-2xl text-base leading-relaxed text-balance sm:text-lg",
            align === "center" ? "mx-auto" : "",
            tone === "light" ? "text-muted" : "text-cream/70",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
