"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Code2, ArrowRight, Zap } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";

export function PlaygroundBanner() {
  const tHero = useTranslations("playground");

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-[oklch(0.7_0.15_320)]/5 to-cyber/10 px-8 py-10 sm:px-12 sm:py-12">
            {/* Oversized watermark glyph — distinct from the blurred-orb treatment used elsewhere */}
            <Code2
              className="pointer-events-none absolute -right-6 -top-10 h-48 w-48 rotate-12 text-cyber/[0.06] sm:h-64 sm:w-64"
              aria-hidden="true"
            />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <Code2 className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                    <Zap className="h-4 w-4 text-cyber" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-cyber">
                      {tHero("try_it")}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {tHero("title")}
                  </h2>
                  <p className="mt-1 max-w-xl text-muted-foreground">
                    {tHero("subtitle")}
                  </p>
                </div>
              </div>

              <Link href="/playground" className="shrink-0">
                <Button size="lg" className="glow text-base px-8">
                  {tHero("try_it")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
