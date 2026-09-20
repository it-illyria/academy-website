// Safe UUID generation — falls back for browsers without crypto.randomUUID
function generateId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Types for admin data
export interface Submission {
  id: string;
  type: "enrollment" | "contact" | "newsletter" | "referral";
  data: Record<string, string>;
  timestamp: string;
  status: "new" | "contacted" | "resolved";
}

// Client-side localStorage helpers
export function getSubmissions(): Submission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("lika-admin-submissions");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSubmission(sub: Omit<Submission, "id" | "status">): void {
  if (typeof window === "undefined") return;
  try {
    const subs = getSubmissions();
    subs.unshift({
      ...sub,
      id: generateId(),
      status: "new",
    });
    localStorage.setItem("lika-admin-submissions", JSON.stringify(subs));
  } catch { /* private mode or storage full */ }
}

export function updateSubmissionStatus(id: string, status: Submission["status"]): void {
  if (typeof window === "undefined") return;
  try {
    const subs = getSubmissions();
    const idx = subs.findIndex((s) => s.id === id);
    if (idx !== -1) {
      subs[idx].status = status;
      localStorage.setItem("lika-admin-submissions", JSON.stringify(subs));
    }
  } catch { /* private mode or storage full */ }
}

export function deleteSubmission(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const subs = getSubmissions().filter((s) => s.id !== id);
    localStorage.setItem("lika-admin-submissions", JSON.stringify(subs));
  } catch { /* private mode or storage full */ }
}

export function getStats() {
  const subs = getSubmissions();
  return {
    total: subs.length,
    enrollments: subs.filter((s) => s.type === "enrollment").length,
    contacts: subs.filter((s) => s.type === "contact").length,
    newsletter: subs.filter((s) => s.type === "newsletter").length,
    referrals: subs.filter((s) => s.type === "referral").length,
    new: subs.filter((s) => s.status === "new").length,
  };
}
