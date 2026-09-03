import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutTeaserSection } from "@/components/sections/AboutTeaserSection";
import { ProductsCatalogSection } from "@/components/sections/ProductsCatalogSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutTeaserSection />
      <ProductsCatalogSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <CertificationsSection />
      <CtaSection />
    </>
  );
}
