import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { ProductCard } from "@/components/ProductCard";
import { ProductSlider } from "@/components/ProductSlider";
import { products, getProduct } from "@/lib/products";
import { whatsappLink } from "@/lib/site-config";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "products" });
  return {
    title: t(`items.${product.slug}.name`),
    description: t(`items.${product.slug}.shortDesc`),
  };
}

export default async function ProductDetailPage(props: PageProps<"/[locale]/products/[slug]">) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const product = getProduct(slug);
  if (!product) notFound();

  const t = await getTranslations("products");
  const description = t.raw(`items.${product.slug}.description`) as string[];
  const applications = t.raw(`items.${product.slug}.applications`) as string[];
  const otherProducts = products.filter((p) => p.slug !== product.slug);
  const Icon = product.icon;

  return (
    <>
      <section className="relative overflow-hidden bg-ink bg-[#1b1611] text-[#fffcf7] py-16 sm:py-24">
        <Image
          src={product.image}
          alt={t(`items.${product.slug}.name`)}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/90 via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-forest-dark/50 via-transparent to-ink/70" />
        <Container className="relative flex flex-col gap-4">
          <Link
            href="/products"
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cream/70 transition-colors hover:border-gold/30 hover:text-gold-light"
          >
            <ArrowRight className="size-3.5 rotate-180 rtl:rotate-0" aria-hidden />
            {t("backToProducts")}
          </Link>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <span className="flex size-14 items-center justify-center rounded-2xl border border-gold/30 bg-gold/15 text-gold-light shadow-lg shadow-gold/5">
              <Icon className="size-7" strokeWidth={1.5} aria-hidden />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
                {t(`items.${product.slug}.name`)}
              </h1>
              <p className="font-medium text-gold-light sm:text-lg">
                {t(`items.${product.slug}.tagline`)}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          <div className="flex flex-col gap-6 lg:col-span-2">
            {description.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}

            <div className="mt-4 flex flex-col gap-4">
              <h2 className="font-display text-xl font-semibold text-ink">
                {t("applicationsTitle")}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {applications.map((application) => (
                  <li
                    key={application}
                    className="flex items-start gap-2.5 rounded-xl border border-line bg-sand px-4 py-3 text-sm text-ink-soft"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-forest"
                      aria-hidden
                    />
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-cream p-6">
              <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                {t("specsTitle")}
              </h2>
              <dl className="flex flex-col gap-3">
                {product.specs.map((spec) => (
                  <div
                    key={spec.key}
                    className="flex flex-col gap-0.5 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-xs font-medium tracking-wide text-graphite-light uppercase">
                      {t(`specLabels.${spec.key}`)}
                    </dt>
                    <dd className="font-mono text-sm font-medium text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-forest/20 bg-forest/5 p-6">
              <h3 className="font-display font-semibold text-ink">{t("ctaTitle")}</h3>
              <p className="text-sm leading-relaxed text-muted">{t("ctaSubtitle")}</p>
              <Link
                href="/contact"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
              >
                {t("requestQuote")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Link>
              <a
                href={whatsappLink(
                  `Halo, saya tertarik dengan produk ${product.slug.replace(/-/g, " ")}. Mohon kirimkan informasi penawaran dan spesifikasi detail.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/30 px-5 py-3 text-sm font-semibold text-forest transition-colors hover:bg-forest/10"
              >
                WhatsApp
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {otherProducts.length > 0 ? (
        <section className="bg-sand py-16 sm:py-20">
          <Container className="flex flex-col gap-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              {t("otherProducts")}
            </h2>

            {/* Mobile: horizontal snap slider with pop-up effect */}
            <div className="-mx-4 sm:hidden">
              <ProductSlider items={otherProducts} />
            </div>

            {/* Tablet+: normal grid */}
            <div className="hidden grid-cols-2 gap-6 sm:grid lg:grid-cols-3">
              {otherProducts.map((p) => (
                <div key={p.slug} className="flex h-full">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
