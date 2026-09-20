"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Code2,
  BrainCircuit,
  Clock,
  FolderGit2,
  Laptop,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { categoryColorMap, getCoursesByCategory, type Course } from "@/lib/courses";

export function ProgramsPreview() {
  const t = useTranslations("programs_preview");

  const programs = [
    {
      icon: Code2,
      title: t("webdev"),
      age: "",
      desc: t("webdev_desc"),
      category: "webdev" as Course["category"],
    },
    {
      icon: BrainCircuit,
      title: t("adults"),
      age: t("adults_age"),
      desc: t("adults_desc"),
      category: "adults" as Course["category"],
    },
  ];

  const colorMap: Record<
    string,
    { border: string; icon: string; badge: string; strip: string }
  > = {
    cyan: {
      border: "hover:border-cyber/30 hover:shadow-cyber/5",
      icon: "bg-cyber/10 text-cyber",
      badge: "border-cyber/30 text-cyber bg-cyber/5",
      strip: "bg-cyber",
    },
    purple: {
      border: "hover:border-primary/30 hover:shadow-primary/5",
      icon: "bg-primary/10 text-primary",
      badge: "border-primary/30 text-primary bg-primary/5",
      strip: "bg-primary",
    },
    pink: {
      border: "hover:border-pink/30 hover:shadow-pink/5",
      icon: "bg-pink/10 text-pink",
      badge: "border-pink/30 text-pink bg-pink/5",
      strip: "bg-pink",
    },
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10" />

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

        <StaggerContainer className="mt-16 grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          {programs.map((program) => {
            const colors = colorMap[categoryColorMap[program.category]];
            const sample = getCoursesByCategory(program.category)[0];
            return (
              <StaggerItem key={program.title}>
                <Card
                  className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.border}`}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 ${colors.strip}`}
                  />
                  <CardContent className="p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.icon}`}
                    >
                      <program.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{program.title}</h3>
                    {program.age && (
                      <Badge
                        variant="outline"
                        className={`mt-2 ${colors.badge}`}
                      >
                        {program.age}
                      </Badge>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground">
                      {program.desc}
                    </p>

                    {sample && (
                      <ul className="mt-4 space-y-1.5 border-t border-border/40 pt-4 text-xs text-muted-foreground">
                        <li className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 shrink-0" />
                          {sample.duration}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <FolderGit2 className="h-3 w-3 shrink-0" />
                          {t("projects_count")}
                        </li>
                        <li className="flex items-center gap-1.5">
                          <Laptop className="h-3 w-3 shrink-0" />
                          {t("format_hybrid")}
                        </li>
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="mt-12 text-center">
          <Link href="/programs">
            <Button size="lg" variant="outline" className="border-border/50">
              {t("view_all")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
