import { useTranslations } from "next-intl";
import { Leaf, BadgeCheck, ShieldCheck, CircleCheck, type LucideIcon } from "lucide-react";
import type { siteConfig } from "@/lib/site-config";

const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  "badge-check": BadgeCheck,
  "shield-check": ShieldCheck,
  "circle-check": CircleCheck,
};

export function CertificationBadge({
  cert,
}: {
  cert: (typeof siteConfig.certifications)[number];
}) {
  const t = useTranslations("certifications");
  const Icon = iconMap[cert.icon] ?? BadgeCheck;

  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        <Icon className="size-6" strokeWidth={1.5} aria-hidden />
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-ink">{t(`${cert.id}.title`)}</h3>
        <p className="text-sm leading-relaxed text-muted">{t(`${cert.id}.desc`)}</p>
      </div>
    </div>
  );
}
