"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/courses";
import {
  BrainCircuit,
  Code2,
  Server,
  Layers,
  Check,
  ArrowRight,
  Calculator,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit,
  Code2,
  Server,
  Layers,
};

const colorStyles = {
  cyan: {
    gradient: "from-cyber/20 via-cyber/10 to-transparent",
    border: "border-cyber/30",
    iconBg: "bg-cyber/15 text-cyber",
    badge: "border-cyber/40 text-cyber bg-cyber/10",
    headerText: "text-cyber",
    checkColor: "text-cyber",
    glow: "shadow-cyber/10",
    activeBorder: "border-cyber/60",
    buttonClass:
      "bg-cyber/20 text-cyber border border-cyber/40 hover:bg-cyber/30",
  },
  purple: {
    gradient: "from-primary/20 via-primary/10 to-transparent",
    border: "border-primary/30",
    iconBg: "bg-primary/15 text-primary",
    badge: "border-primary/40 text-primary bg-primary/10",
    headerText: "text-primary",
    checkColor: "text-primary",
    glow: "shadow-primary/10",
    activeBorder: "border-primary/60",
    buttonClass:
      "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30",
  },
  pink: {
    gradient:
      "from-[oklch(0.7_0.15_320)]/20 via-[oklch(0.7_0.15_320)]/10 to-transparent",
    border: "border-[oklch(0.7_0.15_320)]/30",
    iconBg: "bg-[oklch(0.7_0.15_320)]/15 text-[oklch(0.7_0.15_320)]",
    badge:
      "border-[oklch(0.7_0.15_320)]/40 text-[oklch(0.7_0.15_320)] bg-[oklch(0.7_0.15_320)]/10",
    headerText: "text-[oklch(0.7_0.15_320)]",
    checkColor: "text-[oklch(0.7_0.15_320)]",
    glow: "shadow-[oklch(0.7_0.15_320)]/10",
    activeBorder: "border-[oklch(0.7_0.15_320)]/60",
    buttonClass:
      "bg-[oklch(0.7_0.15_320)]/20 text-[oklch(0.7_0.15_320)] border border-[oklch(0.7_0.15_320)]/40 hover:bg-[oklch(0.7_0.15_320)]/30",
  },
};

const courseNames: Record<string, string> = {
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
};

const courseExtra: Record<
  string,
  { difficultyKey: string; bestForKey: string; aiModules: number; projects: number }
> = {
  "python-fullstack": {
    difficultyKey: "beginner",
    bestForKey: "python_best",
    aiModules: 1,
    projects: 2,
  },
  "javascript-mern": {
    difficultyKey: "beginner",
    bestForKey: "js_best",
    aiModules: 1,
    projects: 2,
  },
  golang: {
    difficultyKey: "intermediate",
    bestForKey: "go_best",
    aiModules: 1,
    projects: 2,
  },
  "dotnet-csharp": {
    difficultyKey: "intermediate",
    bestForKey: "dotnet_best",
    aiModules: 1,
    projects: 2,
  },
};

const adultCourses = courses.filter((c) => c.category === "adults");

export function ComparePage() {
  const t = useTranslations("compare");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(adultCourses.map((c) => c.slug))
  );

  function toggleCourse(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        if (next.size > 1) next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  const visibleCourses = adultCourses.filter((c) => selected.has(c.slug));

  const featureRows: {
    key: string;
    label: string;
    getValue: (course: (typeof adultCourses)[0]) => string;
  }[] = [
    {
      key: "duration",
      label: t("duration"),
      getValue: (c) => c.duration,
    },
    {
      key: "total_hours",
      label: t("total_hours"),
      getValue: (c) => `${c.totalHours}h`,
    },
    {
      key: "modules",
      label: t("modules"),
      getValue: (c) => `${c.modules.length}`,
    },
    {
      key: "projects",
      label: t("projects"),
      getValue: (c) => `${courseExtra[c.slug]?.projects ?? 2}`,
    },
    {
      key: "format",
      label: t("format"),
      getValue: () => t("hybrid"),
    },
    {
      key: "certificate",
      label: t("certificate"),
      getValue: () => t("yes"),
    },
    {
      key: "ai_modules",
      label: t("ai_modules"),
      getValue: (c) => `${courseExtra[c.slug]?.aiModules ?? 1}`,
    },
    {
      key: "difficulty",
      label: t("difficulty"),
      getValue: (c) => {
        const key = courseExtra[c.slug]?.difficultyKey as "beginner" | "intermediate";
        return t(key);
      },
    },
    {
      key: "best_for",
      label: t("best_for"),
      getValue: (c) => {
        const key = courseExtra[c.slug]?.bestForKey as
          | "python_best"
          | "js_best"
          | "go_best"
          | "dotnet_best";
        return t(key);
      },
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[220px] w-[320px] sm:h-[500px] sm:w-[700px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary/5 text-primary"
          >
            Pro Tracks · 19+
          </Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Cross-link: Calculator tool */}
        <div className="mt-8 mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Calculator className="h-4 w-4 shrink-0 text-primary" />
            {t("calculator_cta")}
          </span>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            {t("calculator_cta_link")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Course selector toggles */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">{t("select_courses")}:</span>
          {adultCourses.map((course) => {
            const colors = colorStyles[course.color];
            const isActive = selected.has(course.slug);
            const Icon = iconMap[course.icon] || Code2;
            return (
              <button
                key={course.slug}
                onClick={() => toggleCourse(course.slug)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 backdrop-blur-sm ${
                  isActive
                    ? `${colors.activeBorder} ${colors.iconBg} shadow-lg ${colors.glow}`
                    : "border-border/40 bg-card/30 text-muted-foreground hover:border-border/70 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {courseNames[course.slug]}
                {isActive && <Check className="h-3 w-3" />}
              </button>
            );
          })}
        </div>

        {/* Comparison table — horizontal scroll on mobile */}
        <p className="mt-10 text-center text-xs font-medium text-muted-foreground sm:hidden">
          {t("swipe_hint")}
        </p>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-xl sm:mt-10">
          <table aria-label="Course feature comparison" className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                {/* Feature label column */}
                <th className="w-36 border-b border-r border-border/30 bg-background/50 p-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t("feature")}
                </th>

                {/* Course columns */}
                {visibleCourses.map((course) => {
                  const colors = colorStyles[course.color];
                  const Icon = iconMap[course.icon] || Code2;
                  return (
                    <th
                      key={course.slug}
                      className={`border-b border-r border-border/30 p-0 last:border-r-0`}
                    >
                      <div
                        className={`relative bg-gradient-to-b ${colors.gradient} p-5 text-center`}
                      >
                        {/* Glow line on top */}
                        <div
                          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${colors.headerText} to-transparent opacity-50`}
                        />

                        <div
                          className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>

                        <div
                          className={`text-base font-bold ${colors.headerText}`}
                        >
                          {courseNames[course.slug]}
                        </div>

                        <div className="mt-1 text-2xl font-extrabold text-foreground">
                          {course.totalHours}h
                        </div>
                        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {t("total_hours")}
                        </p>

                        <Badge
                          variant="outline"
                          className={`mt-2 text-xs ${colors.badge}`}
                        >
                          {course.duration}
                        </Badge>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {featureRows.map((row, rowIdx) => (
                <tr
                  key={row.key}
                  className={
                    rowIdx % 2 === 0
                      ? "bg-background/20"
                      : "bg-background/5"
                  }
                >
                  {/* Feature label */}
                  <td className="border-b border-r border-border/20 px-4 py-3.5 text-xs font-medium text-muted-foreground last:border-b-0">
                    {row.label}
                  </td>

                  {/* Values */}
                  {visibleCourses.map((course) => {
                    const colors = colorStyles[course.color];
                    const value = row.getValue(course);
                    const isHighlight = row.key === "total_hours";

                    return (
                      <td
                        key={course.slug}
                        className="border-b border-r border-border/20 px-4 py-3.5 text-center last:border-r-0"
                      >
                        {row.key === "certificate" || row.key === "format" ? (
                          <span
                            className={`inline-flex items-center justify-center gap-1 text-sm font-medium ${colors.checkColor}`}
                          >
                            <Check className="h-4 w-4" />
                            {value}
                          </span>
                        ) : row.key === "best_for" ? (
                          <span className="block text-xs leading-relaxed text-muted-foreground">
                            {value}
                          </span>
                        ) : row.key === "difficulty" ? (
                          <Badge
                            variant="outline"
                            className={`text-xs ${colors.badge}`}
                          >
                            {value}
                          </Badge>
                        ) : (
                          <span
                            className={`text-sm font-semibold ${isHighlight ? colors.headerText : "text-foreground"}`}
                          >
                            {value}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Enroll row */}
              <tr className="bg-background/30">
                <td className="border-r border-border/20 px-4 py-4" />
                {visibleCourses.map((course) => {
                  const colors = colorStyles[course.color];
                  return (
                    <td
                      key={course.slug}
                      className="border-r border-border/20 px-4 py-4 text-center last:border-r-0"
                    >
                      <Link href={`/enroll?course=${course.slug}`}>
                        <button
                          className={`inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${colors.buttonClass}`}
                        >
                          {t("enroll")}
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
