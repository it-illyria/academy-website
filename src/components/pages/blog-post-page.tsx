"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Code2,
  MoreHorizontal,
  Copy,
  Check,
} from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";
import { blogPosts } from "@/lib/blog-posts";

const categoryColors: Record<string, string> = {
  tutorials: "bg-primary/10 text-primary border-primary/30",
  career: "bg-cyber/10 text-cyber border-cyber/30",
  news: "bg-[oklch(0.7_0.15_320)]/10 text-[oklch(0.7_0.15_320)] border-[oklch(0.7_0.15_320)]/30",
  tips: "bg-primary/10 text-primary border-primary/30",
};

const categoryGradients: Record<string, string> = {
  tutorials: "from-primary/30 via-primary/10 to-cyber/20",
  career: "from-cyber/30 via-cyber/10 to-primary/20",
  news: "from-[oklch(0.7_0.15_320)]/30 via-[oklch(0.7_0.15_320)]/10 to-primary/20",
  tips: "from-primary/20 via-cyber/20 to-[oklch(0.7_0.15_320)]/20",
};

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre
            key={`code-${i}`}
            className="my-4 overflow-x-auto rounded-xl border border-border/50 bg-secondary/50 p-4 backdrop-blur-sm"
          >
            <code className="text-sm text-foreground">{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 text-2xl font-bold text-foreground">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-8 mb-3 text-xl font-semibold text-foreground">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*\s*[—-]?\s*(.*)/);
      if (match) {
        elements.push(
          <li key={i} className="ml-4 mb-2 flex items-start gap-2 text-muted-foreground">
            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
            <span>
              <strong className="text-foreground">{match[1]}</strong>
              {match[2] ? ` — ${match[2]}` : ""}
            </span>
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="ml-4 mb-2 flex items-start gap-2 text-muted-foreground">
          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    } else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        <li key={i} className="ml-4 mb-2 flex items-start gap-2 text-muted-foreground">
          <span className="shrink-0 font-mono text-xs text-primary">
            {line.match(/^\d+/)![0]}.
          </span>
          <span>{renderInline(text)}</span>
        </li>
      );
    } else if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith("| ")) {
        tableLines.push(lines[j]);
        j++;
      }
      elements.push(renderTable(tableLines, i));
      i = j - 1;
    } else {
      elements.push(
        <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
          {renderInline(line)}
        </p>
      );
    }
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|→)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="text-foreground font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded-md bg-secondary px-1.5 py-0.5 text-xs text-primary font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part === "→") {
      return (
        <span key={idx} className="text-primary">
          {" → "}
        </span>
      );
    }
    return part;
  });
}

function renderTable(lines: string[], keyBase: number) {
  const headers = lines[0]
    .split("|")
    .filter((c) => c.trim())
    .map((c) => c.trim());
  const rows = lines.slice(2).map((line) =>
    line
      .split("|")
      .filter((c) => c.trim())
      .map((c) => c.trim())
  );

  return (
    <div key={`table-${keyBase}`} className="my-6 overflow-x-auto">
      <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-secondary/50">
            {headers.map((h, idx) => (
              <th
                key={idx}
                className="px-4 py-2.5 text-left font-semibold text-foreground border-b border-border/50"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className="border-b border-border/30 last:border-0"
            >
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-2 text-muted-foreground"
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShareButtons({ title, locale }: { title: string; locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const mainLinks = [
    {
      label: "Facebook",
      icon: "f",
      color: "hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:border-[#1877F2]/30",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: "W",
      color: "hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/30",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: "in",
      color: "hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const moreLinks = [
    {
      label: "Twitter / X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground mr-1">
        <Share2 className="inline h-3.5 w-3.5 mr-1" />
        {locale === "sq" ? "Ndaj" : "Share"}
      </span>

      {/* 3 main share buttons */}
      {mainLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${locale === "sq" ? "Ndaj në" : "Share on"} ${link.label}`}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-xs font-bold text-muted-foreground transition-all ${link.color}`}
        >
          {link.icon}
        </a>
      ))}

      {/* More menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={locale === "sq" ? "Më shumë opsione" : "More options"}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-all hover:border-primary/30 hover:text-primary"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-10 z-50 w-44 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl overflow-hidden">
              {moreLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { handleCopy(); setMenuOpen(false); }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border-t border-border/30"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
                {copied
                  ? (locale === "sq" ? "U kopjua!" : "Copied!")
                  : (locale === "sq" ? "Kopjo linkun" : "Copy link")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");
  const locale = useLocale() as "sq" | "en";

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === "sq" ? "sq-AL" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get related posts (same category, excluding current)
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 right-0 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("title")}
        </Link>

        {/* Hero image */}
        <div
          className={`relative mt-6 h-48 sm:h-64 rounded-2xl bg-gradient-to-br ${categoryGradients[post.category]} overflow-hidden`}
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Code2 className="h-16 w-16 text-primary/30" />
          </div>
        </div>

        {/* Article header */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={`border text-xs ${categoryColors[post.category]}`}>
              {t(`categories.${post.category}`)}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime} {t("min_read")}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {post.title[locale]}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt[locale]}
          </p>

          {/* Share buttons */}
          <div className="mt-6">
            <ShareButtons title={post.title[locale]} locale={locale} />
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Article content */}
        <article className="prose-custom">
          {renderMarkdown(post.content[locale])}
        </article>

        {/* Share & CTA */}
        <div className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-cyber/5 p-8 text-center">
          <h3 className="text-xl font-bold">
            {locale === "sq"
              ? "Gati të fillosh të mësosh?"
              : "Ready to start learning?"}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === "sq"
              ? "Regjistrohu në Lika Academy dhe fillo rrugën tënde si developer."
              : "Enroll at Lika Academy and start your journey as a developer."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/programs">
              <Button size="lg" className="glow">
                {locale === "sq" ? "Shiko Programet" : "View Programs"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/enroll">
              <Button size="lg" variant="outline" className="border-border/50">
                {locale === "sq" ? "Apliko Tani" : "Apply Now"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6">
              {locale === "sq" ? "Artikuj të ngjashëm" : "Related articles"}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((relPost) => (
                <Link key={relPost.slug} href={`/blog/${relPost.slug}`}>
                  <Card className="group h-full border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-5">
                      <Badge
                        className={`border text-xs mb-3 ${categoryColors[relPost.category]}`}
                      >
                        {t(`categories.${relPost.category}`)}
                      </Badge>
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {relPost.title[locale]}
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {relPost.excerpt[locale]}
                      </p>
                      <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                        {t("read_more")}
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
