"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Script from "next/script";

const COOKIE_STORAGE_KEY = "lika-cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  timestamp: string;
}

function getCookiePreferences(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

export function Analytics() {
  const pathname = usePathname();
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [functionalAllowed, setFunctionalAllowed] = useState(false);

  // Check cookie consent on mount and when it changes
  useEffect(() => {
    const checkConsent = () => {
      const prefs = getCookiePreferences();
      if (prefs) {
        setAnalyticsAllowed(prefs.analytics);
        setFunctionalAllowed(prefs.functional);
      } else {
        // No consent given yet — don't track anything
        setAnalyticsAllowed(false);
        setFunctionalAllowed(false);
      }
    };

    checkConsent();

    // Listen for consent changes (cookie-consent component saves to localStorage)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === COOKIE_STORAGE_KEY) checkConsent();
    };
    window.addEventListener("storage", handleStorage);

    // Also poll for same-tab changes (storage event doesn't fire for same tab)
    const interval = setInterval(checkConsent, 2000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Log page views only if functional cookies are accepted
  useEffect(() => {
    if (!functionalAllowed) return;
    if (typeof window === "undefined") return;

    try {
      const views = JSON.parse(localStorage.getItem("lika-pageviews") || "[]");
      views.push({
        path: pathname,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || "",
      });
      if (views.length > 1000) views.splice(0, views.length - 1000);
      localStorage.setItem("lika-pageviews", JSON.stringify(views));
    } catch {}
  }, [pathname, functionalAllowed]);

  // Google Analytics — only load if analytics cookies are accepted
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId || !analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="gtag" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { 'anonymize_ip': true });
        `}
      </Script>
    </>
  );
}
