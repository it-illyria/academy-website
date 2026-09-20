"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";
import { FadeIn, FadeInScale } from "@/components/ui/motion";
import { submitNewsletter } from "@/lib/actions";
import { saveNewsletterSubmission } from "@/lib/save-submission";
import { ZanaBust } from "@/components/zana-mascot";

export function NewsletterSection() {
  const t = useTranslations("newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const features = [
    t("features.f1"),
    t("features.f2"),
    t("features.f3"),
    t("features.f4"),
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const result = await submitNewsletter(formData);
    setLoading(false);
    if (result.success) {
      saveNewsletterSubmission({ email });
      setSubmitted(true);
    } else {
      setErrorMessage(result.message);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-background to-cyber/10 py-24 sm:py-32">
      {/* Bold full-bleed color block — a deliberate break from the card-on-dark pattern */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyber/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* ── LEFT: Zana + copy + features ── */}
          <div>
            <FadeInScale delay={0.05}>
              <div className="mb-6 flex items-center gap-4">
                <ZanaBust size={88} className="animate-float" />
                <p className="max-w-xs rounded-xl border border-primary/20 bg-background/50 px-4 py-2.5 text-sm text-foreground/90 backdrop-blur-sm">
                  {t("zana_caption")}
                </p>
              </div>
            </FadeInScale>

            <FadeIn delay={0.1}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-primary via-[oklch(0.7_0.15_320)] to-cyber bg-clip-text text-transparent">
                  {t("title")}
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {t("subtitle")}
              </p>
            </FadeIn>

            {/* Feature bullets */}
            <FadeIn delay={0.3}>
              <ul className="mt-8 space-y-3">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* ── RIGHT: form ── */}
          <div>
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border/40 bg-background/70 p-6 shadow-xl backdrop-blur-md sm:p-8">
                {submitted ? (
                  <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 glow">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-semibold text-foreground">
                      {t("success")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("privacy")}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyber/20 bg-cyber/10 glow-cyber">
                        <Mail className="h-5 w-5 text-cyber" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Newsletter</p>
                        <p className="text-xs text-muted-foreground">Lika Academy</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="hidden" name="locale" value={locale} />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("email_placeholder")}
                          aria-label={t("email_placeholder")}
                          className="h-11 flex-1 rounded-lg border border-border/60 bg-input px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                        <Button
                          type="submit"
                          size="default"
                          className="glow h-11 shrink-0 px-5 text-sm font-semibold"
                          disabled={loading}
                        >
                          {loading ? "…" : t("subscribe")}
                        </Button>
                      </div>

                      {errorMessage && (
                        <p role="alert" aria-live="assertive" className="text-sm text-destructive">{errorMessage}</p>
                      )}

                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary/70 flex-shrink-0" />
                        {t("privacy")}
                      </p>
                    </form>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
