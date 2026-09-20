import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lika Academy — Coding Academy in Kamëz, Tirana",
    template: "%s | Lika Academy",
  },
  description: "AI-focused coding academy in Kamëz, Tirana, Albania. Web Development for younger learners and Pro Tracks for adults: Python, JavaScript, Golang, .NET. Prices from 99€.",
  keywords: ["coding academy", "Kamëz", "Tirana", "Albania", "programming courses", "Python", "JavaScript", "Golang", ".NET", "web development", "Lika Academy", "akademi kodimi", "kurse programimi"],
  authors: [{ name: "Lika Academy" }],
  creator: "Lika Academy",
  metadataBase: new URL("https://likaacademy.al"),
  openGraph: {
    type: "website",
    locale: "sq_AL",
    alternateLocale: "en_US",
    siteName: "Lika Academy",
    title: "Lika Academy — Coding Academy in Kamëz, Tirana",
    description: "AI-focused coding academy in Kamëz, Tirana. Courses from 99€. Python, JavaScript, Golang, .NET.",
    images: [{ url: "/zana/bust.png", width: 1200, height: 630, alt: "Lika Academy — AI-focused coding academy in Kamëz, Tirana" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lika Academy — Coding Academy in Kamëz, Tirana",
    description: "AI-focused coding academy in Kamëz, Tirana. Courses from 99€.",
    images: ["/zana/bust.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lika Academy",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#141428" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
