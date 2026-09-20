import { PrivacyPage } from "@/components/pages/privacy-page";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

// Kept in sync with the bilingual `content` object in privacy-page.tsx.
const seoContent = {
  sq: {
    title: "Politika e Privatësisë",
    description:
      "Në Lika Academy, jemi të angazhuar për mbrojtjen e privatësisë suaj. Kjo politikë shpjegon si mbledhim, përdorim dhe mbrojmë të dhënat tuaja personale.",
  },
  en: {
    title: "Privacy Policy",
    description:
      "At Lika Academy, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "sq" ? seoContent.sq : seoContent.en;

  return {
    title: c.title,
    description: c.description,
    alternates: buildAlternates(locale, "/privacy"),
    openGraph: { title: c.title, description: c.description },
    twitter: { title: c.title, description: c.description },
  };
}

export default function Privacy() {
  return <PrivacyPage />;
}
