"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-posts";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: number;
  slug: string;
  category: "tutorials" | "career" | "news" | "tips";
  date: string;
  read_time: number;
  title_sq: string;
  title_en: string;
  excerpt_sq: string;
  excerpt_en: string;
  content_sq: string;
  content_en: string;
  is_published: boolean;
}

type PostDraft = Omit<Post, "id"> & { id?: number };

const EMPTY_DRAFT: PostDraft = {
  slug: "",
  category: "tutorials",
  date: new Date().toISOString().slice(0, 10),
  read_time: 5,
  title_sq: "",
  title_en: "",
  excerpt_sq: "",
  excerpt_en: "",
  content_sq: "",
  content_en: "",
  is_published: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INPUT =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

const SELECT =
  "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CATEGORY_STYLES: Record<string, string> = {
  tutorials: "border-sky-500/30 bg-sky-500/10 text-sky-400",
  career: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  news: "border-red-500/30 bg-red-500/10 text-red-400",
  tips: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

// ─── Nav ──────────────────────────────────────────────────────────────────────

function AdminNav() {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/courses", label: "Courses" },
    { href: "/admin/blog", label: "Blog", active: true },
    { href: "/admin/schedule", label: "Schedule" },
    { href: "/admin/analytics", label: "Analytics" },
  ];
  return (
    <nav className="mb-8 flex items-center gap-1 border-b border-zinc-800 pb-4">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={[
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            l.active
              ? "bg-red-500/20 text-red-300"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
          ].join(" ")}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // null = hidden, "create" or post id = open
  const [editing, setEditing] = useState<"create" | number | null>(null);
  const [draft, setDraft] = useState<PostDraft>(EMPTY_DRAFT);
  const [slugManual, setSlugManual] = useState(false);

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/blog", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setPosts(data.items || []);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ── Draft helpers ──────────────────────────────────────────────────────────

  function openCreate() {
    setDraft({ ...EMPTY_DRAFT });
    setSlugManual(false);
    setEditing("create");
  }

  function openEdit(post: Post) {
    setDraft({
      id: post.id,
      slug: post.slug,
      category: post.category,
      date: post.date,
      read_time: post.read_time,
      title_sq: post.title_sq,
      title_en: post.title_en,
      excerpt_sq: post.excerpt_sq,
      excerpt_en: post.excerpt_en,
      content_sq: post.content_sq,
      content_en: post.content_en,
      is_published: post.is_published,
    });
    setSlugManual(true);
    setEditing(post.id);
  }

  function cancelEdit() {
    setEditing(null);
    setDraft(EMPTY_DRAFT);
  }

  function setField<K extends keyof PostDraft>(key: K, value: PostDraft[K]) {
    setDraft((d) => {
      const updated = { ...d, [key]: value };
      // Auto-slug from EN title when creating and slug not manually set
      if (key === "title_en" && !slugManual && editing === "create") {
        updated.slug = slugify(value as string);
      }
      return updated;
    });
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const isNew = editing === "create";
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/blog", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }
      await fetchPosts();
      cancelEdit();
    } catch (e) {
      setError(String(e));
    } finally {
      setSaving(false);
    }
  }

  // ── Delete ─────────────────────────────────────────────────────────────────

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title_en}"? This cannot be undone.`)) return;
    setError(null);
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: post.id }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchPosts();
      if (editing === post.id) cancelEdit();
    } catch (e) {
      setError(String(e));
    }
  }

  // ── Toggle publish ─────────────────────────────────────────────────────────

  async function handleTogglePublish(post: Post) {
    setError(null);
    try {
      const token = sessionStorage.getItem("lika-admin-auth");
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...post, is_published: !post.is_published }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchPosts();
    } catch (e) {
      setError(String(e));
    }
  }

  // ── Seed ───────────────────────────────────────────────────────────────────

  async function handleSeed() {
    if (
      !confirm(
        `Seed ${blogPosts.length} posts from hardcoded data? Existing posts with the same slug may be overwritten.`
      )
    )
      return;
    setSeeding(true);
    setError(null);
    try {
      const seedToken = sessionStorage.getItem("lika-admin-auth");
      for (const post of blogPosts) {
        await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${seedToken}` },
          body: JSON.stringify({
            slug: post.slug,
            category: post.category,
            date: post.date,
            read_time: post.readTime,
            title_sq: post.title.sq,
            title_en: post.title.en,
            excerpt_sq: post.excerpt.sq,
            excerpt_en: post.excerpt.en,
            content_sq: post.content.sq,
            content_en: post.content.en,
            is_published: true,
          }),
        });
      }
      await fetchPosts();
    } catch (e) {
      setError(String(e));
    } finally {
      setSeeding(false);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <AdminNav />

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold text-zinc-100">Blog Posts</h1>
          <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400">
            {loading ? "…" : `${posts.length} posts`}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {posts.length === 0 && !loading && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSeed}
                disabled={seeding}
                className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
              >
                {seeding ? "Seeding…" : "Seed from hardcoded"}
              </Button>
            )}
            <Button
              size="sm"
              onClick={openCreate}
              disabled={editing === "create"}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              + Add Post
            </Button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Post list table */}
        <Card className="mb-6 border-zinc-800 bg-zinc-900/50">
          <CardContent className="p-0">
            {loading ? (
              <div className="px-4 py-10 text-center text-sm text-zinc-500">
                Loading…
              </div>
            ) : posts.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-zinc-500">
                No posts yet. Seed from hardcoded data or add a post.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900">
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Title (EN)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Slug
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Read
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        className={[
                          "transition-colors",
                          editing === post.id
                            ? "bg-red-500/5"
                            : "bg-zinc-900/50 hover:bg-zinc-900",
                        ].join(" ")}
                      >
                        <td className="max-w-[220px] truncate px-4 py-3 font-medium text-zinc-200">
                          {post.title_en}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-zinc-400">
                          {post.slug}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={[
                              "rounded-md border px-2 py-0.5 text-xs font-medium",
                              CATEGORY_STYLES[post.category] ??
                                "border-zinc-600 bg-zinc-700 text-zinc-300",
                            ].join(" ")}
                          >
                            {post.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-zinc-400">
                          {post.date}
                        </td>
                        <td className="px-4 py-3 text-right text-xs text-zinc-400">
                          {post.read_time} min
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant={post.is_published ? "default" : "outline"}
                            className={
                              post.is_published
                                ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                                : "border-zinc-600 bg-transparent text-zinc-500"
                            }
                          >
                            {post.is_published ? "Published" : "Draft"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => openEdit(post)}
                              className="text-zinc-400 hover:text-zinc-100"
                            >
                              Edit
                            </Button>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => handleTogglePublish(post)}
                              className={
                                post.is_published
                                  ? "text-amber-400 hover:text-amber-200"
                                  : "text-emerald-400 hover:text-emerald-200"
                              }
                            >
                              {post.is_published ? "Unpublish" : "Publish"}
                            </Button>
                            <Button
                              size="xs"
                              variant="ghost"
                              onClick={() => handleDelete(post)}
                              className="text-red-400 hover:text-red-200"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Seed button when posts exist too */}
        {posts.length > 0 && !loading && (
          <div className="mb-6 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={seeding}
              className="border-zinc-700 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            >
              {seeding ? "Seeding…" : "Re-seed from hardcoded"}
            </Button>
          </div>
        )}

        {/* ── Edit / Create form ───────────────────────────────────────────── */}
        {editing !== null && (
          <Card className="border-zinc-700 bg-zinc-900">
            <CardContent className="px-6 py-6">
              <h2 className="mb-6 text-base font-semibold text-zinc-100">
                {editing === "create" ? "New Post" : "Edit Post"}
              </h2>

              <div className="space-y-6">
                {/* Row: slug + category */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={draft.slug}
                      onChange={(e) => {
                        setSlugManual(true);
                        setField("slug", e.target.value);
                      }}
                      placeholder="my-post-slug"
                      className={INPUT}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Category
                    </label>
                    <select
                      value={draft.category}
                      onChange={(e) =>
                        setField(
                          "category",
                          e.target.value as PostDraft["category"]
                        )
                      }
                      className={SELECT}
                    >
                      <option value="tutorials">tutorials</option>
                      <option value="career">career</option>
                      <option value="news">news</option>
                      <option value="tips">tips</option>
                    </select>
                  </div>
                </div>

                {/* Row: date + read_time + published */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Date
                    </label>
                    <input
                      type="date"
                      value={draft.date}
                      onChange={(e) => setField("date", e.target.value)}
                      className={INPUT}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Read time (min)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={draft.read_time}
                      onChange={(e) =>
                        setField("read_time", Number(e.target.value))
                      }
                      className={INPUT}
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={draft.is_published}
                        onChange={(e) =>
                          setField("is_published", e.target.checked)
                        }
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 accent-red-500"
                      />
                      Published
                    </label>
                  </div>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Title (Albanian)
                    </label>
                    <input
                      type="text"
                      value={draft.title_sq}
                      onChange={(e) => setField("title_sq", e.target.value)}
                      placeholder="Titulli shqip…"
                      className={INPUT}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Title (English)
                    </label>
                    <input
                      type="text"
                      value={draft.title_en}
                      onChange={(e) => setField("title_en", e.target.value)}
                      placeholder="English title…"
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Excerpts */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Excerpt (Albanian)
                    </label>
                    <textarea
                      rows={2}
                      value={draft.excerpt_sq}
                      onChange={(e) => setField("excerpt_sq", e.target.value)}
                      placeholder="Përshkrim i shkurtër shqip…"
                      className={INPUT}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Excerpt (English)
                    </label>
                    <textarea
                      rows={2}
                      value={draft.excerpt_en}
                      onChange={(e) => setField("excerpt_en", e.target.value)}
                      placeholder="Short English description…"
                      className={INPUT}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Content (Albanian) — Markdown
                  </label>
                  <textarea
                    rows={10}
                    value={draft.content_sq}
                    onChange={(e) => setField("content_sq", e.target.value)}
                    placeholder="## Titulli&#10;&#10;Përmbajtja shqip…"
                    className={`${INPUT} font-mono leading-relaxed`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Content (English) — Markdown
                  </label>
                  <textarea
                    rows={10}
                    value={draft.content_en}
                    onChange={(e) => setField("content_en", e.target.value)}
                    placeholder="## Heading&#10;&#10;English content…"
                    className={`${INPUT} font-mono leading-relaxed`}
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-red-600 text-white hover:bg-red-500"
                  >
                    {saving ? "Saving…" : editing === "create" ? "Create Post" : "Save Changes"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={cancelEdit}
                    disabled={saving}
                    className="text-zinc-400 hover:text-zinc-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
