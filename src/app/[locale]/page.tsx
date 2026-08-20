import { getTranslations, setRequestLocale } from "next-intl/server";
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
        <div className="bg-ember absolute inset-0" />
        <div className="bg-grain absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-br from-forest-dark/95 via-ink/90 to-ink/95" />
        <Container className="relative flex flex-col gap-10 py-20 sm:py-28">
          <div className="flex max-w-3xl flex-col gap-6">
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
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
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
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-forest">
            <div className="bg-ember absolute inset-0" />
            <div className="bg-grain absolute inset-0" />
            <div className="absolute inset-0 bg-linear-to-br from-forest/90 via-forest-dark/85 to-ink/90" />
            <div className="relative flex h-full items-center justify-center">
              <span className="font-display text-7xl font-bold text-cream/10 select-none">
                {siteConfig.brandName}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
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
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="bg-sand py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("productsEyebrow")}
            title={tHome("productsTitle")}
            subtitle={tHome("productsSubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why choose us */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("whyEyebrow")}
            title={tHome("whyTitle")}
            subtitle={tHome("whySubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <FeatureCard
                key={item.title}
                icon={whyIcons[i % whyIcons.length]}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-sand py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("processEyebrow")}
            title={tHome("processTitle")}
            subtitle={tHome("processSubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.title} index={i + 1} title={step.title} desc={step.desc} />
            ))}
          </div>
        </Container>
      </section>

      {/* Certifications */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("certEyebrow")}
            title={tHome("certTitle")}
            subtitle={tHome("certSubtitle")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {siteConfig.certifications.map((cert) => (
              <CertificationBadge key={cert.id} cert={cert} />
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-forest-dark">
        <div className="bg-ember absolute inset-0" />
        <div className="bg-grain absolute inset-0" />
        <div className="absolute inset-0 bg-linear-to-br from-forest/95 via-forest-dark/90 to-ink/95" />
        <Container className="relative flex flex-col items-center gap-6 py-20 text-center sm:py-24">
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
        </Container>
      </section>
    </>
  );
}
