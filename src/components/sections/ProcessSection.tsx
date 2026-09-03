import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ProcessStep } from "@/components/ProcessStep";

export async function ProcessSection() {
  const tHome = await getTranslations("home");
  const processSteps = tHome.raw("processSteps") as { title: string; desc: string }[];

  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={tHome("processEyebrow")}
          title={tHome("processTitle")}
          subtitle={tHome("processSubtitle")}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.title} className="flex h-full">
              <ProcessStep index={i + 1} title={step.title} desc={step.desc} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
