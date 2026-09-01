import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { EmberParticles } from "@/components/EmberParticles";
import { products } from "@/lib/products";
import { whatsappLink } from "@/lib/site-config";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ProductsPage(props: PageProps<"/[locale]/products">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("products");
  const tHome = await getTranslations("home");

  return (
    <>
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <Image
          src="/images/charcoal-hero.jpg"
          alt="Inbus Products Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/85 via-ink/75 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-rust/20 via-transparent to-forest-dark/30" />
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-20" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={15} />
        <Container className="relative flex flex-col items-center gap-5 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-2xl text-3xl font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("subtitle")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              subtitle={t("subtitle")}
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

      <section className="bg-forest-dark bg-grain relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-forest via-forest-dark to-ink" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={12} />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <h2 className="font-display max-w-xl text-2xl font-semibold text-balance text-cream sm:text-3xl">
              {tHome("ctaTitle")}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
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
