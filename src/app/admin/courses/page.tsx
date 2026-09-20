"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { courses as hardcodedCourses } from "@/lib/courses";
import { Button } from "@/components/ui/button";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Module {
  name: string;
  hours: number;
  topics: string[];
}

interface DbCourse {
  id?: string | number;
  slug: string;
  name_sq: string;
  name_en: string;
  description_sq?: string;
  description_en?: string;
  category: "webdev" | "adults";
  icon: string;
  color: "cyan" | "purple" | "pink";
  duration?: string;
  total_hours: number;
  weeks: number;
  price: number;
  modules: Module[];
  sort_order: number;
  is_active: boolean;
}

const EMPTY_COURSE: DbCourse = {
  slug: "",
  name_sq: "",
  name_en: "",
  description_sq: "",
  description_en: "",
  category: "webdev",
  icon: "Code2",
  color: "cyan",
  duration: "",
  total_hours: 0,
  weeks: 6,
  price: 0,
  modules: [],
  sort_order: 0,
  is_active: true,
};

// ── Hardcoded → DB name map ───────────────────────────────────────────────────

const courseNames: Record<string, string> = {
  "web-development": "Web Development",
  "python-fullstack": "Python Fullstack",
  "javascript-mern": "JavaScript MERN",
  golang: "Go (Golang)",
  "dotnet-csharp": ".NET / C#",
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const INPUT_CLS =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

const CATEGORY_COLORS: Record<string, string> = {
  webdev: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  adults: "border-sky-500/30 bg-sky-500/10 text-sky-400",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ── Delete Confirm Dialog ─────────────────────────────────────────────────────

function DeleteDialog({
  courseName,
  onConfirm,
  onCancel,
}: {
  courseName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="mb-2 text-base font-semibold text-zinc-100">Delete course?</h2>
        <p className="mb-6 text-sm text-zinc-400">
          This will permanently delete{" "}
          <span className="font-medium text-zinc-200">{courseName}</span>. This cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Module Editor ─────────────────────────────────────────────────────────────

function ModuleEditor({
  modules,
  onChange,
}: {
  modules: Module[];
  onChange: (modules: Module[]) => void;
}) {
  const updateModule = (idx: number, patch: Partial<Module>) => {
    const next = modules.map((m, i) => (i === idx ? { ...m, ...patch } : m));
    onChange(next);
  };

  const removeModule = (idx: number) => {
    onChange(modules.filter((_, i) => i !== idx));
  };

  const addModule = () => {
    onChange([...modules, { name: "", hours: 0, topics: [] }]);
  };

  const moveModule = (idx: number, dir: -1 | 1) => {
    const next = [...modules];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const addTopic = (modIdx: number) => {
    const mod = modules[modIdx];
    updateModule(modIdx, { topics: [...mod.topics, ""] });
  };

  const updateTopic = (modIdx: number, topicIdx: number, value: string) => {
    const mod = modules[modIdx];
    const topics = mod.topics.map((t, i) => (i === topicIdx ? value : t));
    updateModule(modIdx, { topics });
  };

  const removeTopic = (modIdx: number, topicIdx: number) => {
    const mod = modules[modIdx];
    updateModule(modIdx, { topics: mod.topics.filter((_, i) => i !== topicIdx) });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Modules ({modules.length})
        </p>
        <Button variant="outline" size="xs" onClick={addModule}>
          + Add Module
        </Button>
      </div>

      {modules.length === 0 && (
        <p className="rounded-lg border border-dashed border-zinc-700 py-4 text-center text-xs text-zinc-500">
          No modules yet. Click &ldquo;Add Module&rdquo; to start.
        </p>
      )}

      <div className="space-y-3">
        {modules.map((mod, mIdx) => (
          <div
            key={mIdx}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-3"
          >
            {/* Module header */}
            <div className="mb-3 flex items-center gap-2">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => moveModule(mIdx, -1)}
                  disabled={mIdx === 0}
                  className="rounded px-1 text-zinc-500 hover:text-zinc-300 disabled:opacity-30"
                  title="Move up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveModule(mIdx, 1)}
                  disabled={mIdx === modules.length - 1}
                  className="rounded px-1 text-zinc-500 hover:text-zinc-300 disabled:opacity-30"
                  title="Move down"
                >
                  ▼
                </button>
              </div>

              <span className="shrink-0 text-xs font-semibold text-zinc-500">
                #{mIdx + 1}
              </span>

              <input
                type="text"
                value={mod.name}
                onChange={(e) => updateModule(mIdx, { name: e.target.value })}
                placeholder="Module name"
                className={`${INPUT_CLS} flex-1`}
              />

              <input
                type="number"
                value={mod.hours}
                onChange={(e) => updateModule(mIdx, { hours: Number(e.target.value) })}
                placeholder="h"
                className={`${INPUT_CLS} w-16 text-center`}
                title="Hours"
              />

              <button
                type="button"
                onClick={() => removeModule(mIdx)}
                className="shrink-0 rounded p-1 text-zinc-600 transition-colors hover:text-red-400"
                title="Remove module"
              >
                ✕
              </button>
            </div>

            {/* Topics */}
            <div className="space-y-1.5 pl-8">
              {mod.topics.map((topic, tIdx) => (
                <div key={tIdx} className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-600">·</span>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(mIdx, tIdx, e.target.value)}
                    placeholder="Topic description"
                    className={`${INPUT_CLS} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => removeTopic(mIdx, tIdx)}
                    className="shrink-0 rounded p-1 text-zinc-600 hover:text-red-400"
                    title="Remove topic"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addTopic(mIdx)}
                className="mt-1 text-xs text-zinc-500 hover:text-red-400 transition-colors"
              >
                + Add topic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Course Form ───────────────────────────────────────────────────────────────

function CourseForm({
  initial,
  isNew,
  onSave,
  onCancel,
  saving,
}: {
  initial: DbCourse;
  isNew: boolean;
  onSave: (course: DbCourse) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<DbCourse>(initial);
  const [slugManual, setSlugManual] = useState(!isNew);

  const set = <K extends keyof DbCourse>(key: K, value: DbCourse[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleNameEnChange = (val: string) => {
    set("name_en", val);
    if (!slugManual) {
      set("slug", slugify(val));
    }
  };

  const handleSlugChange = (val: string) => {
    setSlugManual(true);
    set("slug", val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <div className="rounded-xl border border-red-500/30 bg-zinc-900 p-5">
      <h2 className="mb-5 text-base font-semibold text-zinc-100">
        {isNew ? "New Course" : `Editing: ${form.name_en || form.slug}`}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: slug + sort_order + is_active */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_80px_80px]">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">
              Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              required
              placeholder="web-development"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Sort Order</label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) => set("sort_order", Number(e.target.value))}
              className={INPUT_CLS}
            />
          </div>
          <div className="flex flex-col justify-end pb-0.5">
            <label className="mb-1 block text-xs text-zinc-400">Active</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => set("is_active", e.target.checked)}
                className="h-4 w-4 accent-red-500 rounded"
              />
              <span className="text-sm text-zinc-300">{form.is_active ? "Yes" : "No"}</span>
            </label>
          </div>
        </div>

        {/* Row 2: name_en + name_sq */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">
              Name (EN) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name_en}
              onChange={(e) => handleNameEnChange(e.target.value)}
              required
              placeholder="Python Fullstack"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">
              Name (SQ) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.name_sq}
              onChange={(e) => set("name_sq", e.target.value)}
              required
              placeholder="Python Fullstack"
              className={INPUT_CLS}
            />
          </div>
        </div>

        {/* Row 3: description_en + description_sq */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Description (EN)</label>
            <textarea
              value={form.description_en ?? ""}
              onChange={(e) => set("description_en", e.target.value)}
              rows={3}
              placeholder="Short course description in English"
              className={`${INPUT_CLS} resize-y`}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Description (SQ)</label>
            <textarea
              value={form.description_sq ?? ""}
              onChange={(e) => set("description_sq", e.target.value)}
              rows={3}
              placeholder="Përshkrim i shkurtër i kursit në shqip"
              className={`${INPUT_CLS} resize-y`}
            />
          </div>
        </div>

        {/* Row 4: category + icon + color */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Category</label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value as DbCourse["category"])}
              className={INPUT_CLS}
            >
              <option value="webdev">webdev</option>
              <option value="adults">adults</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Icon</label>
            <select
              value={form.icon}
              onChange={(e) => set("icon", e.target.value)}
              className={INPUT_CLS}
            >
              <option value="Blocks">Blocks</option>
              <option value="Rocket">Rocket</option>
              <option value="BrainCircuit">BrainCircuit</option>
              <option value="Code2">Code2</option>
              <option value="Server">Server</option>
              <option value="Layers">Layers</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Color</label>
            <select
              value={form.color}
              onChange={(e) => set("color", e.target.value as DbCourse["color"])}
              className={INPUT_CLS}
            >
              <option value="cyan">cyan</option>
              <option value="purple">purple</option>
              <option value="pink">pink</option>
            </select>
          </div>
        </div>

        {/* Row 5: price + total_hours + weeks */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Price (€)</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => set("price", Number(e.target.value))}
              min={0}
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Total Hours</label>
            <input
              type="number"
              value={form.total_hours}
              onChange={(e) => set("total_hours", Number(e.target.value))}
              min={0}
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Weeks</label>
            <input
              type="number"
              value={form.weeks}
              onChange={(e) => set("weeks", Number(e.target.value))}
              min={1}
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-400">Duration label</label>
            <input
              type="text"
              value={form.duration ?? ""}
              onChange={(e) => set("duration", e.target.value)}
              placeholder="2 months"
              className={INPUT_CLS}
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-zinc-800" />

        {/* Modules */}
        <ModuleEditor
          modules={form.modules}
          onChange={(modules) => set("modules", modules)}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-800 pt-4">
          <Button variant="outline" size="sm" type="button" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            type="submit"
            disabled={saving}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            {saving ? "Saving…" : isNew ? "Create Course" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AdminCoursesPage() {
  const [dbCourses, setDbCourses] = useState<DbCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingCourse, setEditingCourse] = useState<DbCourse | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DbCourse | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load");
      const json = await res.json();
      setDbCourses(json.items ?? []);
    } catch {
      setDbCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleToggleActive = async (course: DbCourse) => {
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/courses", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...course, is_active: !course.is_active }),
      });
      if (!res.ok) throw new Error("Failed");
      setDbCourses((prev) =>
        prev.map((c) =>
          c.slug === course.slug ? { ...c, is_active: !c.is_active } : c
        )
      );
    } catch {
      showToast("Failed to toggle active status.");
    }
  };

  const handleSave = async (formData: DbCourse) => {
    setSaving(true);
    try {
      const isNew = !editingCourse;
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/courses", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Save failed");
      }
      showToast(isNew ? "Course created." : "Course updated.");
      setCreating(false);
      setEditingCourse(null);
      await loadCourses();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (course: DbCourse) => {
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ slug: course.slug, id: course.id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Course deleted.");
      setDeleteTarget(null);
      await loadCourses();
    } catch {
      showToast("Failed to delete course.");
      setDeleteTarget(null);
    }
  };

  const handleSeedFromHardcoded = async () => {
    if (
      !window.confirm(
        `Seed ${hardcodedCourses.length} courses from hardcoded data? Existing courses with the same slug may be overwritten.`
      )
    )
      return;

    setSeeding(true);
    const seedToken = sessionStorage.getItem("lika-admin-auth");
    let count = 0;
    for (let idx = 0; idx < hardcodedCourses.length; idx++) {
      const course = hardcodedCourses[idx];
      const payload: DbCourse = {
        slug: course.slug,
        category: course.category,
        icon: course.icon,
        color: course.color,
        duration: course.duration,
        total_hours: course.totalHours,
        weeks: course.weeks,
        price: course.price ?? 0,
        name_sq: courseNames[course.slug] || course.slug,
        name_en: courseNames[course.slug] || course.slug,
        description_sq: "",
        description_en: "",
        modules: course.modules,
        sort_order: idx,
        is_active: true,
      };
      try {
        const res = await fetch("/api/admin/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${seedToken}` },
          body: JSON.stringify(payload),
        });
        if (res.ok) count++;
      } catch {
        // continue
      }
    }
    setSeeding(false);
    showToast(`Seeded ${count} of ${hardcodedCourses.length} courses.`);
    await loadCourses();
  };

  const handleEditClick = (course: DbCourse) => {
    setCreating(false);
    setEditingCourse(course);
    setTimeout(() => {
      document.getElementById("course-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleAddClick = () => {
    setEditingCourse(null);
    setCreating(true);
    setTimeout(() => {
      document.getElementById("course-form-anchor")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleCancelForm = () => {
    setEditingCourse(null);
    setCreating(false);
  };

  const showForm = creating || editingCourse !== null;
  const isEmpty = !loading && dbCourses.length === 0;

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-zinc-100 shadow-2xl">
          {toastMsg}
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteDialog
          courseName={deleteTarget.name_en || deleteTarget.slug}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">

        {/* Back + header */}
        <div className="mb-4 flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Admin
          </Link>
          <h1 className="text-xl font-semibold text-zinc-100">Courses CMS</h1>
          {!loading && (
            <span className="ml-1 rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
              {dbCourses.length} in DB
            </span>
          )}
          <div className="ml-auto">
            <Button
              variant="default"
              size="sm"
              onClick={handleAddClick}
              disabled={showForm}
              className="bg-red-600 hover:bg-red-500 text-white"
            >
              + Add Course
            </Button>
          </div>
        </div>

        {/* Nav */}
        <nav className="mb-8 flex flex-wrap gap-2">
          <Link href="/admin" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Dashboard</Link>
          <Link href="/admin/courses" className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100">Courses</Link>
          <Link href="/admin/blog" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Blog</Link>
          <Link href="/admin/schedule" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Schedule</Link>
          <Link href="/admin/analytics" className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors">Analytics</Link>
        </nav>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-300" />
            <span className="ml-3 text-sm text-zinc-500">Loading courses…</span>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && (
          <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 px-6 py-10 text-center">
            <p className="mb-1 text-sm text-zinc-300 font-medium">
              No courses in database.
            </p>
            <p className="mb-5 text-xs text-zinc-500">
              Using hardcoded data. Seed the database to start managing courses here.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedFromHardcoded}
              disabled={seeding}
            >
              {seeding ? "Seeding…" : `Seed from hardcoded (${hardcodedCourses.length} courses)`}
            </Button>
          </div>
        )}

        {/* Courses table */}
        {!loading && dbCourses.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-zinc-800 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Slug</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Hours</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Modules</th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-zinc-500">Active</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {dbCourses.map((course) => {
                  const isEditing = editingCourse?.slug === course.slug;
                  return (
                    <tr
                      key={course.slug}
                      className={[
                        "transition-colors",
                        isEditing
                          ? "bg-red-950/30"
                          : "bg-zinc-900/50 hover:bg-zinc-900",
                      ].join(" ")}
                    >
                      <td className="px-4 py-3 font-medium text-zinc-200">
                        {course.name_en}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-500">
                        {course.slug}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={[
                            "rounded-md border px-2 py-0.5 text-xs font-medium",
                            CATEGORY_COLORS[course.category] ?? "border-zinc-700 bg-zinc-800 text-zinc-400",
                          ].join(" ")}
                        >
                          {course.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-300">
                        €{course.price}
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-300">
                        {course.total_hours}h
                      </td>
                      <td className="px-4 py-3 text-right text-zinc-400">
                        {course.modules.length}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleToggleActive(course)}
                          title={course.is_active ? "Click to deactivate" : "Click to activate"}
                          className={[
                            "inline-flex h-5 w-9 rounded-full transition-colors",
                            course.is_active ? "bg-red-600" : "bg-zinc-700",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "mt-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform",
                              course.is_active ? "translate-x-[18px]" : "translate-x-0.5",
                            ].join(" ")}
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(course)}
                            className="rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(course)}
                            className="rounded px-2 py-1 text-xs text-zinc-500 hover:bg-red-950/40 hover:text-red-400 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Seed button when DB has courses */}
        {!loading && dbCourses.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleSeedFromHardcoded}
              disabled={seeding}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors disabled:opacity-40"
            >
              {seeding ? "Seeding…" : "Re-seed from hardcoded data"}
            </button>
          </div>
        )}

        {/* Form anchor */}
        <div id="course-form-anchor" />

        {/* Edit / Create form */}
        {showForm && (
          <CourseForm
            key={editingCourse?.slug ?? "new"}
            initial={editingCourse ?? { ...EMPTY_COURSE, sort_order: dbCourses.length }}
            isNew={creating}
            onSave={handleSave}
            onCancel={handleCancelForm}
            saving={saving}
          />
        )}
      </div>
    </div>
  );
}
