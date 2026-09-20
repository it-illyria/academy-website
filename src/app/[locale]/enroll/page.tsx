import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { EnrollPage } from "@/components/pages/enroll-page";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "enroll_page" });
  const title = t("title");
  const description = t("desc");

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/enroll"),
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default function Enroll() {
  return <EnrollPage />;
}
