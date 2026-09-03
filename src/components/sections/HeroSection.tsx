import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { StatItem } from "@/components/StatItem";
import { siteConfig } from "@/lib/site-config";

export async function HeroSection() {
  const tHero = await getTranslations("hero");

  return (
    <section className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden bg-ink bg-[#1b1611] text-[#fffcf7] pt-8 pb-12 sm:min-h-[82vh] sm:py-20 lg:min-h-[88vh] lg:py-24">
      {/* High-Resolution Charcoal Background */}
      <Image
        src="/images/charcoal-hero.jpg"
        alt={siteConfig.brandName}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] opacity-45"
      />

      {/* Multi-Layered Atmospheric Lighting Overlays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/95 via-ink/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-linear-to-t from-ink via-ink/85 via-45% to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-linear-to-r from-ink/90 via-ink/50 to-transparent sm:block" />

      {/* Top Spacer */}
      <div className="h-6 sm:h-0" aria-hidden />

      {/* Main Content & Stats */}
      <Container className="relative z-10 flex flex-col gap-8 sm:gap-10">
        <div className="flex max-w-3xl flex-col gap-4 sm:gap-6">
          <h1 className="font-display text-3xl leading-[1.12] font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
            {tHero("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light">
              {tHero("highlight")}
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-cream/80 sm:text-lg">
            {tHero("subtitle")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-gold/15 transition-all hover:bg-gold-light hover:shadow-gold/25 active:scale-[0.98] sm:w-auto"
            >
              {tHero("ctaPrimary")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>

          </div>
        </div>

        {/* 3-Column Stats Bar */}
        <div className="grid grid-cols-3 gap-3 border-t border-white/15 pt-6 sm:gap-6 sm:pt-8">
          <StatItem
            value={`${siteConfig.export.monthlyCapacityTons}+`}
            label={tHero("statCapacityLabel")}
          />
          <StatItem
            value={`${siteConfig.export.countriesServed}+`}
            label={tHero("statCountriesLabel")}
          />
          <StatItem
            value={`${new Date().getFullYear() - siteConfig.foundedYear}+`}
            label={tHero("statExperienceLabel")}
          />
        </div>
      </Container>
    </section>
  );
}
