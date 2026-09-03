import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export async function CtaSection() {
  const tHome = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-forest-dark py-20 sm:py-24 text-center">
      <div className="absolute inset-0 bg-linear-to-br from-forest/90 via-forest-dark/95 to-ink" />
      <Container className="relative flex flex-col items-center gap-6">
        <h2 className="font-display max-w-2xl text-3xl font-semibold text-balance text-cream sm:text-4xl">
          {tHome("ctaTitle")}
        </h2>
        <p className="max-w-xl text-cream/70">{tHome("ctaSubtitle")}</p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            {tHome("ctaButtonPrimary")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>

        </div>
      </Container>
    </section>
  );
}
