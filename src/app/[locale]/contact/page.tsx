import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapPin, Phone, Mail, Clock, Anchor, ArrowUpRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage(props: PageProps<"/[locale]/contact">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("contact");

  const infoItems = [
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: `${siteConfig.address.line1}, ${siteConfig.address.city}, ${siteConfig.address.province} ${siteConfig.address.postalCode}, ${siteConfig.address.country}`,
      href: siteConfig.address.mapsUrl,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: siteConfig.contact.email2,
      href: `mailto:${siteConfig.contact.email2}`,
    },
    {
      icon: Clock,
      label: t("hoursLabel"),
      value: siteConfig.contact.workingHours,
    },
    {
      icon: Anchor,
      label: t("portLabel"),
      value: siteConfig.export.portOfLoading,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink bg-[#1b1611] text-[#fffcf7] py-20 sm:py-28">
        <Image
          src="/images/pabrikBriket.jpg"
          alt="Inbus Factory & Contact"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/90 via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-linear-to-r from-forest-dark/60 via-transparent to-ink/70" />
        <Container className="relative flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-light uppercase">
              {t("eyebrow")}
            </span>
            <h1 className="font-display max-w-2xl text-3xl font-bold text-balance text-cream sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="rounded-3xl border border-line bg-cream p-6 sm:p-8 lg:col-span-3">
            <h2 className="mb-6 font-display text-xl font-semibold text-ink">
              {t("formTitle")}
            </h2>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-3xl border border-line bg-sand p-6 sm:p-8">
              <h2 className="mb-5 font-display text-xl font-semibold text-ink">
                {t("infoTitle")}
              </h2>
              <ul className="flex flex-col gap-5">
                {infoItems.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                        <Icon className="size-4.5" aria-hidden />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-xs font-medium tracking-wide text-muted uppercase">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium text-ink">{item.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-start gap-3.5 transition-opacity hover:opacity-75"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3.5">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>


          </div>
        </Container>
      </section>
    </>
  );
}
