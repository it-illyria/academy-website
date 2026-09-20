"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Monitor,
  FolderGit2,
  Code2,
  BrainCircuit,
  Cpu,
} from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { HeroParticles } from "@/components/sections/hero-particles";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 -left-20 sm:-left-40 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/8 blur-[150px]" />
      <div className="absolute bottom-20 -right-20 sm:-right-40 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyber/8 blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 pt-20 pb-16 sm:px-6 lg:min-h-[calc(100vh-4rem)] lg:flex-row lg:px-8">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-8 border-primary/30 bg-primary/5 px-4 py-1.5 text-primary backdrop-blur-sm"
            >
              <Sparkles className="mr-2 h-3 w-3" />
              {t("badge")}
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-foreground">{t("title1")}</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-[oklch(0.7_0.15_320)] to-cyber bg-clip-text text-transparent">
                {t("title2")}
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl lg:max-w-lg">
              {t("subtitle")}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/programs">
                <Button size="lg" className="glow text-base px-6">
                  {t("cta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/50 text-base px-6"
                >
                  {t("cta2")}
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-lg">
            {[
              { label: t("stat_programs"), value: t("stat_programs_value"), icon: Code2 },
              { label: t("stat_students"), value: t("stat_students_value"), icon: FolderGit2 },
              { label: t("stat_duration"), value: t("stat_duration_value"), icon: Clock },
              { label: t("stat_rate"), value: t("stat_rate_value"), icon: Monitor },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          </FadeIn>
        </div>

        {/* Visual — logo particle cloud (visible on all breakpoints, smaller on mobile) */}
        <div className="flex flex-1 items-center justify-center" aria-hidden="true">
          <div className="relative h-56 w-56 sm:h-72 sm:w-72 lg:h-96 lg:w-96">
            <HeroParticles />

            {/* Floating elements around the particle mark */}
            <div className="absolute -top-6 -right-8 sm:-top-8 sm:-right-12 animate-float-slow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyber/20 bg-cyber/10 backdrop-blur-sm glow-cyber sm:h-14 sm:w-14">
                <BrainCircuit className="h-5 w-5 text-cyber sm:h-7 sm:w-7" />
              </div>
            </div>

            <div
              className="absolute -bottom-4 -left-6 sm:-bottom-6 sm:-left-10 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm sm:h-12 sm:w-12">
                <Zap className="h-4 w-4 text-primary sm:h-6 sm:w-6" />
              </div>
            </div>

            <div
              className="absolute top-1/2 -right-10 sm:-right-16 animate-float"
              style={{ animationDelay: "4s" }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[oklch(0.7_0.15_320)]/20 bg-[oklch(0.7_0.15_320)]/10 backdrop-blur-sm sm:h-11 sm:w-11">
                <Cpu className="h-4 w-4 text-[oklch(0.7_0.15_320)] sm:h-5 sm:w-5" />
              </div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute -top-4 left-1/2 h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <div className="absolute bottom-1/4 -right-4 h-1.5 w-1.5 rounded-full bg-cyber animate-pulse-glow" style={{ animationDelay: "1s" }} />
            <div className="absolute top-1/3 -left-6 h-1.5 w-1.5 rounded-full bg-primary/60 animate-pulse-glow" style={{ animationDelay: "2s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
