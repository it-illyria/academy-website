"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, BookOpen, Hammer, Briefcase, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { ZanaAvatar } from "@/components/zana-mascot";

export function JourneySection() {
  const t = useTranslations("journey");

  const steps = [
    { icon: ClipboardCheck, title: t("step1_title"), desc: t("step1_desc"), num: "01" },
    { icon: BookOpen, title: t("step2_title"), desc: t("step2_desc"), num: "02" },
    { icon: Hammer, title: t("step3_title"), desc: t("step3_desc"), num: "03" },
    { icon: Briefcase, title: t("step4_title"), desc: t("step4_desc"), num: "04" },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 dot-pattern opacity-[0.08]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>

        {/* Connected path — vertical on mobile, zigzag timeline on desktop */}
        <div className="relative mt-20 lg:mt-28">
          {/* Desktop connecting line */}
          <div className="absolute top-1/2 left-0 right-0 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
          {/* Mobile vertical line */}
          <div className="absolute left-[23px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:hidden" />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, idx) => (
              <FadeIn key={step.num} delay={idx * 0.1 + 0.1}>
                <div
                  className={`group relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center ${
                    idx % 2 === 0 ? "lg:-translate-y-7" : "lg:translate-y-7"
                  }`}
                >
                  {/* Step marker */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-background transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10 lg:mb-6 lg:h-24 lg:w-24">
                    <step.icon className="h-5 w-5 text-primary lg:h-8 lg:w-8" />
                  </div>

                  <div>
                    <div className="text-xs font-mono text-primary/60 mb-1 lg:mb-2">{step.num}</div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground lg:mt-2">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Zana guide note + CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-20 flex flex-col items-center gap-5 rounded-2xl border border-border/40 bg-card/30 p-6 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <ZanaAvatar size={48} className="ring-2 ring-primary/20" />
              <p className="max-w-sm text-sm text-muted-foreground">{t("zana_note")}</p>
            </div>
            <Link href="/enroll" className="shrink-0">
              <Button size="lg" className="glow text-base px-8">
                {t("apply_cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
