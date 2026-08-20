import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
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
      <section className="bg-grain relative overflow-hidden bg-ink py-20 sm:py-24">
        <div className="absolute inset-0 bg-linear-to-br from-forest-dark via-ink to-ink" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={35} />
        <Container className="relative flex flex-col items-center gap-5 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-2xl text-4xl font-bold text-balance text-cream sm:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-cream/70">{t("subtitle")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
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
        <EmberParticles className="pointer-events-none absolute inset-0" density={25} />
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
