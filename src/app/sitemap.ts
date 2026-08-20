import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

const baseUrl = `https://${siteConfig.domain}`;

function alternates(path: string) {
  return Object.fromEntries(
    routing.locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/products", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const productPaths = products.map((product) => ({
    path: `/products/${product.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of [...staticPaths, ...productPaths]) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: { languages: alternates(path) },
      });
    }
  }

  return entries;
}
