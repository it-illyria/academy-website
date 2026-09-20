import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { ProgramsPreview } from "@/components/sections/programs-preview";
import { PlaygroundBanner } from "@/components/sections/playground-banner";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { JourneySection } from "@/components/sections/journey";
import { NewsletterSection } from "@/components/sections/newsletter";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: buildAlternates(locale, ""),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsPreview />
      <PlaygroundBanner />
      <TestimonialsSection />
      <JourneySection />
      <NewsletterSection />
    </>
  );
}
