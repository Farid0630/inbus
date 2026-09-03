import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CertificationBadge } from "@/components/CertificationBadge";
import { siteConfig } from "@/lib/site-config";

export async function CertificationsSection() {
  const tHome = await getTranslations("home");

  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={tHome("certEyebrow")}
          title={tHome("certTitle")}
          subtitle={tHome("certSubtitle")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {siteConfig.certifications.map((cert) => (
            <div key={cert.id} className="flex h-full">
              <CertificationBadge cert={cert} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
