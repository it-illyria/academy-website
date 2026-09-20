"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ChevronDown, Calculator, Scale, SquareCode } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/programs", key: "programs" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
  { href: "/blog", key: "blog" },
  { href: "/stories", key: "stories" },
  { href: "/schedule", key: "schedule" },
] as const;

const toolLinks = [
  { href: "/calculator", key: "calculator", icon: Calculator },
  { href: "/compare", key: "compare", icon: Scale },
  { href: "/playground", key: "playground", icon: SquareCode },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  const switchLocale = () => {
    const newLocale = locale === "sq" ? "en" : "sq";
    router.replace(pathname, { locale: newLocale });
  };

  const isToolsActive = toolLinks.some((link) =>
    pathname.startsWith(link.href)
  );

  useEffect(() => {
    if (!toolsOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToolsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [toolsOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-br-lg">
        Skip to main content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo-icon-192.png"
            alt="Lika Academy"
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Lika</span>{" "}
            <span className="text-foreground">Academy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}

          {/* Tools dropdown: Calculator, Compare, Playground */}
          <div className="relative" ref={toolsRef}>
            <button
              type="button"
              onClick={() => setToolsOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={toolsOpen}
              className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm transition-colors ${
                isToolsActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {t("tools")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {toolsOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-border/50 bg-background/95 backdrop-blur-xl p-1.5 shadow-xl"
              >
                {toolLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setToolsOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "text-primary font-medium bg-primary/10"
                          : "text-muted-foreground hover:text-primary hover:bg-secondary"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {t(link.key)}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <ThemeToggle />
          <button
            onClick={switchLocale}
            aria-label={`Switch language to ${locale === "sq" ? "English" : "Shqip"}`}
            className="ml-2 rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t("language")}
          </button>
          <Link href="/enroll">
            <Button size="sm" className="ml-3 glow">
              {t("apply")}
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger aria-label="Open navigation menu" className="md:hidden inline-flex items-center justify-center size-8 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(80vw,288px)] bg-background/95 backdrop-blur-xl"
          >
            <nav className="mt-8 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                >
                  {t(link.key)}
                </Link>
              ))}

              {/* Tools links: Calculator, Compare, Playground */}
              <div className="mt-2 border-t border-border/30 pt-2">
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  {t("tools")}
                </p>
                {toolLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                      {t(link.key)}
                    </Link>
                  );
                })}
              </div>

              <div className="px-4 py-2">
                <ThemeToggle />
              </div>
              <button
                onClick={() => {
                  switchLocale();
                  setOpen(false);
                }}
                className="rounded-md px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {locale === "sq" ? "English" : "Shqip"}
              </button>
              <Link href="/enroll" onClick={() => setOpen(false)}>
                <Button className="mt-4 w-full glow">{t("apply")}</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
