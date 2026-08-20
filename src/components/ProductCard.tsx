import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CornerBrackets } from "./CornerBrackets";
import type { ProductDefinition } from "@/lib/products";

export function ProductCard({ product }: { product: ProductDefinition }) {
  const t = useTranslations("products");
  const Icon = product.icon;
  const name = t(`items.${product.slug}.name`);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-cream transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
    >
      <div className="relative h-44 overflow-hidden bg-forest-dark">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-ink/0 to-ink/0" />
        <CornerBrackets />
        <span className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-full bg-ink/50 text-gold-light backdrop-blur-sm">
          <Icon className="size-4.5" strokeWidth={1.75} aria-hidden />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-ink">{name}</h3>
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
