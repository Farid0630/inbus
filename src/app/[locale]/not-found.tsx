"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Flame } from "lucide-react";
import { Container } from "@/components/Container";
import { EmberParticles } from "@/components/EmberParticles";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="bg-grain relative flex min-h-[80vh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-linear-to-br from-forest-dark/60 via-ink to-ink" />
      <EmberParticles className="pointer-events-none absolute inset-0" density={12} />

      <Container className="relative flex flex-col items-center gap-8 py-24 text-center">
        {/* 404 number */}
        <div className="relative">
          <span
            className="font-display select-none text-[10rem] font-bold leading-none tracking-tighter text-cream/5 sm:text-[14rem]"
            aria-hidden
          >
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl font-bold text-transparent sm:text-7xl"
              style={{
                backgroundImage: "linear-gradient(135deg, #c9974a 0%, #e0b672 50%, #2f7a57 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              404
            </span>
          </span>
        </div>

        {/* Icon */}
        <span className="flex size-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10">
          <Flame className="size-7 text-gold-light" strokeWidth={1.5} aria-hidden />
        </span>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl">{t("title")}</h1>
          <p className="max-w-md text-base leading-relaxed text-cream/60">{t("desc")}</p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-gold/40 hover:text-gold-light"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
          {t("backHome")}
        </Link>
      </Container>
    </div>
  );
}
