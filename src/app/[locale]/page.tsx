import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import {
  ShieldCheck,
  Factory,
  Ship,
  Tag,
  MessageCircle,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { ProcessStep } from "@/components/ProcessStep";
import { StatItem } from "@/components/StatItem";
import { CertificationBadge } from "@/components/CertificationBadge";
import { Reveal } from "@/components/Reveal";
import { MountReveal } from "@/components/MountReveal";
import { CornerBrackets } from "@/components/CornerBrackets";
import { EmberParticles } from "@/components/EmberParticles";
import { TiltCard } from "@/components/TiltCard";
import { products } from "@/lib/products";
import { siteConfig, whatsappLink } from "@/lib/site-config";

const whyIcons = [ShieldCheck, Factory, Ship, Tag, MessageCircle];

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const tHero = await getTranslations("hero");
  const tHome = await getTranslations("home");

  const whyItems = tHome.raw("whyItems") as { title: string; desc: string }[];
  const processSteps = tHome.raw("processSteps") as { title: string; desc: string }[];

  return (
    <>
      {/* Hero — Immersive Cinema Canvas Concept */}
      <section className="relative flex min-h-[92dvh] flex-col justify-between overflow-hidden bg-ink pt-6 pb-12 sm:min-h-[85vh] sm:py-20 lg:min-h-[92vh] lg:py-24">
        {/* Continuous Cinematic Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/charcoal-hero.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        >
          <source src="/images/vidio-hero.mp4" type="video/mp4" />
        </video>

        {/* Multi-Layered Atmospheric Lighting Overlays */}
        {/* Top Vignette (for header/badge clarity) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink/90 via-ink/40 to-transparent" />
        {/* Bottom Cinematic Gradient (anchors the text and stats into dark theme) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] bg-linear-to-t from-ink via-ink/85 via-45% to-transparent" />
        {/* Desktop Left Reading Vignette */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] bg-linear-to-r from-ink/90 via-ink/50 to-transparent sm:block" />
        {/* Subtle Grain & Ambient Embers */}
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={14} />

        {/* Top Live Badge */}
        <Container className="relative z-10">
          <div className="flex items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/80 px-3.5 py-1.5 text-[11px] font-semibold tracking-wider text-gold-light uppercase shadow-lg shadow-black/30">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              {tHero("eyebrow")}
            </span>
          </div>
        </Container>

        {/* Main Content & Bottom Stats Hub */}
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
              <a
                href={whatsappLink("Halo, saya tertarik dengan produk ekspor kelapa Inbus Solusi Bisnis.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:border-gold/40 hover:bg-white/10 active:scale-[0.98] sm:w-auto"
              >
                {tHero("ctaSecondary")}
                <ArrowUpRight className="size-4 text-gold-light" aria-hidden />
              </a>
            </div>
          </div>

          {/* 3-Column Glassmorphism Stats Bar */}
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

      {/* About teaser */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="relative aspect-4/3 overflow-hidden rounded-3xl bg-forest">
            <Image
              src="/images/pabrikBriket.jpg"
              alt={siteConfig.brandName}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <CornerBrackets className="inset-4" />
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-forest uppercase">
              {tHome("aboutEyebrow")}
            </span>
            <h2 className="font-display text-3xl font-semibold text-balance text-ink sm:text-4xl">
              {tHome("aboutTitle")}
            </h2>
            <p className="leading-relaxed text-muted">{tHome("aboutBody1")}</p>
            <p className="leading-relaxed text-muted">{tHome("aboutBody2")}</p>
            <Link
              href="/about"
              className="inline-flex w-fit items-center gap-2 font-semibold text-forest hover:text-forest-dark"
            >
              {tHome("aboutCta")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-sand bg-blueprint py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={tHome("productsEyebrow")}
              title={tHome("productsTitle")}
              subtitle={tHome("productsSubtitle")}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 100} className="flex h-full">
                <TiltCard className="flex h-full">
                  <ProductCard product={product} />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={tHome("whyEyebrow")}
              title={tHome("whyTitle")}
              subtitle={tHome("whySubtitle")}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 100} className="flex h-full">
                <FeatureCard icon={whyIcons[i % whyIcons.length]} title={item.title} desc={item.desc} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-sand bg-blueprint py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={tHome("processEyebrow")}
              title={tHome("processTitle")}
              subtitle={tHome("processSubtitle")}
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) * 100} className="flex h-full">
                <ProcessStep index={i + 1} title={step.title} desc={step.desc} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={tHome("certEyebrow")}
              title={tHome("certTitle")}
              subtitle={tHome("certSubtitle")}
            />
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {siteConfig.certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={(i % 2) * 100} className="flex h-full">
                <CertificationBadge cert={cert} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-forest-dark">
        <div className="bg-ember absolute inset-0" />
        <div className="bg-grain absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-br from-forest/95 via-forest-dark/90 to-ink/95" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={25} />
        <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-24">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="font-display max-w-2xl text-3xl font-semibold text-balance text-cream sm:text-4xl">
              {tHome("ctaTitle")}
            </h2>
            <p className="max-w-xl text-cream/70">{tHome("ctaSubtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
              >
                {tHome("ctaButtonPrimary")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
              <a
                href={whatsappLink("Hello, I'd like to request a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
              >
                {tHome("ctaButtonSecondary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
