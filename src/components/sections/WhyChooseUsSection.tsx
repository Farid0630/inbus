import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureCard } from "@/components/FeatureCard";
import { ShieldCheck, Factory, Ship, Tag, MessageCircle } from "lucide-react";

const whyIcons = [ShieldCheck, Factory, Ship, Tag, MessageCircle];

export async function WhyChooseUsSection() {
  const tHome = await getTranslations("home");
  const whyItems = tHome.raw("whyItems") as { title: string; desc: string }[];

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={tHome("whyEyebrow")}
          title={tHome("whyTitle")}
          subtitle={tHome("whySubtitle")}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyItems.map((item, i) => (
            <div key={item.title} className="flex h-full">
              <FeatureCard icon={whyIcons[i % whyIcons.length]} title={item.title} desc={item.desc} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
