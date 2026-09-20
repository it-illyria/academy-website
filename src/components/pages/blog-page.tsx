"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-posts";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";

type Category = "all" | "tutorials" | "career" | "news" | "tips";

const categoryGradients: Record<string, string> = {
  tutorials: "from-primary/30 via-primary/10 to-cyber/20",
  career: "from-cyber/30 via-cyber/10 to-primary/20",
  news: "from-[oklch(0.7_0.15_320)]/30 via-[oklch(0.7_0.15_320)]/10 to-primary/20",
  tips: "from-primary/20 via-cyber/20 to-[oklch(0.7_0.15_320)]/20",
};

const categoryColors: Record<string, string> = {
  tutorials: "bg-primary/10 text-primary border-primary/30",
  career: "bg-cyber/10 text-cyber border-cyber/30",
  news: "bg-[oklch(0.7_0.15_320)]/10 text-[oklch(0.7_0.15_320)] border-[oklch(0.7_0.15_320)]/30",
  tips: "bg-primary/10 text-primary border-primary/30",
};

export function BlogPage() {
  const t = useTranslations("blog");
  const locale = useLocale() as "sq" | "en";
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: Category[] = ["all", "tutorials", "career", "news", "tips"];

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "sq" ? "sq-AL" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 -left-20 sm:-left-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="absolute bottom-1/4 -right-20 sm:-right-40 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("coming_soon")}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-primary">{t("title").split("&")[0]}</span>
            <span className="text-foreground">
              &amp;{t("title").split("&")[1]}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary shadow-[0_0_12px_oklch(0.7_0.25_280)/0.3]"
                  : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Card
              key={post.slug}
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_oklch(0.7_0.25_280)/0.1]"
            >
              {/* Gradient image placeholder */}
              <div
                className={`relative h-44 bg-gradient-to-br ${categoryGradients[post.category]} overflow-hidden`}
              >
                {/* Decorative grid lines */}
                <div className="absolute inset-0 grid-pattern opacity-20" />
                {/* Glow orb */}
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute top-4 left-4">
                  <Badge
                    className={`border text-xs font-medium ${categoryColors[post.category]}`}
                  >
                    {t(`categories.${post.category}`)}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                {/* Meta */}
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime} {t("min_read")}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mb-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {post.title[locale]}
                </h2>

                {/* Excerpt */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt[locale]}
                </p>

                {/* Read More */}
                <Link href={`/blog/${post.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group/btn -ml-2 h-8 px-2 text-primary hover:bg-primary/10"
                  >
                    {t("read_more")}
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
