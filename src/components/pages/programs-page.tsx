"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  ArrowRight,
  FolderGit2,
  Bell,
  Blocks,
  Rocket,
  BrainCircuit,
  Code2,
  Server,
  Layers,
  Calculator,
  Hourglass,
  Layers3,
} from "lucide-react";
import { courses, categoryColorMap } from "@/lib/courses";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Blocks,
  Rocket,
  BrainCircuit,
  Code2,
  Server,
  Layers,
};

const colorMap = {
  cyan: {
    border: "border-cyber/20 hover:border-cyber/40",
    icon: "bg-cyber/10 text-cyber",
    badge: "border-cyber/30 text-cyber bg-cyber/5",
    glow: "hover:shadow-cyber/10",
    strip: "bg-cyber",
  },
  purple: {
    border: "border-primary/20 hover:border-primary/40",
    icon: "bg-primary/10 text-primary",
    badge: "border-primary/30 text-primary bg-primary/5",
    glow: "hover:shadow-primary/10",
    strip: "bg-primary",
  },
  pink: {
    border: "border-pink/20 hover:border-pink/40",
    icon: "bg-pink/10 text-pink",
    badge: "border-pink/30 text-pink bg-pink/5",
    glow: "hover:shadow-pink/10",
    strip: "bg-pink",
  },
};

const courseNames: Record<string, { sq: string; en: string }> = {
  "web-development": { sq: "Web Development", en: "Web Development" },
  "python-fullstack": { sq: "Python Full-Stack", en: "Python Full-Stack" },
  "javascript-mern": { sq: "JavaScript / MERN", en: "JavaScript / MERN" },
  golang: { sq: "Golang", en: "Golang" },
  "dotnet-csharp": { sq: ".NET / C#", en: ".NET / C#" },
};

export function ProgramsPage() {
  const t = useTranslations("programs_page");

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[180px] w-[280px] sm:h-[400px] sm:w-[600px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-Month Courses */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold">{t("two_month")}</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const colors = colorMap[categoryColorMap[course.category]];
              const Icon = iconMap[course.icon] || Code2;
              const name = courseNames[course.slug]?.en || course.slug;

              return (
                <Link
                  key={course.slug}
                  href={`/programs/${course.slug}`}
                  className="block"
                >
                  <Card
                    className={`group relative h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.glow} ${colors.border}`}
                  >
                    <div
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-1 ${colors.strip}`}
                    />
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors.icon}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        {course.category === "adults" && (
                          <Badge variant="outline" className={colors.badge}>
                            19+
                          </Badge>
                        )}
                      </div>

                      <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors">
                        {name}
                      </h3>

                      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 shrink-0" />
                          {course.duration}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Hourglass className="h-3 w-3 shrink-0" />
                          {course.totalHours} {t("hours")}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <FolderGit2 className="h-3 w-3 shrink-0" />
                          {t("projects")}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Layers3 className="h-3 w-3 shrink-0" />
                          {course.modules.length} {t("modules")}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3 shrink-0" />
                          {t("certificate")}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          {t("hybrid")}
                        </li>
                      </ul>

                      <div className="mt-auto flex items-center justify-end pt-4">
                        <span className="flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                          {t("view_syllabus")}
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Compare Pro Tracks CTA */}
        <div className="mt-12 flex justify-center">
          <Link href="/compare">
            <Button
              variant="outline"
              className="border-primary/40 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/60 gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              {t("compare_cta")}
            </Button>
          </Link>
        </div>

        {/* Pricing Calculator Banner */}
        <div className="mt-8 rounded-2xl border border-cyber/20 bg-gradient-to-r from-cyber/5 via-primary/5 to-cyber/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyber/10 text-cyber">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{t("calculator_title")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("calculator_desc")}
              </p>
            </div>
          </div>
          <Link href="/calculator">
            <Button
              variant="outline"
              size="sm"
              className="border-cyber/40 bg-cyber/5 text-cyber hover:bg-cyber/10 hover:border-cyber/60 shrink-0 gap-1.5"
            >
              <Calculator className="h-3.5 w-3.5" />
              {t("calculator_cta")}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* 6-Month Courses Coming Soon */}
        <div className="mt-20">
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/5 text-primary"
              >
                {t("coming_soon")}
              </Badge>
              <h2 className="mt-4 text-2xl font-bold">{t("six_month")}</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {t("six_month_desc")}
              </p>
              <Button variant="outline" className="mt-6 border-border/50">
                <Bell className="mr-2 h-4 w-4" />
                {t("notify_me")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
