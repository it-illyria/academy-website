"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { useIsMounted } from "@/lib/use-mounted"

const STORAGE_KEY = "lika-cookie-consent"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
  timestamp: string
}

function loadPreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CookiePreferences
  } catch {
    return null
  }
}

function savePreferences(prefs: Omit<CookiePreferences, "timestamp">) {
  const data: CookiePreferences = {
    ...prefs,
    timestamp: new Date().toISOString(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* private mode or storage full */ }
}

export function CookieConsent() {
  const t = useTranslations("cookies")
  const locale = useLocale()

  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const mounted = useIsMounted()

  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [functional, setFunctional] = useState(true)

  useEffect(() => {
    if (!mounted) return
    const existing = loadPreferences()
    if (!existing) {
      // Reading localStorage (an external, client-only system) must happen
      // post-mount to avoid SSR/hydration mismatches — this setState is the
      // correct way to surface that result, not an effect we can eliminate.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true)
    }
  }, [mounted])

  if (!mounted || !visible) return null

  function handleAcceptAll() {
    savePreferences({ necessary: true, analytics: true, marketing: true, functional: true })
    setVisible(false)
  }

  function handleRejectAll() {
    savePreferences({ necessary: true, analytics: false, marketing: false, functional: false })
    setVisible(false)
  }

  function handleSavePreferences() {
    savePreferences({ necessary: true, analytics, marketing, functional })
    setVisible(false)
  }

  const privacyHref = `/${locale}/privacy`

  return (
    <>
      {/* Backdrop when expanded */}
      {expanded && (
        <div
          className="fixed inset-0 z-[59] bg-black/50 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Banner / Modal */}
      <div
        className={[
          "fixed z-[60] transition-all duration-500 ease-out",
          expanded
            ? "inset-0 flex items-center justify-center p-4"
            : "bottom-0 left-0 right-0 flex justify-center p-3 sm:p-4",
        ].join(" ")}
        style={{ animation: "slideUp 0.4s ease-out" }}
      >
        <div
          className={[
            "bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl",
            expanded
              ? "w-full max-w-[95vw] sm:max-w-xl rounded-2xl max-h-[90vh] overflow-y-auto"
              : "w-full max-w-[95vw] sm:max-w-4xl rounded-2xl",
          ].join(" ")}
        >
          {expanded ? (
            /* ─── EXPANDED MODAL ─── */
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span>🍪</span>
                    {t("title")}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {t("description")}
                  </p>
                </div>
                <button
                  onClick={() => setExpanded(false)}
                  className="shrink-0 p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Cookie categories */}
              <div className="rounded-xl border border-border/50 overflow-hidden divide-y divide-border/50 mb-5">
                {/* Necessary */}
                <div className="flex items-center justify-between gap-4 px-4 py-3.5 bg-muted/20">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-lg shrink-0 mt-0.5">🔒</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {t("necessary")}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {t("necessary_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-primary/80 whitespace-nowrap">
                      {t("always_on")}
                    </span>
                    <Switch
                      checked={true}
                      disabled={true}
                      aria-label={t("necessary")}
                    />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-lg shrink-0 mt-0.5">📊</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {t("analytics")}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {t("analytics_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Switch
                      checked={analytics}
                      onCheckedChange={(val) => setAnalytics(val)}
                      aria-label={t("analytics")}
                    />
                  </div>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-lg shrink-0 mt-0.5">📢</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {t("marketing")}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {t("marketing_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Switch
                      checked={marketing}
                      onCheckedChange={(val) => setMarketing(val)}
                      aria-label={t("marketing")}
                    />
                  </div>
                </div>

                {/* Functional */}
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-lg shrink-0 mt-0.5">⚙️</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {t("functional")}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {t("functional_desc")}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Switch
                      checked={functional}
                      onCheckedChange={(val) => setFunctional(val)}
                      aria-label={t("functional")}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy link */}
              <div className="mb-5">
                <Link
                  href={privacyHref}
                  className="text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                >
                  {t("privacy_link")}
                </Link>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:justify-between">
                <button
                  onClick={handleRejectAll}
                  className="order-2 sm:order-1 px-4 py-2 rounded-lg border border-border/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all"
                >
                  {t("reject_all")}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="order-1 sm:order-2 px-5 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all shadow-lg hover:shadow-primary/30"
                  style={{
                    background:
                      "oklch(0.62 0.22 27)",
                    boxShadow: "0 0 18px oklch(0.62 0.22 27 / 0.35)",
                  }}
                >
                  {t("save_preferences")} ✨
                </button>
              </div>
            </div>
          ) : (
            /* ─── INITIAL BANNER ─── */
            <div className="px-5 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground flex items-center gap-2">
                    <span>🍪</span>
                    {t("title")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {t("description")}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => setExpanded(true)}
                    className="px-3 py-1.5 rounded-lg border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all whitespace-nowrap"
                  >
                    {t("manage")}
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-3 py-1.5 rounded-lg border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all whitespace-nowrap"
                  >
                    {t("reject_all")}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-primary-foreground transition-all whitespace-nowrap"
                    style={{
                      background: "oklch(0.62 0.22 27)",
                      boxShadow: "0 0 14px oklch(0.62 0.22 27 / 0.35)",
                    }}
                  >
                    {t("accept_all")} ✨
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
