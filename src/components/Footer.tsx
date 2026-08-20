import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, BadgeCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site-config";
import { products } from "@/lib/products";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "./SocialIcons";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products");
  const tCert = useTranslations("certifications");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cream/80">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex size-10 items-center justify-center rounded-full bg-forest-light font-display text-lg font-bold text-cream">
              IB
            </span>
            <span className="font-display text-lg font-semibold text-cream">
              {siteConfig.brandName}
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/60">{t("tagline")}</p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream uppercase">
            {t("navTitle")}
          </h3>
          <Link href="/" className="text-sm text-cream/60 transition-colors hover:text-gold">
            {tNav("home")}
          </Link>
          <Link href="/about" className="text-sm text-cream/60 transition-colors hover:text-gold">
            {tNav("about")}
          </Link>
          <Link
            href="/products"
            className="text-sm text-cream/60 transition-colors hover:text-gold"
          >
            {tNav("products")}
          </Link>
          <Link
            href="/contact"
            className="text-sm text-cream/60 transition-colors hover:text-gold"
          >
            {tNav("contact")}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream uppercase">
            {t("productsTitle")}
          </h3>
          {products.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="text-sm text-cream/60 transition-colors hover:text-gold"
            >
              {tProducts(`items.${product.slug}.name`)}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold tracking-wide text-cream uppercase">
            {t("contactTitle")}
          </h3>
          <a
            href={siteConfig.address.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2.5 text-sm text-cream/60 transition-colors hover:text-gold"
          >
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>
              {siteConfig.address.line1}, {siteConfig.address.city},{" "}
              {siteConfig.address.province}, {siteConfig.address.country}
            </span>
          </a>
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-2.5 text-sm text-cream/60 transition-colors hover:text-gold"
          >
            <Phone className="size-4 shrink-0" aria-hidden />
            {siteConfig.contact.phone}
          </a>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-center gap-2.5 text-sm text-cream/60 transition-colors hover:text-gold"
          >
            <Mail className="size-4 shrink-0" aria-hidden />
            {siteConfig.contact.email}
          </a>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/50">
            © {year} {siteConfig.companyName}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-xs text-cream/50">{t("certifiedTitle")}:</span>
            {siteConfig.certifications.map((cert) => (
              <span
                key={cert.id}
                className="inline-flex items-center gap-1 text-xs text-cream/60"
              >
                <BadgeCheck className="size-3.5 text-gold" aria-hidden />
                {tCert(`${cert.id}.title`)}
              </span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
