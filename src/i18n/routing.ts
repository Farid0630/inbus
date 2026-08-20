import { defineRouting } from "next-intl/routing";

export const locales = ["id", "en", "ar", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  ar: "العربية",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  id: "🇮🇩",
  en: "🇬🇧",
  ar: "🇸🇦",
  zh: "🇨🇳",
};

export const rtlLocales: ReadonlySet<Locale> = new Set(["ar"]);

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
