"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-icon-192.png"
                alt="Lika Academy"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">
                <span className="text-primary">Lika</span> Academy
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("description")}
            </p>
            {/* EU Badge — hidden until backing is confirmed real, see AGENTS.md Known Gaps */}
            {/* <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-medium text-primary">
                {t("backed_by")}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                EU for Innovation
              </p>
            </div> */}
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t("programs")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/programs/web-development" className="hover:text-primary transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/programs/python-fullstack" className="hover:text-primary transition-colors">
                  Python
                </Link>
              </li>
              <li>
                <Link href="/programs/javascript-mern" className="hover:text-primary transition-colors">
                  JavaScript / MERN
                </Link>
              </li>
              <li>
                <Link href="/programs/golang" className="hover:text-primary transition-colors">
                  Golang
                </Link>
              </li>
              <li>
                <Link href="/programs/dotnet-csharp" className="hover:text-primary transition-colors">
                  .NET / C#
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t("company")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {nav("about")}
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-primary transition-colors">
                  Instructors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  {nav("contact")}
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-primary transition-colors">
                  {nav("stories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t("resources")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">
                  {nav("blog")}
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-primary transition-colors">
                  Playground
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/referral" className="hover:text-primary transition-colors">
                  {t("referral")}
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-primary transition-colors">
                  {nav("schedule")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              {t("legal")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border/50" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Lika Academy. {t("rights")}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              {t("privacy")}
            </Link>
            <span className="text-border">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
