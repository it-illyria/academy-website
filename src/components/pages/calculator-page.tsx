"use client";

import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Check,
  ArrowRight,
  Sparkles,
  Tag,
  Calculator,
  Scale,
} from "lucide-react";
import { courses } from "@/lib/courses";

const courseNames: Record<string, string> = {
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
};

const categoryBadge: Record<
  string,
  { label: string; className: string }
> = {
  webdev: {
    label: "Web Dev",
    className: "border-cyber/40 text-cyber bg-cyber/10",
  },
  adults: {
    label: "Pro",
    className:
      "border-[oklch(0.7_0.15_320)]/40 text-[oklch(0.7_0.15_320)] bg-[oklch(0.7_0.15_320)]/10",
  },
};

const colorMap = {
  cyan: {
    border: "border-cyber/20",
    selectedBorder: "border-cyber shadow-[0_0_18px_rgba(0,255,200,0.18)]",
    icon: "bg-cyber/10 text-cyber",
    check: "bg-cyber text-background",
  },
  purple: {
    border: "border-primary/20",
    selectedBorder: "border-primary shadow-[0_0_18px_rgba(120,80,255,0.18)]",
    icon: "bg-primary/10 text-primary",
    check: "bg-primary text-primary-foreground",
  },
  pink: {
    border: "border-[oklch(0.7_0.15_320)]/20",
    selectedBorder:
      "border-[oklch(0.7_0.15_320)] shadow-[0_0_18px_rgba(200,80,180,0.18)]",
    icon: "bg-[oklch(0.7_0.15_320)]/10 text-[oklch(0.7_0.15_320)]",
    check: "bg-[oklch(0.7_0.15_320)] text-white",
  },
};

function getDiscount(count: number): number {
  if (count >= 3) return 0.15;
  if (count >= 2) return 0.10;
  return 0;
}

export function CalculatorPage() {
  const t = useTranslations("calculator");
  const CALC_KEY = "lika-calc-selected";
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Restore on mount. sessionStorage is a client-only external system — it
  // can't be read during the lazy useState initializer without causing an
  // SSR/hydration mismatch, so restoring it here (post-mount) is correct.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(CALC_KEY);
      if (saved) {
        const arr = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(arr)) setSelected(new Set(arr));
      }
    } catch {}
  }, []);

  // Save on change
  useEffect(() => {
    try {
      sessionStorage.setItem(CALC_KEY, JSON.stringify([...selected]));
    } catch {}
  }, [selected]);

  const toggleCourse = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  const discountRate = useMemo(() => getDiscount(selected.size), [selected.size]);
  const discountPct = Math.round(discountRate * 100);

  // Progress hint: how many more courses to next tier
  const nextTierInfo = useMemo(() => {
    if (selected.size === 0) return { needed: 2, pct: 10 };
    if (selected.size === 1) return { needed: 1, pct: 10 };
    if (selected.size >= 2 && selected.size < 3) return { needed: 1, pct: 15 };
    return null;
  }, [selected.size]);

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[220px] w-[320px] sm:h-[500px] sm:w-[700px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="absolute top-40 right-0 h-[140px] w-[180px] sm:h-[300px] sm:w-[400px] rounded-full bg-cyber/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary mb-4">
            <Calculator className="h-4 w-4" />
            <span>{t("title")}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Tip banner */}
        <div className="mt-10 mx-auto max-w-3xl rounded-xl border border-cyber/20 bg-cyber/5 px-5 py-3 flex flex-wrap items-center gap-3 text-sm text-cyber">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="font-medium">{t("tip_title")}</span>
          <span className="text-muted-foreground">{t("tip_2")}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{t("tip_3")}</span>
        </div>

        {/* Cross-link: Compare tool */}
        <div className="mt-4 mx-auto max-w-3xl rounded-xl border border-primary/20 bg-primary/5 px-5 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Scale className="h-4 w-4 shrink-0 text-primary" />
            {t("compare_cta")}
          </span>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
          >
            {t("compare_cta_link")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Main layout */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
          {/* Left: course cards */}
          <div>
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("select_courses")}
              {selected.size > 0 && (
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-primary ml-2"
                >
                  {selected.size} {t("selected")}
                </Badge>
              )}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {courses.filter((c) => c.price !== undefined).map((course) => {
                const isSelected = selected.has(course.slug);
                const colors = colorMap[course.color];
                const cat = categoryBadge[course.category];
                const name = courseNames[course.slug] || course.slug;

                return (
                  <button
                    key={course.slug}
                    onClick={() => toggleCourse(course.slug)}
                    className={[
                      "group relative w-full text-left rounded-xl border-2 bg-card/50 backdrop-blur-sm p-5 transition-all duration-200",
                      isSelected
                        ? colors.selectedBorder
                        : `${colors.border} hover:border-opacity-50`,
                    ].join(" ")}
                  >
                    {/* Checkmark overlay */}
                    <div
                      className={[
                        "absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-200",
                        isSelected
                          ? `${colors.check} border-transparent`
                          : "border-border/50 bg-transparent",
                      ].join(" ")}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>

                    {/* Category badge */}
                    <Badge
                      variant="outline"
                      className={`text-xs ${cat.className}`}
                    >
                      {cat.label}
                    </Badge>

                    {/* Course name */}
                    <h3 className="mt-3 pr-8 font-semibold text-sm leading-snug">
                      {name}
                    </h3>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.totalHours}h
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {course.modules.length} modules
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: price summary (sticky) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Card className="overflow-hidden border-border/50 bg-card/70 backdrop-blur-md">
              {/* Gradient header */}
              <CardHeader className="bg-gradient-to-br from-primary/20 via-primary/10 to-cyber/10 border-b border-border/30 pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4 text-primary" />
                  {t("title")}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  {selected.size === 0
                    ? t("no_courses")
                    : `${selected.size} ${t("selected")}`}
                </p>
              </CardHeader>

              <CardContent className="pt-5 pb-5 space-y-5">
                {/* Discount tier badges */}
                <div className="flex flex-col gap-2">
                  <div
                    className={[
                      "flex items-center justify-between rounded-lg px-3 py-2 text-xs border transition-all duration-300",
                      selected.size < 2
                        ? "border-border/30 bg-muted/30 text-muted-foreground"
                        : "border-primary/30 bg-primary/10 text-primary",
                    ].join(" ")}
                  >
                    <span>{t("bundle_2")}</span>
                    {selected.size >= 2 && (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    )}
                  </div>
                  <div
                    className={[
                      "flex items-center justify-between rounded-lg px-3 py-2 text-xs border transition-all duration-300",
                      selected.size < 3
                        ? "border-border/30 bg-muted/30 text-muted-foreground"
                        : "border-cyber/30 bg-cyber/10 text-cyber",
                    ].join(" ")}
                  >
                    <span>{t("bundle_3")}</span>
                    {selected.size >= 3 && (
                      <Check className="h-3.5 w-3.5 text-cyber" />
                    )}
                  </div>
                </div>

                {/* Progress hint */}
                {nextTierInfo && selected.size < 6 && (
                  <p className="text-xs text-muted-foreground text-center bg-muted/30 rounded-lg px-3 py-2">
                    Add {nextTierInfo.needed} more course
                    {nextTierInfo.needed > 1 ? "s" : ""} for{" "}
                    <span className="text-primary font-medium">
                      {nextTierInfo.pct}% off
                    </span>
                  </p>
                )}

                {/* Divider */}
                <div className="border-t border-border/30" />

                {/* Discount summary (no pricing shown — see programs page for current prices) */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {t("discount")}
                    </span>
                    <span
                      className={[
                        "text-3xl font-bold transition-all duration-300",
                        selected.size > 0
                          ? "text-foreground drop-shadow-[0_0_12px_oklch(0.6_0.2_280/0.5)]"
                          : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {discountPct}%
                    </span>
                  </div>
                  {discountRate === 0 && (
                    <p className="mt-1 text-right text-xs text-muted-foreground">
                      {t("no_discount")}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link href="/enroll" className="block">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={selected.size === 0}
                  >
                    {selected.size === 0 ? t("no_courses") : t("enroll_selected")}
                    {selected.size > 0 && (
                      <ArrowRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
