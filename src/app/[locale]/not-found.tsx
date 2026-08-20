import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <span className="font-display text-6xl font-bold text-forest/20">404</span>
      <h1 className="font-display text-2xl font-semibold text-ink">{t("title")}</h1>
      <p className="max-w-md text-muted">{t("desc")}</p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream hover:bg-forest-dark"
      >
        {t("backHome")}
      </Link>
    </Container>
  );
}
