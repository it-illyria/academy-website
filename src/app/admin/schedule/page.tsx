"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cohorts as hardcodedCohorts } from "@/lib/schedule-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ── Types ──────────────────────────────────────────────────────────────────────

interface TimeSlot {
  time: string;
  saturday: string;
  sunday: string;
}

interface Cohort {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  spots_per_class: number;
  spots_taken: number;
  is_first: boolean;
  is_active: boolean;
  timetable: TimeSlot[];
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
];

const COURSE_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "python-fullstack", label: "Python Full-Stack" },
  { value: "javascript-mern", label: "JavaScript / MERN" },
  { value: "golang", label: "Golang" },
  { value: "dotnet-csharp", label: ".NET / C#" },
  { value: "web-development", label: "Web Development" },
];

const EMPTY_TIMETABLE: TimeSlot[] = TIME_SLOTS.map((time) => ({
  time,
  saturday: "open",
  sunday: "open",
}));

const EMPTY_FORM: Omit<Cohort, "id"> = {
  name: "",
  start_date: "",
  end_date: "",
  spots_per_class: 12,
  spots_taken: 0,
  is_first: false,
  is_active: true,
  timetable: EMPTY_TIMETABLE,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function courseLabel(slug: string): string {
  return COURSE_OPTIONS.find((o) => o.value === slug)?.label ?? slug;
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TimetablePreview({ timetable }: { timetable: TimeSlot[] }) {
  return (
    <table className="w-full text-xs mt-3">
      <thead>
        <tr className="border-b border-zinc-800">
          <th className="pb-1.5 text-left font-medium text-zinc-500">Time</th>
          <th className="pb-1.5 text-center font-medium text-zinc-500">Sat</th>
          <th className="pb-1.5 text-center font-medium text-zinc-500">Sun</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-zinc-800/40">
        {timetable.map((slot) => (
          <tr key={slot.time}>
            <td className="py-1.5 font-mono text-zinc-400">{slot.time}</td>
            <td className="py-1.5 text-center">
              {slot.saturday ? (
                <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  {courseLabel(slot.saturday)}
                </span>
              ) : (
                <span className="text-zinc-700">—</span>
              )}
            </td>
            <td className="py-1.5 text-center">
              {slot.sunday ? (
                <span className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-zinc-300">
                  {courseLabel(slot.sunday)}
                </span>
              ) : (
                <span className="text-zinc-700">—</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Input / Select helpers ────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";

const selectCls =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-colors";

const labelCls = "block text-xs font-medium text-zinc-400 mb-1";

// ── CohortForm ────────────────────────────────────────────────────────────────

interface CohortFormProps {
  initial: Omit<Cohort, "id"> & { id?: string };
  onSave: (data: Omit<Cohort, "id"> & { id?: string }) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function CohortForm({ initial, onSave, onCancel, saving }: CohortFormProps) {
  const [form, setForm] = useState(initial);

  function setField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setSlot(index: number, day: "saturday" | "sunday", value: string) {
    setForm((prev) => {
      const timetable = prev.timetable.map((slot, i) =>
        i === index ? { ...slot, [day]: value } : slot
      );
      return { ...prev, timetable };
    });
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900">
      {/* Form header */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-5 py-3.5">
        <h2 className="text-sm font-semibold text-zinc-100">
          {form.id ? "Edit Cohort" : "New Cohort"}
        </h2>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Row 1: name + dates */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls}>Cohort name</label>
            <input
              className={inputCls}
              placeholder="e.g. May 2026"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Start date</label>
            <input
              type="date"
              className={inputCls}
              value={form.start_date}
              onChange={(e) => setField("start_date", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>End date</label>
            <input
              type="date"
              className={inputCls}
              value={form.end_date}
              onChange={(e) => setField("end_date", e.target.value)}
            />
          </div>
        </div>

        {/* Row 2: spots */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Spots per class</label>
            <input
              type="number"
              min={1}
              className={inputCls}
              value={form.spots_per_class}
              onChange={(e) => setField("spots_per_class", Number(e.target.value))}
            />
          </div>
          <div>
            <label className={labelCls}>Spots taken</label>
            <input
              type="number"
              min={0}
              className={inputCls}
              value={form.spots_taken}
              onChange={(e) => setField("spots_taken", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Row 3: checkboxes */}
        <div className="flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-zinc-600 bg-zinc-800 accent-zinc-400"
              checked={form.is_first}
              onChange={(e) => setField("is_first", e.target.checked)}
            />
            First cohort
          </label>
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-zinc-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border border-zinc-600 bg-zinc-800 accent-zinc-400"
              checked={form.is_active}
              onChange={(e) => setField("is_active", e.target.checked)}
            />
            Active (visible on site)
          </label>
        </div>

        {/* Timetable editor */}
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            Timetable
          </p>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/70">
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                    Time slot
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                    Saturday
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500">
                    Sunday
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {form.timetable.map((slot, i) => (
                  <tr key={slot.time} className="bg-zinc-900/30">
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-400 whitespace-nowrap">
                      {slot.time}
                    </td>
                    <td className="px-4 py-2.5">
                      <select
                        className={selectCls}
                        value={slot.saturday}
                        onChange={(e) => setSlot(i, "saturday", e.target.value)}
                      >
                        {COURSE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2.5">
                      <select
                        className={selectCls}
                        value={slot.sunday}
                        onChange={(e) => setSlot(i, "sunday", e.target.value)}
                      >
                        {COURSE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="default"
            size="sm"
            disabled={saving}
            onClick={() => onSave(form)}
          >
            {saving ? "Saving…" : form.id ? "Save changes" : "Create cohort"}
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type ViewMode = "list" | "create" | "edit";

export default function AdminSchedulePage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("list");
  const [editTarget, setEditTarget] = useState<Cohort | null>(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // ── Data loading ─────────────────────────────────────────────────────────────

  const reload = useCallback(async () => {
    try {
      setError(null);
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setCohorts(json.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cohorts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // ── CRUD handlers ─────────────────────────────────────────────────────────────

  async function handleSave(data: Omit<Cohort, "id"> & { id?: string }) {
    setSaving(true);
    try {
      const method = data.id ? "PUT" : "POST";
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/schedule", {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      setMode("list");
      setEditTarget(null);
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`Delete cohort "${name}"? This cannot be undone.`)) return;
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/schedule", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function handleSeed() {
    if (
      !window.confirm(
        `Seed ${hardcodedCohorts.length} cohort(s) from schedule-data.ts? Existing data will not be overwritten.`
      )
    )
      return;
    setSeeding(true);
    try {
      const seedToken = sessionStorage.getItem("lika-admin-auth");
      for (const cohort of hardcodedCohorts) {
        await fetch("/api/admin/schedule", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${seedToken}` },
          body: JSON.stringify({
            name: cohort.name,
            start_date: cohort.startDate,
            end_date: cohort.endDate,
            spots_per_class: cohort.spotsPerClass,
            spots_taken: cohort.spotsTaken,
            is_first: cohort.isFirst || false,
            timetable: cohort.timetable,
            is_active: true,
          }),
        });
      }
      await reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Seed failed");
    } finally {
      setSeeding(false);
    }
  }

  // ── Render helpers ────────────────────────────────────────────────────────────

  function startEdit(cohort: Cohort) {
    setEditTarget(cohort);
    setMode("edit");
  }

  function cancelForm() {
    setMode("list");
    setEditTarget(null);
  }

  // ── Form view ─────────────────────────────────────────────────────────────────

  if (mode === "create" || mode === "edit") {
    const initial =
      mode === "edit" && editTarget
        ? {
            id: editTarget.id,
            name: editTarget.name,
            start_date: editTarget.start_date,
            end_date: editTarget.end_date,
            spots_per_class: editTarget.spots_per_class,
            spots_taken: editTarget.spots_taken,
            is_first: editTarget.is_first,
            is_active: editTarget.is_active,
            timetable:
              editTarget.timetable.length > 0
                ? editTarget.timetable
                : EMPTY_TIMETABLE,
          }
        : EMPTY_FORM;

    return (
      <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={cancelForm}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              ← Schedule
            </button>
            <h1 className="text-xl font-semibold text-zinc-100">
              {mode === "edit" ? "Edit Cohort" : "New Cohort"}
            </h1>
          </div>

          <CohortForm
            initial={initial}
            onSave={handleSave}
            onCancel={cancelForm}
            saving={saving}
          />
        </div>
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────────

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Admin
          </Link>
          <h1 className="text-xl font-semibold text-zinc-100">Schedule</h1>
          <span className="ml-2 rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
            {cohorts.length} cohort{cohorts.length !== 1 ? "s" : ""}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {cohorts.length === 0 && !loading && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSeed}
                disabled={seeding}
              >
                {seeding ? "Seeding…" : "Seed from hardcoded"}
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={() => setMode("create")}
            >
              + Add Cohort
            </Button>
          </div>
        </div>

        {/* Admin nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/courses"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            Courses
          </Link>
          <Link
            href="/admin/blog"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/admin/schedule"
            className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100"
          >
            Schedule
          </Link>
          <Link
            href="/admin/analytics"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
          >
            Analytics
          </Link>
        </nav>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
            <button
              onClick={reload}
              className="ml-3 text-xs underline hover:no-underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && cohorts.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-16 text-center">
            <p className="mb-4 text-sm text-zinc-500">
              No cohorts yet. Create one or seed from the hardcoded data.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={handleSeed} disabled={seeding}>
                {seeding ? "Seeding…" : "Seed from hardcoded"}
              </Button>
              <Button size="sm" onClick={() => setMode("create")}>
                + Add Cohort
              </Button>
            </div>
          </div>
        )}

        {/* Cohort cards */}
        {!loading && cohorts.length > 0 && (
          <div className="space-y-5">
            {cohorts.map((cohort) => (
              <Card
                key={cohort.id}
                className="overflow-hidden border-zinc-800 bg-zinc-900/50"
              >
                {/* Card header */}
                <div className="flex flex-wrap items-center gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-semibold text-zinc-100">{cohort.name}</span>
                    {cohort.is_first && (
                      <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px]">
                        First cohort
                      </Badge>
                    )}
                    {!cohort.is_active && (
                      <Badge className="border-zinc-600/40 bg-zinc-700/30 text-zinc-500 text-[10px]">
                        Inactive
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-zinc-400 ml-auto">
                    <span>
                      <span className="text-zinc-600">Start:</span>{" "}
                      <span className="text-zinc-300">{cohort.start_date}</span>
                    </span>
                    <span>
                      <span className="text-zinc-600">End:</span>{" "}
                      <span className="text-zinc-300">{cohort.end_date}</span>
                    </span>
                    <span>
                      <span className="text-zinc-600">Spots:</span>{" "}
                      <span className="text-zinc-300">
                        {cohort.spots_taken}/{cohort.spots_per_class}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => startEdit(cohort)}
                      className="rounded-lg border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cohort.id, cohort.name)}
                      className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-500 hover:border-red-800 hover:bg-red-950/30 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Timetable preview */}
                <CardContent className="px-4 py-4">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                    Timetable
                  </p>
                  {cohort.timetable && cohort.timetable.length > 0 ? (
                    <TimetablePreview timetable={cohort.timetable} />
                  ) : (
                    <p className="text-xs text-zinc-600 py-2">No timetable configured.</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
