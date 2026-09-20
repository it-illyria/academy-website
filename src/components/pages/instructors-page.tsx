"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { instructors } from "@/lib/instructors";
import { Users, Briefcase, ArrowRight } from "lucide-react";

const colorClasses = {
  primary: {
    avatar: "bg-primary/20 text-primary border-primary/30",
    glow: "group-hover:border-primary/40 group-hover:shadow-[0_0_24px_oklch(0.7_0.2_280/0.15)]",
    badge: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary",
  },
  cyber: {
    avatar: "bg-cyber/20 text-cyber border-cyber/30",
    glow: "group-hover:border-cyber/40 group-hover:shadow-[0_0_24px_oklch(0.75_0.18_180/0.15)]",
    badge: "bg-cyber/10 text-cyber border-cyber/20",
    dot: "bg-cyber",
  },
  pink: {
    avatar: "bg-[oklch(0.7_0.15_320)]/20 text-[oklch(0.7_0.15_320)] border-[oklch(0.7_0.15_320)]/30",
    glow: "group-hover:border-[oklch(0.7_0.15_320)]/40 group-hover:shadow-[0_0_24px_oklch(0.7_0.15_320/0.15)]",
    badge: "bg-[oklch(0.7_0.15_320)]/10 text-[oklch(0.7_0.15_320)] border-[oklch(0.7_0.15_320)]/20",
    dot: "bg-[oklch(0.7_0.15_320)]",
  },
};

export function InstructorsPage() {
  const t = useTranslations("instructors");
  const locale = useLocale();

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 -left-20 sm:-left-40 h-[220px] w-[220px] sm:h-[500px] sm:w-[500px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="absolute bottom-1/3 -right-20 sm:-right-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hiring banner */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary">{t("hiring_badge")}</span>
          </div>
        </div>

        {/* Page header */}
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Instructor cards */}
        <div className="mt-16 mx-auto max-w-lg">
          {instructors.map((instructor) => {
            const clr = colorClasses[instructor.color];
            const roleText = locale === "sq" ? instructor.role.sq : instructor.role.en;
            const bioText = locale === "sq" ? instructor.bio.sq : instructor.bio.en;

            return (
              <Card
                key={instructor.id}
                className={`group relative overflow-hidden border border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 ${clr.glow}`}
              >
                {/* Subtle top gradient accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                <CardContent className="p-6">
                  {/* Avatar + name row */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border text-xl font-bold transition-transform duration-300 group-hover:scale-105 ${clr.avatar}`}
                    >
                      {instructor.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold leading-tight">{instructor.name}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-snug">{roleText}</p>
                      {/* Experience */}
                      <div className="mt-2 flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {instructor.experience} {t("experience")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("bio")}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {bioText}
                    </p>
                  </div>

                  {/* Specialties */}
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("specialties")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {instructor.specialties.map((spec) => (
                        <Badge
                          key={spec}
                          variant="outline"
                          className={`text-xs border ${clr.badge}`}
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA — Apply as Instructor */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card/40 p-8 text-center backdrop-blur-sm sm:p-12">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyber/5" />
            <div className="relative">
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                  <Users className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t("apply_instructor")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{t("apply_desc")}</p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_oklch(0.7_0.2_280/0.4)]"
                >
                  {t("join_team")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
