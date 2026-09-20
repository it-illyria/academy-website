"use client";

import { useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  GraduationCap,
  FolderGit2,
  Users,
  ArrowRight,
} from "lucide-react";

export function TestimonialsSection() {
  const locale = useLocale();
  const isSq = locale === "sq";

  const promises = [
    {
      icon: GraduationCap,
      title: isSq ? "Instruktorë Ekspertë" : "Expert Instructors",
      desc: isSq
        ? "Mëso nga profesionistë me përvojë reale në industri"
        : "Learn from professionals with real industry experience",
      color: "primary" as const,
    },
    {
      icon: FolderGit2,
      title: isSq ? "4 Projekte Portfolio" : "4 Portfolio Projects",
      desc: isSq
        ? "Përfundo çdo kurs me projekte që punëdhënësit i vlerësojnë"
        : "Finish every course with projects that employers value",
      color: "cyber" as const,
    },
    {
      icon: Users,
      title: isSq ? "Komunitet Aktiv" : "Active Community",
      desc: isSq
        ? "Bëhu pjesë e komunitetit Lika — networking, mentoring, karrierë"
        : "Join the Lika community — networking, mentoring, career",
      color: "primary" as const,
    },
    {
      icon: Rocket,
      title: isSq ? "AI e Integruar" : "AI-Integrated",
      desc: isSq
        ? "Çdo kurs integron mjete AI — mëso teknologjinë e së ardhmes"
        : "Every course integrates AI tools — learn the tech of the future",
      color: "cyber" as const,
    },
  ];

  const colorMap = {
    primary: "bg-primary/10 text-primary border-primary/20",
    cyber: "bg-cyber/10 text-cyber border-cyber/20",
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/6 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 bg-primary/5 px-4 py-1.5 text-primary"
          >
            <Rocket className="mr-2 h-3 w-3" />
            {isSq ? "Lansohet në Maj 2026" : "Launching May 2026"}
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {isSq ? "Pse të Zgjedhësh Lika Academy?" : "Why Choose Lika Academy?"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {isSq
              ? "Kohorti i parë po fillon — regjistrohu tani dhe bëhu pjesë e historisë"
              : "The first cohort is starting — enroll now and be part of the story"}
          </p>
        </div>

        {/* Bento-style asymmetric grid — alternates a wide featured card with a standard one per row */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((item, idx) => {
            const featured = idx % 3 === 0;
            const tintBg =
              item.color === "primary" ? "bg-primary/[0.04]" : "bg-cyber/[0.04]";
            return (
              <Card
                key={item.title}
                className={`border-border/50 ${tintBg} backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 ${
                  featured ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <CardContent
                  className={`p-6 ${
                    featured
                      ? "flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left"
                      : "text-center"
                  }`}
                >
                  <div
                    className={`flex shrink-0 items-center justify-center rounded-2xl border ${colorMap[item.color]} ${
                      featured ? "mx-auto h-16 w-16 sm:mx-0" : "mx-auto h-14 w-14"
                    }`}
                  >
                    <item.icon className={featured ? "h-8 w-8" : "h-7 w-7"} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${featured ? "text-lg" : "mt-4 text-base"}`}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4 italic">
            {isSq
              ? "Testimoniale nga studentët realë — pas kohortit të parë!"
              : "Real student testimonials — after the first cohort!"}
          </p>
          <Link href="/enroll">
            <Button size="lg" className="glow">
              {isSq ? "Regjistrohu në Kohortin e Parë" : "Enroll in the First Cohort"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
