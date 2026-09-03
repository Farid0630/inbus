import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { CornerBrackets } from "@/components/CornerBrackets";
import { siteConfig } from "@/lib/site-config";

export async function AboutTeaserSection() {
  const tHome = await getTranslations("home");

  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-forest">
          <Image
            src="/images/pabrikBriket.jpg"
            alt={siteConfig.brandName}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <CornerBrackets className="inset-4" />
        </div>
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-forest uppercase">
            {tHome("aboutEyebrow")}
          </span>
          <h2 className="font-display text-3xl font-semibold text-balance text-ink sm:text-4xl">
            {tHome("aboutTitle")}
          </h2>
          <p className="leading-relaxed text-muted">{tHome("aboutBody1")}</p>
          <p className="leading-relaxed text-muted">{tHome("aboutBody2")}</p>
          <Link
            href="/about"
            className="inline-flex w-fit items-center gap-2 font-semibold text-forest hover:text-forest-dark"
          >
            {tHome("aboutCta")}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}
