import { defineRouting } from "next-intl/routing";

export const locales = ["id"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export const localeNames: Record<Locale, string> = {
  id: "Bahasa Indonesia",
};

export const localeFlags: Record<Locale, string> = {
  id: "🇮🇩",
};

export const rtlLocales: ReadonlySet<Locale> = new Set([]);

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

