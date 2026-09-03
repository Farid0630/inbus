import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { ProductSlider } from "@/components/ProductSlider";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-ink bg-[#1b1611] text-[#fffcf7] py-20 sm:py-28">
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
        <Container className="relative flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-2xl text-3xl font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
          />

          {/* Mobile: horizontal snap slider with pop-up effect */}
          <div className="-mx-4 sm:hidden">
            <ProductSlider />
          </div>

          {/* Tablet+: normal 2-3 column grid */}
          <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.slug} className="flex h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-forest-dark relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-linear-to-br from-forest via-forest-dark to-ink" />
        <Container className="relative flex flex-col items-center gap-6 py-16 text-center">
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

          </div>
        </Container>
      </section>
    </>
  );
}
