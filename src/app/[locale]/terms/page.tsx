import { TermsPage } from "@/components/pages/terms-page";
import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";

// Kept in sync with the bilingual `content` object in terms-page.tsx.
const seoContent = {
  sq: {
    title: "Kushtet e Shërbimit",
    description:
      "Ju lutemi lexoni me kujdes këto Kushte Shërbimi para se të përdorni faqen e Lika Academy ose të regjistroheni në ndonjërin nga kurset tona.",
  },
  en: {
    title: "Terms of Service",
    description:
      "Please read these Terms of Service carefully before using Lika Academy's website or enrolling in any of our courses.",
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
    alternates: buildAlternates(locale, "/terms"),
    openGraph: { title: c.title, description: c.description },
    twitter: { title: c.title, description: c.description },
  };
}

export default function Terms() {
  return <TermsPage />;
}
