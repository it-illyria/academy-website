"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, RefreshCw, LogOut, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DbSubmission } from "@/lib/supabase";
import { AdminLogin } from "./login";

type Submission = DbSubmission;

// ── Helpers ───────────────────────────────────────────────────────────────────

type FilterType = "all" | Submission["type"];

const TYPE_LABELS: Record<Submission["type"], string> = {
  enrollment: "Enrollment",
  contact: "Contact",
  newsletter: "Newsletter",
  referral: "Referral",
};

const TYPE_COLORS: Record<Submission["type"], string> = {
  enrollment: "border-red-500/40 bg-red-500/10 text-red-400",
  contact: "border-sky-500/40 bg-sky-500/10 text-sky-400",
  newsletter: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  referral: "border-amber-500/40 bg-amber-500/10 text-amber-400",
};

const STATUS_COLORS: Record<Submission["status"], string> = {
  new: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  contacted: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
  resolved: "border-green-500/40 bg-green-500/10 text-green-400",
};

const STATUS_NEXT: Record<Submission["status"], Submission["status"]> = {
  new: "contacted",
  contacted: "resolved",
  resolved: "new",
};

function formatTimestamp(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function summariseData(data: Record<string, string>): string {
  // Pick the most human-readable fields to show in the row
  const priority = ["name", "fullName", "email", "your_name", "your_email", "friend_email"];
  const parts: string[] = [];
  for (const key of priority) {
    if (data[key]) parts.push(data[key]);
    if (parts.length >= 2) break;
  }
  if (parts.length === 0) {
    // Fall back to first two values
    parts.push(...Object.values(data).slice(0, 2));
  }
  return parts.join(" · ");
}

function exportToCsv(submissions: Submission[]) {
  if (submissions.length === 0) return;

  // Get all unique data keys
  const dataKeys = new Set<string>();
  submissions.forEach((s) => Object.keys(s.data).forEach((k) => dataKeys.add(k)));

  const headers = ["id", "type", "status", "timestamp", ...Array.from(dataKeys)];

  const rows = submissions.map((s) => {
    return headers.map((h) => {
      if (h === "id") return s.id;
      if (h === "type") return s.type;
      if (h === "status") return s.status;
      if (h === "timestamp") return s.created_at;
      return s.data[h] || "";
    }).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lika-submissions-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Loading Spinner ───────────────────────────────────────────────────────────

function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    enrollments: 0,
    contacts: 0,
    newsletter: 0,
    referrals: 0,
    new: 0,
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const json = await res.json();
      const subs: Submission[] = json.submissions ?? [];
      setSubmissions(subs);
      setStats({
        total: subs.length,
        enrollments: subs.filter((s) => s.type === "enrollment").length,
        contacts: subs.filter((s) => s.type === "contact").length,
        newsletter: subs.filter((s) => s.type === "newsletter").length,
        referrals: subs.filter((s) => s.type === "referral").length,
        new: subs.filter((s) => s.status === "new").length,
      });
    } catch (err) {
      console.error("[Admin] Failed to load submissions", err);
    }
  }, []);

  // Fetching submissions from the API on mount is a legitimate use of an
  // effect to synchronize with an external system (the backend) — `reload`
  // is async and only calls setState after awaiting the fetch, so this
  // isn't the synchronous setState-in-effect anti-pattern the rule targets.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reload();
  }, [reload]);

  const handleStatusToggle = async (id: string, current: Submission["status"]) => {
    const token = sessionStorage.getItem("lika-admin-auth");
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status: STATUS_NEXT[current] }),
    });
    reload();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this submission? This cannot be undone.")) return;
    const token = sessionStorage.getItem("lika-admin-auth");
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    reload();
  };

  const filtered =
    filter === "all" ? submissions : submissions.filter((s) => s.type === filter);

  const tabs: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: stats.total },
    { label: "Enrollments", value: "enrollment", count: stats.enrollments },
    { label: "Contacts", value: "contact", count: stats.contacts },
    { label: "Newsletter", value: "newsletter", count: stats.newsletter },
    { label: "Referrals", value: "referral", count: stats.referrals },
  ];

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
            <h1 className="text-xl font-semibold text-zinc-100">Lika Academy — Admin</h1>
            <p className="text-xs text-zinc-500">Form submissions dashboard</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={reload}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-red-800 hover:text-red-400"
            >
              <LogOut className="h-3 w-3" />
              Logout
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          <Link href="/admin" className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100">Dashboard</Link>
          <Link href="/admin/courses" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Courses</Link>
          <Link href="/admin/blog" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Blog</Link>
          <Link href="/admin/schedule" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Schedule</Link>
          <Link href="/admin/analytics" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Analytics</Link>
        </nav>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="border-zinc-800 bg-zinc-900 ring-zinc-800">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Total</p>
              <p className="mt-0.5 text-2xl font-bold text-zinc-100">{stats.total}</p>
              {stats.new > 0 && (
                <p className="mt-0.5 text-xs text-blue-400">{stats.new} new</p>
              )}
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900 ring-zinc-800">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Enrollments</p>
              <p className="mt-0.5 text-2xl font-bold text-red-400">{stats.enrollments}</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900 ring-zinc-800">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Contacts</p>
              <p className="mt-0.5 text-2xl font-bold text-sky-400">{stats.contacts}</p>
            </CardContent>
          </Card>
          <Card className="border-zinc-800 bg-zinc-900 ring-zinc-800">
            <CardContent className="px-4 py-3">
              <p className="text-xs text-zinc-500">Newsletter</p>
              <p className="mt-0.5 text-2xl font-bold text-emerald-400">{stats.newsletter}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter tabs + Export */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={[
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                filter === tab.value
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
              ].join(" ")}
            >
              {tab.label}
              <span
                className={[
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                  filter === tab.value ? "bg-zinc-600 text-zinc-200" : "bg-zinc-800 text-zinc-500",
                ].join(" ")}
              >
                {tab.count}
              </span>
            </button>
          ))}
          <button
            onClick={() => exportToCsv(filtered)}
            disabled={filtered.length === 0}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download className="h-3 w-3" />
            Export CSV
          </button>
        </div>

        {/* Submissions list */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
            <p className="text-sm text-zinc-500">
              No submissions yet. They&apos;ll appear here when someone fills a form.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((sub) => (
              <div
                key={sub.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900"
              >
                {/* Row */}
                <div
                  className="flex cursor-pointer items-center gap-3 px-4 py-3"
                  onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                >
                  {/* Type badge */}
                  <span
                    className={[
                      "shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium",
                      TYPE_COLORS[sub.type],
                    ].join(" ")}
                  >
                    {TYPE_LABELS[sub.type]}
                  </span>

                  {/* Summary */}
                  <span className="min-w-0 flex-1 truncate text-sm text-zinc-300">
                    {summariseData(sub.data)}
                  </span>

                  {/* Timestamp */}
                  <span className="hidden shrink-0 text-xs text-zinc-600 sm:block">
                    {formatTimestamp(sub.created_at)}
                  </span>

                  {/* Status badge — clickable */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(sub.id, sub.status);
                    }}
                    title="Click to advance status"
                    className={[
                      "shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium capitalize transition-opacity hover:opacity-70",
                      STATUS_COLORS[sub.status],
                    ].join(" ")}
                  >
                    {sub.status}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(sub.id);
                    }}
                    title="Delete submission"
                    className="shrink-0 rounded p-1 text-zinc-600 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Expanded detail */}
                {expandedId === sub.id && (
                  <div className="border-t border-zinc-800 px-4 py-3">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                      Full data
                    </p>
                    <dl className="grid gap-y-1 gap-x-4 text-xs sm:grid-cols-2">
                      {Object.entries(sub.data).map(([key, val]) => (
                        <div key={key} className="flex gap-2">
                          <dt className="w-28 shrink-0 truncate text-zinc-500">{key}</dt>
                          <dd className="min-w-0 break-words text-zinc-300">{val}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-3 text-[10px] text-zinc-600">
                      ID: {sub.id} · {formatTimestamp(sub.created_at)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  // sessionStorage is a client-only external system, so the initial auth
  // check can only run post-mount; the `else` branch's setState mirrors the
  // async branches above (which resolve setState only after a fetch), just
  // synchronously when there's nothing to fetch.
  useEffect(() => {
    const saved = sessionStorage.getItem("lika-admin-auth");
    if (saved) {
      fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: saved }),
      })
        .then((res) => {
          setAuthed(res.ok);
          setChecking(false);
        })
        .catch(() => setChecking(false));
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChecking(false);
    }
  }, []);

  if (checking) return <LoadingSpinner />;
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <AdminDashboard
      onLogout={() => {
        sessionStorage.removeItem("lika-admin-auth");
        setAuthed(false);
      }}
    />
  );
}
