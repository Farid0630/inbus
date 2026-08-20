"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Globe, ChevronDown } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/routing";
import clsx from "clsx";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={clsx(
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
          dark
            ? "border-white/20 text-cream hover:bg-white/10"
            : "border-line text-ink hover:bg-sand",
        )}
      >
        <Globe className="size-4" aria-hidden />
        <span>{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDown
          className={clsx("size-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          role="listbox"
          className="absolute start-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-line bg-cream py-1 shadow-xl lg:start-auto lg:end-0"
        >
          {locales.map((loc) => (
            <Link
              key={loc}
              href={pathname}
              locale={loc}
              onClick={() => setOpen(false)}
              className={clsx(
                "flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-sand",
                loc === locale ? "font-semibold text-forest" : "text-ink",
              )}
            >
              <span className="text-base">{localeFlags[loc]}</span>
              {localeNames[loc]}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
