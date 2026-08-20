import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ProductDefinition } from "@/lib/products";

export function ProductCard({ product }: { product: ProductDefinition }) {
  const t = useTranslations("products");
  const Icon = product.icon;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <div className="bg-grain relative flex h-44 items-center justify-center bg-forest-dark">
        <div className="absolute inset-0 bg-linear-to-br from-forest/90 to-ink/90" />
        <Icon className="relative size-16 text-gold-light" strokeWidth={1.25} aria-hidden />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">
            {t(`items.${product.slug}.name`)}
          </h3>
          <p className="text-sm font-medium text-forest">
            {t(`items.${product.slug}.tagline`)}
          </p>
        </div>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {t(`items.${product.slug}.shortDesc`)}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
          {t("viewDetails")}
          <ArrowRight
            className="size-4 transition-transform rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
