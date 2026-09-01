import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ShieldCheck,
  Leaf,
  Eye,
  Handshake,
  Target,
  Compass,
  CheckCircle2,
  MapPin,
  Sparkles,
  Factory,
  Ship,
  Award,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { CertificationBadge } from "@/components/CertificationBadge";
import { StatItem } from "@/components/StatItem";
import { Reveal } from "@/components/Reveal";
import { MountReveal } from "@/components/MountReveal";
import { EmberParticles } from "@/components/EmberParticles";
import { CornerBrackets } from "@/components/CornerBrackets";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const valueIcons = [ShieldCheck, Leaf, Eye, Handshake];

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tHero = await getTranslations("hero");
  const values = t.raw("values") as { title: string; desc: string }[];
  const facilityPoints = t.raw("facilityPoints") as string[];

  const highlights = [
    { icon: MapPin, text: "Makassar, Sulawesi Selatan" },
    { icon: Factory, text: "Kapasitas 500+ Ton/Bulan" },
    { icon: Ship, text: "Pelabuhan Soekarno-Hatta" },
    { icon: Award, text: "Standar Ekspor SUCOFINDO / ISO" },
  ];

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <Image
          src="/images/about-sourcing.jpg"
          alt="Inbus Sourcing & Plantation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/90 via-ink/75 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-forest-dark/70 via-transparent to-ink/70" />
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={14} />
        <Container className="relative flex flex-col items-center gap-6 text-center">
          <MountReveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              <Sparkles className="size-3.5" aria-hidden />
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-3xl text-3xl font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("intro")}
            </p>

            {/* Quick highlight badges */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <span
                    key={h.text}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-cream/80 backdrop-blur-xs"
                  >
                    <Icon className="size-3.5 text-gold-light" aria-hidden />
                    {h.text}
                  </span>
                );
              })}
            </div>
          </MountReveal>
        </Container>
      </section>

      {/* 2. Story & Sourcing Section with Image */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-wider text-forest uppercase">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
                {t("storyTitle")}
              </h2>
            </div>
            <p className="leading-relaxed text-muted sm:text-base">{t("storyBody1")}</p>
            <p className="leading-relaxed text-muted sm:text-base">{t("storyBody2")}</p>

            {/* Quote callout */}
            <div className="rounded-2xl border-s-4 border-forest bg-sand p-4 sm:p-5">
              <p className="text-sm font-medium leading-relaxed text-ink-soft italic">
                &ldquo;Kami memadukan kekayaan alam kelapa Sulawesi dengan standar industri modern
                untuk menghadirkan komoditas ekspor bernilai tinggi ke seluruh dunia.&rdquo;
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-line bg-sand shadow-xl shadow-ink/5">
              <Image
                src="/images/about-sourcing.jpg"
                alt="Perkebunan dan Panen Kelapa Sulawesi Selatan"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <CornerBrackets className="inset-4" />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-ink/75 p-3.5 backdrop-blur-md">
                <p className="text-xs font-semibold text-gold-light uppercase tracking-wider">
                  Sentra Kelapa Sulawesi Selatan
                </p>
                <p className="text-xs text-cream/80">
                  Kemitraan langsung dengan petani lokal untuk jaminan bahan baku berkualitas
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 3. Mission & Vision */}
      <section className="bg-sand bg-blueprint py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal className="text-center">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title="Visi & Misi Perusahaan"
              subtitle="Fondasi komitmen kami dalam membangun bisnis ekspor yang berkelanjutan dan terpercaya."
            />
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal className="flex h-full flex-col justify-between rounded-3xl border border-forest/20 bg-cream p-7 shadow-lg shadow-forest/5 sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                    <Target className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {t("missionTitle")}
                  </h3>
                </div>
                <p className="leading-relaxed text-muted">{t("missionBody")}</p>
              </div>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-forest shrink-0" />
                  <span>Kualitas ekspor konsisten tanpa kompromi</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-forest shrink-0" />
                  <span>Peningkatan kesejahteraan petani lokal</span>
                </li>
              </ul>
            </Reveal>

            <Reveal
              delay={150}
              className="flex h-full flex-col justify-between rounded-3xl border border-gold/30 bg-cream p-7 shadow-lg shadow-gold/5 sm:p-8"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                    <Compass className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    {t("visionTitle")}
                  </h3>
                </div>
                <p className="leading-relaxed text-muted">{t("visionBody")}</p>
              </div>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold shrink-0" />
                  <span>Eksportir terpercaya Indonesia Timur</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold shrink-0" />
                  <span>Jaringan distribusi global yang berkelanjutan</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. Production Facility & Quality Control */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="order-2 relative lg:order-1">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-line bg-sand shadow-xl shadow-ink/5">
              <Image
                src="/images/about-quality.jpg"
                alt="Laboratorium dan Pengujian Mutu Produk Ekspor"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <CornerBrackets className="inset-4" />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/20 bg-ink/75 p-3.5 backdrop-blur-md">
                <p className="text-xs font-semibold text-gold-light uppercase tracking-wider">
                  Quality Assurance Lab
                </p>
                <p className="text-xs text-cream/80">
                  Uji laboratorium presisi untuk kadar abu, kalori, dan ketahanan bakar
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="order-1 flex flex-col gap-6 lg:order-2">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-wider text-forest uppercase">
                {t("facilityEyebrow")}
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl lg:text-4xl">
                {t("facilityTitle")}
              </h2>
            </div>
            <p className="leading-relaxed text-muted sm:text-base">{t("facilityBody1")}</p>
            <p className="leading-relaxed text-muted sm:text-base">{t("facilityBody2")}</p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {facilityPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 rounded-xl border border-line bg-sand p-3.5 text-xs font-medium text-ink-soft sm:text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* 5. Core Values */}
      <section className="bg-sand bg-blueprint py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading title={t("valuesTitle")} subtitle={t("valuesSubtitle")} />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 4) * 100} className="flex h-full">
                <FeatureCard
                  icon={valueIcons[i % valueIcons.length]}
                  title={value.title}
                  desc={value.desc}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Certifications */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={t("certSectionEyebrow")}
              title={t("certSectionTitle")}
              subtitle={t("certSectionSubtitle")}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 4) * 100} className="flex h-full">
                <CertificationBadge cert={cert} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Stats in Numbers */}
      <section className="bg-grain relative overflow-hidden bg-forest-dark py-16 sm:py-20">
        <div className="absolute inset-0 bg-linear-to-br from-forest via-forest-dark to-ink" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={12} />
        <Container className="relative flex flex-col gap-10">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-semibold text-cream sm:text-3xl">
              {t("statsTitle")}
            </h2>
          </Reveal>
          <Reveal delay={150} className="grid grid-cols-3 gap-4 sm:gap-8">
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
          </Reveal>
        </Container>
      </section>

      {/* 8. Call to Action */}
      <section className="bg-sand py-20 sm:py-24">
        <Container>
          <Reveal className="bg-grain relative overflow-hidden rounded-3xl bg-ink p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 bg-linear-to-br from-forest-dark/80 via-ink to-ink" />
            <EmberParticles className="pointer-events-none absolute inset-0" density={10} />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
                {t("eyebrow")}
              </span>
              <h2 className="font-display text-3xl font-bold text-balance text-cream sm:text-4xl">
                {t("ctaTitle")}
              </h2>
              <p className="text-base leading-relaxed text-cream/70">{t("ctaSubtitle")}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light sm:w-auto"
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Link>
                <a
                  href={whatsappLink(
                    "Hello, I would like to learn more about your company and discuss a potential export partnership.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/10 sm:w-auto"
                >
                  {t("ctaSecondary")}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

