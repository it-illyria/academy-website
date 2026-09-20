"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Monitor,
  FolderGit2,
  Award,
  Sparkles,
  BrainCircuit,
  Code2,
  Server,
  Layers,
  Blocks,
  Rocket,
} from "lucide-react";
import type { Course } from "@/lib/courses";
import { SyllabusTracker } from "@/components/syllabus-tracker";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Blocks,
  Rocket,
  BrainCircuit,
  Code2,
  Server,
  Layers,
};

const courseNames: Record<string, string> = {
  "web-development": "Web Development",
  "python-fullstack": "Python Full-Stack",
  "javascript-mern": "JavaScript / MERN",
  golang: "Golang",
  "dotnet-csharp": ".NET / C#",
};

const courseDescs: Record<string, string> = {
  "web-development":
    "Master both frontend and backend development with HTML, CSS, JavaScript, React, Node.js and MongoDB. Build complete web applications.",
  "python-fullstack":
    "Build powerful web applications with Python and Django. Includes AI integration and cloud deployment.",
  "javascript-mern":
    "Become a full-stack JavaScript developer with the MERN stack. React, Node.js, Express and MongoDB.",
  golang:
    "Learn Go — the language of cloud infrastructure. Concurrency, APIs, Docker and microservices.",
  "dotnet-csharp":
    "Master enterprise development with C# and ASP.NET Core. Entity Framework, Azure and modern patterns.",
};

const colorMap = {
  cyan: { accent: "text-cyber", bg: "bg-cyber/10", border: "border-cyber/20" },
  purple: { accent: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  pink: {
    accent: "text-[oklch(0.7_0.15_320)]",
    bg: "bg-[oklch(0.7_0.15_320)]/10",
    border: "border-[oklch(0.7_0.15_320)]/20",
  },
};

export function CourseDetailPage({ course }: { course: Course }) {
  const t = useTranslations("course_page");
  const colors = colorMap[course.color];
  const Icon = iconMap[course.icon] || Code2;

  const infoItems = [
    { icon: Calendar, label: t("duration"), value: course.duration },
    { icon: CreditCard, label: t("price"), value: course.price !== undefined ? `${course.price}€` : t("price_tbd"), highlight: true },
    { icon: FolderGit2, label: t("projects"), value: t("projects_value") },
    { icon: Monitor, label: t("format"), value: t("format_value") },
    { icon: Award, label: t("certificate"), value: t("certificate_value") },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 right-0 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Left — Syllabus */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg}`}
              >
                <Icon className={`h-7 w-7 ${colors.accent}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold sm:text-4xl">
                  {courseNames[course.slug]}
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {courseDescs[course.slug]}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="outline" className={`${colors.border} ${colors.accent}`}>
                <Sparkles className="mr-1 h-3 w-3" />
                {t("ai_integrated")}
              </Badge>
              <Badge variant="outline" className="border-border/50">
                <Calendar className="mr-1 h-3 w-3" />
                {course.duration}
              </Badge>
              <Badge variant="outline" className="border-border/50">
                <FolderGit2 className="mr-1 h-3 w-3" />
                {t("projects_value")}
              </Badge>
            </div>

            {/* Dynamic Curriculum header */}
            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <BrainCircuit className={`h-5 w-5 ${colors.accent}`} />
                {t("dynamic_curriculum")}
              </h2>
            </div>

            {/* Modules accordion */}
            <div className="mt-6">
              <Accordion className="space-y-3">
                {course.modules.map((module, idx) => (
                  <AccordionItem
                    key={module.name}
                    value={module.name}
                    className={`rounded-xl border ${colors.border} bg-card/50 px-5 backdrop-blur-sm`}
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} text-sm font-bold ${colors.accent}`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-medium text-left">
                          {module.name}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-11 space-y-2 pb-2">
                        {module.topics.map((topic) => (
                          <li
                            key={topic}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div
                              className={`h-1.5 w-1.5 rounded-full ${colors.bg}`}
                            />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <SyllabusTracker modules={course.modules} totalHours={course.totalHours} />
          </div>

          {/* Right — Sidebar info card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {infoItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-border/30 pb-3 last:border-0"
                      >
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </span>
                        {item.highlight ? (
                          <span className="text-sm font-bold text-primary">{item.value}</span>
                        ) : (
                          <span className="text-sm font-medium text-foreground">
                            {item.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <Link href={`/enroll?course=${course.slug}`}>
                    <Button className="mt-6 w-full glow" size="lg">
                      {t("enroll_now")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Tech stack icons floating */}
              <div className="mt-6 rounded-xl border border-border/30 bg-card/30 p-4 backdrop-blur-sm">
                <h4 className="text-xs font-medium text-muted-foreground mb-3">
                  {t("what_you_learn")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {course.modules.map((m) => (
                    <Badge
                      key={m.name}
                      variant="secondary"
                      className="text-xs"
                    >
                      {m.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
