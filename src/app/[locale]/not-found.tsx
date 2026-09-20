"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2 } from "lucide-react";

export default function LocaleNotFound() {
  const locale = useLocale();
  const isAlbanian = locale === "sq";

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 glow">
            <Code2 className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-primary glow-text">404</h1>

        <div className="mt-4 text-2xl font-mono text-muted-foreground">
          &lt;/not-found&gt;
        </div>

        <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
          {isAlbanian
            ? "Faqja që kërkoni nuk ekziston ose është zhvendosur."
            : "The page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="glow">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {isAlbanian ? "Kthehu Kryefaqja" : "Go Home"}
            </Button>
          </Link>
          <Link href="/programs">
            <Button size="lg" variant="outline" className="border-border/50">
              {isAlbanian ? "Shiko Programet" : "View Programs"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
