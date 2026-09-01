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
import { CornerBrackets } from "@/components/CornerBrackets";
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
      {/* 1. Hero Section */}
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

      {/* 2. About Teaser Section */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-forest">
            <Image
              src="/images/pabrikBriket.jpg"
              alt={siteConfig.brandName}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <CornerBrackets className="inset-4" />
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

      {/* 3. Products Catalog Section */}
      <section className="bg-sand py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("productsEyebrow")}
            title={tHome("productsTitle")}
            subtitle={tHome("productsSubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.slug} className="flex h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("whyEyebrow")}
            title={tHome("whyTitle")}
            subtitle={tHome("whySubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItems.map((item, i) => (
              <div key={item.title} className="flex h-full">
                <FeatureCard icon={whyIcons[i % whyIcons.length]} title={item.title} desc={item.desc} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Production & Export Process */}
      <section className="bg-sand py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("processEyebrow")}
            title={tHome("processTitle")}
            subtitle={tHome("processSubtitle")}
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="flex h-full">
                <ProcessStep index={i + 1} title={step.title} desc={step.desc} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Certifications */}
      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow={tHome("certEyebrow")}
            title={tHome("certTitle")}
            subtitle={tHome("certSubtitle")}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {siteConfig.certifications.map((cert) => (
              <div key={cert.id} className="flex h-full">
                <CertificationBadge cert={cert} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Final Call-to-Action */}
      <section className="relative overflow-hidden bg-forest-dark py-20 sm:py-24 text-center">
        <div className="absolute inset-0 bg-linear-to-br from-forest/90 via-forest-dark/95 to-ink" />
        <Container className="relative flex flex-col items-center gap-6">
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
              href={whatsappLink("Halo, saya ingin meminta penawaran produk ekspor kelapa.")}
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
