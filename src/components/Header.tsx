"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site-config";
import clsx from "clsx";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/products", label: t("products") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b bg-cream/95 sm:bg-cream/90 sm:backdrop-blur transition-shadow duration-300",
        scrolled ? "border-line shadow-sm shadow-ink/5" : "border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo-inbus.png"
            alt={siteConfig.brandName}
            width={114}
            height={100}
            priority
            className="h-10 w-auto"
          />
          <span className="font-display text-lg leading-tight font-semibold text-ink">
            {siteConfig.brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  active ? "text-forest" : "text-ink-soft hover:text-forest",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`mailto:${siteConfig.contact.email}?subject=Tertarik dengan produk ekspor kelapa Anda`}
            className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-forest-dark"
          >
            {t("getQuote")}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {/* Mobile menu — always in DOM, animated via max-height */}
      <div
        className={clsx(
          "overflow-hidden border-t bg-cream transition-all duration-300 ease-in-out lg:hidden",
          open ? "max-h-96 border-line opacity-100" : "max-h-0 border-transparent opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center rounded-xl px-3 py-2.5 text-base font-medium text-ink-soft hover:bg-sand hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-end gap-3 border-t border-line pt-4">
            <a
              href={`mailto:${siteConfig.contact.email}?subject=Tertarik dengan produk ekspor kelapa Anda`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-cream sm:w-auto"
            >
              {t("getQuote")}
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
