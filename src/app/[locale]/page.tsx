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
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        <Image
          src="/images/charcoal-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="bg-grain absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/45" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/10 to-ink/50" />
        <Container className="relative flex flex-col gap-10 py-20 sm:py-28">
          <MountReveal className="flex max-w-3xl flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {tHero("eyebrow")}
            </span>
            <h1 className="font-display text-4xl leading-tight font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
              {tHero("title")} <span className="text-gold-light">{tHero("highlight")}</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-cream/70">
              {tHero("subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
              >
                {tHero("ctaPrimary")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
              <a
                href={whatsappLink("Hello, I'd like to request a quote.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-white/10"
              >
                {tHero("ctaSecondary")}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </MountReveal>

          <MountReveal
            delay={350}
            className="grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3"
          >
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
          </MountReveal>
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
