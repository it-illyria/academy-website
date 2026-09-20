import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { ScrollToTop } from "@/components/scroll-to-top";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import { ServiceWorkerRegister } from "@/components/sw-register";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ogLocale = locale === "en" ? "en_US" : "sq_AL";
  const altLocale = locale === "en" ? "sq_AL" : "en_US";

  return {
    openGraph: {
      locale: ogLocale,
      alternateLocale: altLocale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Lika Academy",
    url: "https://likaacademy.al",
    logo: "https://likaacademy.al/logo-icon-512.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kamëz",
      addressRegion: "Tirana",
      addressCountry: "AL",
    },
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <Chatbot />
      <CookieConsent />
      <Analytics />
      <ServiceWorkerRegister />
    </NextIntlClientProvider>
  );
}
