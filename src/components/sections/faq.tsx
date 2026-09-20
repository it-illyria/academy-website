"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQ_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export function FaqSection() {
  const t = useTranslations("faq");

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[320px] sm:h-[500px] sm:w-[700px] rounded-full bg-primary/5 blur-[180px]" />
      <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-cyber/5 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <Accordion className="gap-3 flex flex-col">
          {FAQ_KEYS.map((key) => (
            <AccordionItem
              key={key}
              value={key}
              className="rounded-xl border border-border/50 bg-card/30 px-5 backdrop-blur-sm"
            >
              <AccordionTrigger className="py-4 text-base font-medium hover:no-underline hover:text-primary transition-colors">
                {t(`q${key}`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {t(`a${key}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
