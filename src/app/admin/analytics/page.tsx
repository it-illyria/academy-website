"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PageView {
  path: string;
  timestamp: string;
  referrer: string;
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export default function AnalyticsPage() {
  const [views, setViews] = useState<PageView[]>([]);

  // localStorage is a client-only external system — it can't be read during
  // render/SSR, so populating this state here (post-mount) is correct.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("lika-pageviews");
      if (raw) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setViews(JSON.parse(raw));
        } catch {
          setViews([]);
        }
      }
    }
  }, []);

  const now = new Date();
  const todayStart = startOfDay(now);
  const weekStart = todayStart - 6 * 24 * 60 * 60 * 1000;

  const totalViews = views.length;
  const todayViews = views.filter(
    (v) => new Date(v.timestamp).getTime() >= todayStart
  ).length;
  const weekViews = views.filter(
    (v) => new Date(v.timestamp).getTime() >= weekStart
  ).length;

  // Top 10 pages
  const pageCounts: Record<string, number> = {};
  views.forEach((v) => {
    pageCounts[v.path] = (pageCounts[v.path] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Views by day — last 7 days
  const days: { label: string; date: Date; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStart - i * 24 * 60 * 60 * 1000);
    const count = views.filter((v) => isSameDay(new Date(v.timestamp), d)).length;
    days.push({
      label: d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" }),
      date: d,
      count,
    });
  }
  const maxDayCount = Math.max(...days.map((d) => d.count), 1);

  // Recent 20 views
  const recent = [...views].reverse().slice(0, 20);

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Image
            src="/logo-icon-192.png"
            alt="Lika Academy"
            width={36}
            height={36}
            className="h-9 w-9"
          />
          <div>
            <h1 className="text-xl font-semibold text-zinc-100">Lika Academy — Analytics</h1>
            <p className="text-xs text-zinc-500">Local page-view tracking</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          <Link href="/admin" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Dashboard</Link>
          <Link href="/admin/courses" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Courses</Link>
          <Link href="/admin/blog" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Blog</Link>
          <Link href="/admin/schedule" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Schedule</Link>
          <Link href="/admin/analytics" className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100">Analytics</Link>
        </nav>

        {/* GA note */}
        <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-xs text-zinc-400">
          For production analytics, set <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-zinc-300">NEXT_PUBLIC_GA_ID</code> in <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-zinc-300">.env.local</code> to enable Google Analytics. Data shown here is from <strong className="text-zinc-300">this browser only</strong> (localStorage).
        </div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-3 gap-3">
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Total views</p>
              <p className="mt-0.5 text-2xl font-bold text-zinc-100">{totalViews}</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Today</p>
              <p className="mt-0.5 text-2xl font-bold text-red-400">{todayViews}</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">This week</p>
              <p className="mt-0.5 text-2xl font-bold text-sky-400">{weekViews}</p>
            </CardContent>
          </Card>
        </div>

        {/* Bar chart — last 7 days */}
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="mb-4 text-sm font-medium text-zinc-300">Page views — last 7 days</h2>
          <div className="flex h-32 items-end gap-2">
            {days.map((d) => (
              <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[10px] text-zinc-500">{d.count}</span>
                <div
                  className="w-full rounded-t bg-red-500/70"
                  style={{ height: `${Math.round((d.count / maxDayCount) * 100)}%`, minHeight: d.count > 0 ? "4px" : "0" }}
                />
                <span className="text-[9px] text-zinc-600">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Top pages */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-sm font-medium text-zinc-300">Top 10 pages</h2>
            {topPages.length === 0 ? (
              <p className="text-xs text-zinc-600">No data yet.</p>
            ) : (
              <ol className="space-y-2">
                {topPages.map(([path, count], i) => (
                  <li key={path} className="flex items-center gap-2 text-xs">
                    <span className="w-4 shrink-0 text-right text-zinc-600">{i + 1}.</span>
                    <span className="min-w-0 flex-1 truncate text-zinc-300">{path}</span>
                    <span className="shrink-0 rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-400">{count}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* Recent views */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-sm font-medium text-zinc-300">Recent views (last 20)</h2>
            {recent.length === 0 ? (
              <p className="text-xs text-zinc-600">No data yet.</p>
            ) : (
              <ul className="space-y-2">
                {recent.map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <span className="min-w-0 flex-1 truncate text-zinc-300">{v.path}</span>
                    <span className="shrink-0 text-zinc-600">
                      {new Date(v.timestamp).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to admin
          </Link>
        </div>
      </div>
    </div>
  );
}
