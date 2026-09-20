import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SchedulePage } from "@/components/pages/schedule-page";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schedule" });
  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/schedule"),
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default function Schedule() {
  return <SchedulePage />;
}
