"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Briefcase,
  Award,
  Users,
  BookOpen,
  TrendingUp,
  MapPin,
  Globe,
  ChevronRight,
} from "lucide-react";

interface CareerPath {
  key: string;
  courses: string;
  localSalary: string;
  remoteSalary: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
}

const careerPaths: CareerPath[] = [
  {
    key: "path_frontend",
    courses: "JS / MERN, Future Gen",
    localSalary: "400–900€",
    remoteSalary: "2,000–5,000€",
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "from-primary/20 via-primary/5 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.25_280)/0.15]",
  },
  {
    key: "path_backend",
    courses: "Python, Golang, .NET",
    localSalary: "500–1,200€",
    remoteSalary: "3,000–6,000€",
    icon: <Briefcase className="h-5 w-5" />,
    gradient: "from-cyber/20 via-cyber/5 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.2_180)/0.15]",
  },
  {
    key: "path_fullstack",
    courses: "JS / MERN + Python",
    localSalary: "600–1,500€",
    remoteSalary: "3,000–7,000€",
    icon: <BookOpen className="h-5 w-5" />,
    gradient: "from-primary/15 via-cyber/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.25_280)/0.15]",
  },
  {
    key: "path_data",
    courses: "Python Full-Stack",
    localSalary: "500–1,000€",
    remoteSalary: "2,500–5,000€",
    icon: <TrendingUp className="h-5 w-5" />,
    gradient: "from-[oklch(0.7_0.15_320)]/20 via-[oklch(0.7_0.15_320)]/5 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.15_320)/0.15]",
  },
  {
    key: "path_devops",
    courses: "Golang, Python",
    localSalary: "700–1,500€",
    remoteSalary: "4,000–8,000€",
    icon: <Globe className="h-5 w-5" />,
    gradient: "from-cyber/25 via-primary/5 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.2_180)/0.15]",
  },
  {
    key: "path_mobile",
    courses: "JS / MERN, Future Gen",
    localSalary: "500–1,200€",
    remoteSalary: "3,000–6,000€",
    icon: <Briefcase className="h-5 w-5" />,
    gradient: "from-primary/20 via-[oklch(0.7_0.15_320)]/10 to-transparent",
    glowColor: "group-hover:shadow-[0_0_30px_oklch(0.7_0.25_280)/0.15]",
  },
];

interface OutcomeCard {
  titleKey: string;
  descKey: string;
  icon: React.ReactNode;
  gradient: string;
}

const outcomes: OutcomeCard[] = [
  {
    titleKey: "outcome1_title",
    descKey: "outcome1_desc",
    icon: <BookOpen className="h-6 w-6" />,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    titleKey: "outcome2_title",
    descKey: "outcome2_desc",
    icon: <Award className="h-6 w-6" />,
    gradient: "from-cyber/20 to-cyber/5",
  },
  {
    titleKey: "outcome3_title",
    descKey: "outcome3_desc",
    icon: <Briefcase className="h-6 w-6" />,
    gradient: "from-[oklch(0.7_0.15_320)]/20 to-[oklch(0.7_0.15_320)]/5",
  },
  {
    titleKey: "outcome4_title",
    descKey: "outcome4_desc",
    icon: <Users className="h-6 w-6" />,
    gradient: "from-primary/15 via-cyber/10 to-cyber/5",
  },
];

interface TimelineStep {
  monthKey: string;
  descKey: string;
  number: number;
  color: string;
  borderColor: string;
  bgColor: string;
  glowClass: string;
}

const timelineSteps: TimelineStep[] = [
  {
    monthKey: "month1",
    descKey: "month1_desc",
    number: 1,
    color: "text-primary",
    borderColor: "border-primary/40",
    bgColor: "bg-primary/10",
    glowClass: "shadow-[0_0_20px_oklch(0.7_0.25_280)/0.25]",
  },
  {
    monthKey: "month2",
    descKey: "month2_desc",
    number: 2,
    color: "text-cyber",
    borderColor: "border-cyber/40",
    bgColor: "bg-cyber/10",
    glowClass: "shadow-[0_0_20px_oklch(0.7_0.2_180)/0.25]",
  },
  {
    monthKey: "month3",
    descKey: "month3_desc",
    number: 3,
    color: "text-[oklch(0.7_0.15_320)]",
    borderColor: "border-[oklch(0.7_0.15_320)]/40",
    bgColor: "bg-[oklch(0.7_0.15_320)]/10",
    glowClass: "shadow-[0_0_20px_oklch(0.7_0.15_320)/0.25]",
  },
];

export function StoriesPage() {
  const t = useTranslations("stories");

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 -left-20 sm:-left-40 h-[220px] w-[220px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="absolute bottom-1/3 -right-20 sm:-right-40 h-[220px] w-[220px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyber/5 blur-[200px]" />
      <div className="absolute top-2/3 left-1/3 h-[140px] w-[140px] sm:h-[300px] sm:w-[300px] rounded-full bg-[oklch(0.7_0.15_320)]/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("coming_soon_badge")}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-primary">{t("title").split(" ")[0]}</span>{" "}
            <span className="text-foreground">
              {t("title").split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* ── Section 1: Career Paths ── */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              <span className="text-cyber">{t("paths_title")}</span>
            </h2>
            <p className="text-muted-foreground">{t("paths_subtitle")}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careerPaths.map((path) => (
              <Card
                key={path.key}
                className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 ${path.glowColor}`}
              >
                {/* Card gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-60`}
                />
                {/* Grid pattern inside card */}
                <div className="absolute inset-0 grid-pattern opacity-10" />

                <CardContent className="relative p-6">
                  {/* Icon + Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      {path.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {t(path.key as Parameters<typeof t>[0])}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {path.courses}
                      </p>
                    </div>
                  </div>

                  {/* Salary rows */}
                  <div className="space-y-2 rounded-lg border border-border/40 bg-background/30 p-3">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t("salary_range")}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {t("local")}
                      </span>
                      <span className="text-sm font-semibold text-primary">
                        {path.localSalary}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        {t("remote")}
                      </span>
                      <span className="text-sm font-semibold text-cyber">
                        {path.remoteSalary}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section 2: Expected Outcomes ── */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              <span className="text-primary">{t("outcomes_title")}</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <Card
                key={outcome.titleKey}
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_oklch(0.7_0.25_280)/0.1]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${outcome.gradient} opacity-50`}
                />
                <div className="absolute inset-0 grid-pattern opacity-10" />

                <CardContent className="relative flex gap-5 p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/20">
                      {outcome.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-semibold text-foreground">
                      {t(outcome.titleKey as Parameters<typeof t>[0])}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(outcome.descKey as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Section 3: Timeline ── */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
              <span className="text-foreground">{t("timeline_title")}</span>
            </h2>
          </div>

          {/* Timeline container */}
          <div className="relative mx-auto max-w-4xl">
            {/* Connecting line (desktop) */}
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-primary/40 via-cyber/40 to-[oklch(0.7_0.15_320)]/40 md:block" />

            <div className="flex flex-col gap-10 md:gap-0">
              {timelineSteps.map((step, idx) => (
                <div
                  key={step.monthKey}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-start md:gap-8 ${
                    idx % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content card */}
                  <div className="md:w-[calc(50%-2.5rem)]">
                    <Card
                      className={`relative overflow-hidden border ${step.borderColor} bg-card/50 backdrop-blur-sm transition-all duration-300 hover:${step.glowClass}`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} opacity-30`}
                      />
                      <div className="absolute inset-0 grid-pattern opacity-10" />
                      <CardContent className="relative p-6">
                        <Badge
                          className={`mb-3 border ${step.borderColor} ${step.bgColor} ${step.color} text-xs font-medium`}
                        >
                          {t(step.monthKey as Parameters<typeof t>[0])}
                        </Badge>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t(step.descKey as Parameters<typeof t>[0])}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex md:w-20 md:flex-shrink-0 md:items-start md:justify-center md:pt-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${step.borderColor} ${step.bgColor} ${step.glowClass} ${step.color} font-bold text-sm`}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Empty spacer for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />

                  {/* Arrow for mobile */}
                  {idx < timelineSteps.length - 1 && (
                    <div className="flex justify-center md:hidden">
                      <ChevronRight
                        className={`h-5 w-5 rotate-90 ${step.color} opacity-50`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
