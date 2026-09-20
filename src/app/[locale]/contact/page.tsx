import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPage } from "@/components/pages/contact-page";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact_page" });
  const navT = await getTranslations({ locale, namespace: "nav" });
  const title = navT("contact");
  const description = `${t("touch_desc")} ${t("address")}`;

  return {
    title,
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: { title, description },
    twitter: { title, description },
  };
}

export default function Contact() {
  return <ContactPage />;
}
