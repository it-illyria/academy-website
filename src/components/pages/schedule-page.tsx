"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  cohorts,
  courseLabels,
  courseColors,
  type Cohort,
} from "@/lib/schedule-data";
import { Calendar, Clock, Sun, Users, ArrowRight, Zap } from "lucide-react";

function TimetableGrid({ cohort }: { cohort: Cohort }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[400px] text-sm">
        <thead>
          <tr>
            <th scope="col" className="px-3 py-2.5 text-left text-xs font-medium text-muted-foreground">
              <Clock className="inline h-3 w-3 mr-1" />
              Ora
            </th>
            <th scope="col" className="px-3 py-2.5 text-center text-xs font-semibold text-primary bg-primary/5 rounded-tl-lg">
              <Sun className="inline h-3 w-3 mr-1" />
              E Shtunë
            </th>
            <th scope="col" className="px-3 py-2.5 text-center text-xs font-semibold text-primary bg-primary/5 rounded-tr-lg">
              <Sun className="inline h-3 w-3 mr-1" />
              E Dielë
            </th>
          </tr>
        </thead>
        <tbody>
          {cohort.timetable.map((slot, idx) => (
            <tr key={slot.time} className={idx % 2 === 0 ? "" : "bg-muted/5"}>
              <th scope="row" className="px-3 py-2 text-xs font-mono text-muted-foreground whitespace-nowrap">
                {slot.time}
              </th>
              <td className="px-2 py-1.5 text-center">
                <CourseCell slug={slot.saturday} />
              </td>
              <td className="px-2 py-1.5 text-center">
                <CourseCell slug={slot.sunday} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CourseCell({ slug }: { slug: string }) {
  if (!slug) {
    return <span className="text-xs text-muted-foreground/30">—</span>;
  }
  if (slug === "open") {
    return (
      <div className="rounded-lg border border-primary/20 bg-primary/5 px-2 py-2 text-xs font-medium text-primary">
        ✓
      </div>
    );
  }
  const colors = courseColors[slug] ?? {
    bg: "bg-muted/20",
    text: "text-muted-foreground",
    border: "border-border/30",
  };
  return (
    <div
      className={`rounded-lg border px-2 py-2 text-xs font-medium ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {courseLabels[slug] ?? slug}
    </div>
  );
}

export function SchedulePage() {
  const t = useTranslations("schedule");
  const locale = useLocale();
  const [activeCohort, setActiveCohort] = useState(0);

  const sorted = [...cohorts].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const current = sorted[activeCohort];

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(locale === "sq" ? "sq-AL" : "en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const stats = [
    { label: t("sessions_per_week"), icon: <Zap className="h-4 w-4" /> },
    { label: t("sessions_per_group"), icon: <Users className="h-4 w-4" /> },
    { label: t("hours_per_session"), icon: <Clock className="h-4 w-4" /> },
    { label: t("total_hours_week"), icon: <Sun className="h-4 w-4" /> },
    { label: t("total_weeks"), icon: <Calendar className="h-4 w-4" /> },
  ];

  // Count unique courses in current cohort
  const uniqueCourses = new Set<string>();
  current.timetable.forEach((slot) => {
    if (slot.saturday) uniqueCourses.add(slot.saturday);
    if (slot.sunday) uniqueCourses.add(slot.sunday);
  });

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <section className="relative pt-28 pb-16 text-center">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Calendar className="h-3.5 w-3.5" />
            {t("upcoming")}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-cyber to-primary bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
      </section>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        {/* Stats bar */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground"
            >
              <span className="text-primary">{s.icon}</span>
              {s.label}
            </div>
          ))}
        </div>

        {/* Cohort selector tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {sorted.map((cohort, idx) => (
            <button
              key={cohort.id}
              onClick={() => setActiveCohort(idx)}
              className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${
                idx === activeCohort
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-border/50 bg-card/50 text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cohort.name}
              {cohort.isFirst && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyber text-[9px] font-bold text-white">
                  1
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active cohort card */}
        <Card className="overflow-hidden border border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <CardContent className="p-6 sm:p-8">
            {/* Cohort header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{current.name}</h2>
                  {current.isFirst && (
                    <Badge className="bg-primary text-primary-foreground">
                      {locale === "sq" ? "Kohorti i Parë!" : "First Cohort!"}
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {fmt(current.startDate)} — {fmt(current.endDate)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                8-12 {t("spots")}{" "}
                <span className="text-xs">
                  ({locale === "sq" ? "për klasë" : "per class"})
                </span>
              </div>
            </div>

            {/* Timetable */}
            <TimetableGrid cohort={current} />

            {/* Course legend */}
            {Array.from(uniqueCourses).filter((s) => s !== "open").length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {Array.from(uniqueCourses)
                  .filter((s) => s !== "open")
                  .map((slug) => {
                    const colors = courseColors[slug];
                    return (
                      <Link key={slug} href={`/programs/${slug}`}>
                        <Badge
                          variant="outline"
                          className={`text-xs cursor-pointer hover:opacity-80 ${colors?.bg} ${colors?.text} ${colors?.border}`}
                        >
                          {courseLabels[slug]}
                        </Badge>
                      </Link>
                    );
                  })}
              </div>
            )}

            {/* Info note */}
            <div className="mt-6 rounded-lg border border-border/30 bg-muted/10 p-4 text-xs text-muted-foreground">
              <p>
                {locale === "sq"
                  ? "Çdo sesion zgjat 2 orë. Çdo grup takohet 2x/javë. Çdo kurs ka 12 seanca mësimi gjatë 2 muajve (6 javë mësim + 4 javë projekte). Max 8 seanca/javë në total. Kurset do të shpallen së shpejti!"
                  : "Each session is 2 hours. Each group meets 2x/week. Each course has 12 lesson sessions over 2 months (6 weeks of lessons + 4 weeks of projects). Max 8 sessions/week total. Courses will be announced soon!"}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link href="/enroll">
                <Button className="w-full glow sm:w-auto">
                  {t("apply_cohort")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
