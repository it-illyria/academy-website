"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import {
  BrainCircuit,
  Eye,
  Hammer,
  MonitorSmartphone,
  Users,
  Shield,
  Target,
  Lightbulb,
} from "lucide-react";

export function AboutPage() {
  const t = useTranslations("about_page");

  const values = [
    { icon: BrainCircuit, title: t("value1_title"), desc: t("value1_desc"), color: "primary" },
    { icon: Eye, title: t("value2_title"), desc: t("value2_desc"), color: "cyber" },
    { icon: Hammer, title: t("value3_title"), desc: t("value3_desc"), color: "pink" },
    { icon: MonitorSmartphone, title: t("value4_title"), desc: t("value4_desc"), color: "primary" },
    { icon: Users, title: t("value5_title"), desc: t("value5_desc"), color: "cyber" },
    { icon: Shield, title: t("value6_title"), desc: t("value6_desc"), color: "pink" },
  ];

  const wayPoints = [
    t("way1"),
    t("way2"),
    t("way3"),
    t("way4"),
    t("way5"),
  ];

  const colorClasses: Record<string, { icon: string; ring: string }> = {
    primary: { icon: "bg-primary/10 text-primary", ring: "ring-primary/20" },
    cyber: { icon: "bg-cyber/10 text-cyber", ring: "ring-cyber/20" },
    pink: {
      icon: "bg-pink/10 text-pink",
      ring: "ring-pink/20",
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 -left-20 sm:-left-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="absolute bottom-1/4 -right-20 sm:-right-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">{t("mission_title")}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t("mission_desc")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyber/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyber/10">
                <Lightbulb className="h-6 w-6 text-cyber" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">{t("vision_title")}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {t("vision_desc")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* The Lika Way — circular layout */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("the_lika_way")}</h2>

          <div className="relative mx-auto mt-16 flex h-[280px] w-[280px] items-center justify-center sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
            {/* Center circle */}
            <div className="absolute flex h-32 w-32 items-center justify-center rounded-full border border-primary/30 bg-primary/5 glow">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">LIKA</div>
                <div className="text-[10px] text-muted-foreground">ACADEMY</div>
              </div>
            </div>

            {/* Orbiting points — uses CSS calc for responsive radius */}
            {wayPoints.map((point, idx) => {
              const angle = (idx * 360) / wayPoints.length - 90;
              const rad = (angle * Math.PI) / 180;
              // Use percentage-based positioning relative to container
              const xPct = 50 + Math.cos(rad) * 40; // 40% of container
              const yPct = 50 + Math.sin(rad) * 40;

              return (
                <div
                  key={point}
                  className="absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                  }}
                >
                  <div className="group relative">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs sm:text-sm font-bold text-primary transition-all group-hover:scale-110 group-hover:bg-primary/20">
                      {idx + 1}
                    </div>
                    <div className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 w-24 sm:w-40 text-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                        {point}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Connecting ring */}
            <div className="absolute h-[80%] w-[80%] rounded-full border border-dashed border-primary/10" />
          </div>
        </div>

        {/* Values grid */}
        <div className="mt-24">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            {t("values_title")}
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const clr = colorClasses[value.color];
              return (
                <div
                  key={value.title}
                  className="group rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${clr.icon} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
