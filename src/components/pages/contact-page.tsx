"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { submitContactForm } from "@/lib/actions";
import { saveContactSubmission } from "@/lib/save-submission";

export function ContactPage() {
  const t = useTranslations("contact_page");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/likaacademy.al/" },
    { label: "Facebook", href: "https://www.facebook.com/likaacademy.al" },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen pt-24 pb-16">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[180px] w-[280px] sm:h-[400px] sm:w-[600px] rounded-full bg-primary/5 blur-[200px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Connect with LIKA */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("connect_title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("connect_desc")}
            </p>

            {/* Social media cards */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={`Follow us on ${social.label}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform group-hover:scale-110">
                    <span className="text-sm font-bold text-primary">
                      {social.label.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{social.label}</span>
                </a>
              ))}
            </div>

            {/* Contact info */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("address")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyber/10">
                  <Mail className="h-5 w-5 text-cyber" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("email_address")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("phone_number")}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyber/10">
                  <Clock className="h-5 w-5 text-cyber" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t("hours")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Get in Touch form */}
          <div>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold">{t("touch_title")}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("touch_desc")}
                </p>

                {status === "success" ? (
                  <div role="status" aria-live="polite" className="mt-8 flex flex-col items-center gap-4 py-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-semibold">{statusMessage}</p>
                  </div>
                ) : (
                  <form
                    className="mt-8 space-y-5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setStatus("loading");
                      const fd = new FormData(e.currentTarget);
                      const result = await submitContactForm(fd);
                      if (result.success) {
                        saveContactSubmission({
                          name: fd.get("name") as string,
                          email: fd.get("email") as string,
                          phone: (fd.get("phone") as string) ?? "",
                          message: (fd.get("message") as string) ?? "",
                        });
                        setStatus("success");
                        setStatusMessage(result.message);
                      } else {
                        setStatus("error");
                        setStatusMessage(result.message);
                      }
                    }}
                  >
                  <input type="hidden" name="locale" value={locale} />
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {t("name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder={t("name")}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {t("email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder={t("email")}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {t("phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+355 ..."
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {t("message")}
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      className="w-full rounded-lg border border-border/50 bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder={t("message")}
                    />
                  </div>

                  {status === "error" && (
                    <p role="alert" aria-live="assertive" className="text-sm text-destructive">{statusMessage}</p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full glow"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? t("sending") : t("send")}
                  </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map placeholder — no real map embed yet; re-enable once integrated
        <div className="mt-16 overflow-hidden rounded-xl border border-border/50">
          <div className="flex h-64 items-center justify-center bg-card/30 backdrop-blur-sm">
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-primary/40" />
              <p className="mt-2 text-sm text-muted-foreground">
                {t("address")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Map integration coming soon
              </p>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
}
