import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck, Leaf, Eye, Handshake, Target, Compass } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { StatItem } from "@/components/StatItem";
import { Reveal } from "@/components/Reveal";
import { EmberParticles } from "@/components/EmberParticles";
import { siteConfig } from "@/lib/site-config";

const valueIcons = [ShieldCheck, Leaf, Eye, Handshake];

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage(props: PageProps<"/[locale]/about">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("about");
  const tHero = await getTranslations("hero");
  const values = t.raw("values") as { title: string; desc: string }[];

  return (
    <>
      <section className="bg-grain relative overflow-hidden bg-ink py-20 sm:py-28">
        <div className="absolute inset-0 bg-linear-to-br from-forest-dark via-ink to-ink" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={35} />
        <Container className="relative flex flex-col items-center gap-5 text-center">
          <Reveal className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-3xl text-4xl font-bold text-balance text-cream sm:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-cream/70">{t("intro")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-semibold text-ink">{t("storyTitle")}</h2>
            <p className="leading-relaxed text-muted">{t("storyBody1")}</p>
            <p className="leading-relaxed text-muted">{t("storyBody2")}</p>
          </Reveal>
          <Reveal delay={150} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-line bg-sand p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-forest/10 text-forest">
                <Target className="size-5" aria-hidden />
              </span>
              <h3 className="font-display font-semibold text-ink">{t("missionTitle")}</h3>
              <p className="text-sm leading-relaxed text-muted">{t("missionBody")}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-line bg-sand p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-forest/10 text-forest">
                <Compass className="size-5" aria-hidden />
              </span>
              <h3 className="font-display font-semibold text-ink">{t("visionTitle")}</h3>
              <p className="text-sm leading-relaxed text-muted">{t("visionBody")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand bg-blueprint py-20 sm:py-24">
        <Container className="flex flex-col gap-12">
          <Reveal>
            <SectionHeading title={t("valuesTitle")} subtitle={t("valuesSubtitle")} />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={(i % 4) * 100} className="flex h-full">
                <FeatureCard
                  icon={valueIcons[i % valueIcons.length]}
                  title={value.title}
                  desc={value.desc}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-grain relative overflow-hidden bg-forest-dark py-16">
        <div className="absolute inset-0 bg-linear-to-br from-forest via-forest-dark to-ink" />
        <EmberParticles className="pointer-events-none absolute inset-0" density={20} />
        <Container className="relative flex flex-col gap-10">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-semibold text-cream">
              {t("statsTitle")}
            </h2>
          </Reveal>
          <Reveal delay={150} className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <StatItem
              value={`${siteConfig.export.monthlyCapacityTons}+`}
              label={tHero("statCapacityLabel")}
            />
            <StatItem
              value={`${siteConfig.export.countriesServed}+`}
              label={tHero("statCountriesLabel")}
            />
            <StatItem
              value={`${new Date().getFullYear() - siteConfig.foundedYear}+`}
              label={tHero("statExperienceLabel")}
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
