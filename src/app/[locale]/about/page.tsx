import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AboutPage } from "@/components/pages/about-page";
import { FaqSection } from "@/components/sections/faq";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about_page" });
  const title = t("title");
  const description = `${t("subtitle")}. ${t("mission_desc")}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/about"),
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default function About() {
  return (
    <>
      <AboutPage />
      <FaqSection />
    </>
  );
}
