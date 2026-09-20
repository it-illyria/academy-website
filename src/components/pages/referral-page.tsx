"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { submitReferral } from "@/lib/actions";
import { saveReferralSubmission } from "@/lib/save-submission";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/motion";
import {
  Gift,
  UserPlus,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  Star,
  Send,
  Infinity,
  Layers,
} from "lucide-react";

export function ReferralPage() {
  const t = useTranslations("referral");
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const steps = [
    {
      num: "01",
      icon: BookOpen,
      title: t("step1_title"),
      desc: t("step1_desc"),
      color: "text-primary",
      ring: "border-primary/30 bg-primary/5 group-hover:border-primary/50 group-hover:bg-primary/10",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.25_280/0.15)]",
    },
    {
      num: "02",
      icon: UserPlus,
      title: t("step2_title"),
      desc: t("step2_desc"),
      color: "text-cyber",
      ring: "border-cyber/30 bg-cyber/5 group-hover:border-cyber/50 group-hover:bg-cyber/10",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.2_180/0.15)]",
    },
    {
      num: "03",
      icon: Gift,
      title: t("step3_title"),
      desc: t("step3_desc"),
      color: "text-primary",
      ring: "border-primary/30 bg-primary/5 group-hover:border-primary/50 group-hover:bg-primary/10",
      glow: "group-hover:shadow-[0_0_30px_oklch(0.7_0.25_280/0.15)]",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const fd = new FormData(e.currentTarget);
    const result = await submitReferral(fd);
    setLoading(false);
    if (result.success) {
      saveReferralSubmission({
        yourName: fd.get("your_name") as string,
        yourEmail: fd.get("your_email") as string,
        friendName: fd.get("friend_name") as string,
        friendEmail: fd.get("friend_email") as string,
      });
      setSubmitted(true);
    } else {
      setErrorMessage(result.message);
    }
  }

  return (
    <div className="relative overflow-hidden min-h-screen pb-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-10" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[280px] w-[350px] sm:h-[600px] sm:w-[800px] rounded-full bg-primary/5 blur-[200px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[180px] w-[180px] sm:h-[400px] sm:w-[400px] rounded-full bg-cyber/5 blur-[180px]" />

      {/* ── Section 1: Hero ── */}
      <section className="relative pt-28 pb-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <Badge
              variant="outline"
              className="mb-6 border-primary/30 bg-primary/5 text-primary px-4 py-1.5"
            >
              <Gift className="mr-2 h-3.5 w-3.5" />
              {t("badge")}
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              {t("subtitle")}
            </p>

            {/* Value pill */}
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-3 backdrop-blur-sm">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <span className="text-base font-semibold text-primary">
                15% off for you AND your friend
              </span>
              <Star className="h-5 w-5 text-primary fill-primary" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 2: How It Works ── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("how_title")}
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Connection line (desktop) */}
            <div className="absolute top-12 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />

            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((step, idx) => (
                <FadeIn key={step.num} delay={idx * 0.12}>
                  <div className={`group relative text-center`}>
                    {/* Circle */}
                    <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
                      <div
                        className={`absolute inset-0 rounded-full border transition-all duration-300 ${step.ring}`}
                      />
                      <step.icon className={`relative h-9 w-9 ${step.color}`} />
                    </div>

                    <div className="font-mono text-xs text-primary/50 mb-2">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.desc}
                    </p>

                    {/* Arrow between steps */}
                    {idx < steps.length - 1 && (
                      <div className="absolute top-12 -right-4 hidden text-primary/30 lg:block">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Benefits ── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Your Benefit */}
            <FadeIn delay={0.05}>
              <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
                <CardContent className="relative p-6 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                    <Gift className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {t("your_benefit")}
                  </h3>
                  <p className="mt-2 text-2xl font-bold">{t("your_discount")}</p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {t("no_limit")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Layers className="h-4 w-4 text-primary shrink-0" />
                      {t("stackable")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Infinity className="h-4 w-4 text-primary shrink-0" />
                      {t("no_limit")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Friend's Benefit */}
            <FadeIn delay={0.15}>
              <Card className="relative overflow-hidden border-cyber/20 bg-card/50 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyber/10 via-cyber/5 to-transparent" />
                <CardContent className="relative p-6 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-cyber/30 bg-cyber/10">
                    <UserPlus className="h-6 w-6 text-cyber" />
                  </div>
                  <h3 className="text-xl font-bold text-cyber">
                    {t("friend_benefit")}
                  </h3>
                  <p className="mt-2 text-2xl font-bold">
                    {t("friend_discount")}
                  </p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-cyber shrink-0" />
                      {t("no_limit")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Layers className="h-4 w-4 text-cyber shrink-0" />
                      {t("stackable")}
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-cyber shrink-0" />
                      {t("friend_benefit")}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Example highlight */}
          <FadeIn delay={0.2}>
            <div className="mt-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-cyber/10 p-6 text-center backdrop-blur-sm">
              <p className="text-xs font-mono text-primary/70 uppercase tracking-widest mb-2">
                {t("example_title")}
              </p>
              <p className="text-lg font-bold sm:text-xl">{t("example_desc")}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 4: Invite Form ── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("share_title")}
              </h2>
              <p className="mt-3 text-muted-foreground">{t("share_desc")}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Card className="relative overflow-hidden border-border/40 bg-card/40 backdrop-blur-md">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyber/5" />
              <CardContent className="relative p-6 sm:p-8">
                {submitted ? (
                  <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-xl font-semibold text-primary">
                      {t("invite_sent")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="locale" value={locale} />
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          {t("your_name")}
                        </label>
                        <input
                          type="text"
                          name="your_name"
                          required
                          placeholder={t("your_name")}
                          className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          {t("your_email")}
                        </label>
                        <input
                          type="email"
                          name="your_email"
                          required
                          placeholder={t("your_email")}
                          className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          {t("friend_name")}
                        </label>
                        <input
                          type="text"
                          name="friend_name"
                          required
                          placeholder={t("friend_name")}
                          className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium">
                          {t("friend_email")}
                        </label>
                        <input
                          type="email"
                          name="friend_email"
                          required
                          placeholder={t("friend_email")}
                          className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <p role="alert" aria-live="assertive" className="text-sm text-destructive">{errorMessage}</p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="glow w-full text-base"
                      disabled={loading}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {loading ? "Sending…" : t("send_invite")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* ── Section 5: Terms ── */}
      <section className="relative py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <FadeIn>
            <h2 className="mb-6 text-xl font-semibold text-center">
              {t("terms_title")}
            </h2>
            <Card className="border-border/40 bg-card/40 backdrop-blur-sm">
              <CardContent className="p-6">
                <Accordion>
                  {(
                    [
                      { value: "t1", label: t("term1") },
                      { value: "t2", label: t("term2") },
                      { value: "t3", label: t("term3") },
                      { value: "t4", label: t("term4") },
                    ] as const
                  ).map((term, idx) => (
                    <AccordionItem key={term.value} value={term.value}>
                      <AccordionTrigger className="text-sm text-muted-foreground py-3">
                        <span className="mr-3 font-mono text-xs text-primary/60">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {term.label}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pl-8">
                        {term.label}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
