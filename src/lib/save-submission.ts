"use client";

import { addSubmission } from "@/lib/admin-store";

export function saveContactSubmission(data: { name: string; email: string; phone: string; message: string }) {
  addSubmission({ type: "contact", data, timestamp: new Date().toISOString() });
}

export function saveEnrollmentSubmission(data: Record<string, string>) {
  addSubmission({ type: "enrollment", data, timestamp: new Date().toISOString() });
}

export function saveNewsletterSubmission(data: { email: string }) {
  addSubmission({ type: "newsletter", data, timestamp: new Date().toISOString() });
}

export function saveReferralSubmission(data: { yourName: string; yourEmail: string; friendName: string; friendEmail: string }) {
  addSubmission({ type: "referral", data, timestamp: new Date().toISOString() });
}
