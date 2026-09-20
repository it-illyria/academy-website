"use server";

import {
  sendEmail,
  contactEmailHtml,
  enrollmentEmailHtml,
  newsletterEmailHtml,
  referralEmailHtml,
} from "@/lib/email";
import { appendToSheet } from "@/lib/sheets";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";
import { checkRateLimit } from "./rate-limit";
import { courses } from "@/lib/courses";

// Input validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  if (!phone) return true;
  return /^\+?[0-9\s-]{7,20}$/.test(phone);
}

function sanitizeInput(input: string, maxLength = 500): string {
  if (!input) return "";
  return input.trim().slice(0, maxLength);
}

// Bilingual messages
const msg = {
  rate_limit: {
    en: "Too many requests. Please try again later.",
    sq: "Shumë kërkesa. Ju lutemi provoni përsëri më vonë.",
  },
  name_email_required: {
    en: "Name and email are required.",
    sq: "Emri dhe email-i janë të detyrueshëm.",
  },
  invalid_email: {
    en: "Invalid email format.",
    sq: "Formati i email-it nuk është i vlefshëm.",
  },
  invalid_phone: {
    en: "Invalid phone number.",
    sq: "Numri i telefonit nuk është i vlefshëm.",
  },
  required_fields: {
    en: "Required fields are missing.",
    sq: "Fushat e detyrueshme mungojnë.",
  },
  invalid_course: {
    en: "Invalid course selected.",
    sq: "Kursi i zgjedhur nuk është i vlefshëm.",
  },
  email_required: {
    en: "Email is required.",
    sq: "Email-i është i detyrueshëm.",
  },
  both_emails: {
    en: "Both emails are required.",
    sq: "Të dy email-at janë të detyrueshëm.",
  },
  invalid_sender_email: {
    en: "Invalid sender email format.",
    sq: "Formati i email-it tuaj nuk është i vlefshëm.",
  },
  invalid_friend_email: {
    en: "Invalid friend email format.",
    sq: "Formati i email-it të mikut nuk është i vlefshëm.",
  },
  contact_success: {
    en: "Message sent successfully!",
    sq: "Mesazhi u dërgua me sukses!",
  },
  enroll_success: {
    en: "Application submitted successfully!",
    sq: "Aplikimi u dërgua me sukses!",
  },
  newsletter_success: {
    en: "Subscribed successfully!",
    sq: "U regjistruat me sukses!",
  },
  referral_success: {
    en: "Invitation sent successfully!",
    sq: "Ftesa u dërgua me sukses!",
  },
};

type Lang = "en" | "sq";

function t(key: keyof typeof msg, locale: string): string {
  const lang: Lang = locale === "sq" ? "sq" : "en";
  return msg[key][lang];
}

function getLocale(formData: FormData): string {
  return (formData.get("locale") as string) || "en";
}

export interface FormResult {
  success: boolean;
  message: string;
}

// Shared rate-limit guard: looks up the caller's IP from request headers and
// checks it against the given key/limit. Returns a ready-to-return
// FormResult when the caller should be blocked, or null when it's fine to
// proceed — same rate-limit behavior every action had before (5/hr for
// contact + enroll, 3/hr for newsletter + referral, keyed by `${key}-${ip}`).
async function rateLimitGuard(
  key: string,
  max: number,
  locale: string
): Promise<FormResult | null> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(`${key}-${ip}`, max, 60 * 60 * 1000)) {
    return { success: false, message: t("rate_limit", locale) };
  }
  return null;
}

type SubmissionType = "contact" | "enrollment" | "newsletter" | "referral";

// Fires the 3 non-blocking persistence writes every form submission makes:
// email notification, Google Sheets backup, and the Supabase submissions
// table. Intentionally NOT awaited by callers — each write is
// fire-and-forget with `.catch(console.error)` / error logging, exactly as
// before the refactor, so a slow or failing integration never blocks the
// user-facing response.
function persistSubmission(params: {
  type: SubmissionType;
  data: Record<string, string>;
  email: { subject: string; html: string; replyTo?: string };
  sheet: { sheet: "enrollments" | "contacts" | "newsletter" | "referrals"; row: Record<string, string> };
}) {
  sendEmail({
    subject: params.email.subject,
    html: params.email.html,
    replyTo: params.email.replyTo,
  }).catch(console.error);

  appendToSheet(params.sheet).catch(console.error);

  supabase
    .from("submissions")
    .insert({
      type: params.type,
      data: params.data,
      status: "new",
    })
    .then(({ error }) => {
      if (error) console.error("[Supabase]", error);
    });
}

export async function submitContactForm(formData: FormData): Promise<FormResult> {
  const locale = getLocale(formData);
  const rateLimited = await rateLimitGuard("contact", 5, locale);
  if (rateLimited) return rateLimited;

  const name = sanitizeInput(formData.get("name") as string, 100);
  const email = sanitizeInput(formData.get("email") as string, 200);
  const phone = sanitizeInput(formData.get("phone") as string, 20);
  const message = sanitizeInput(formData.get("message") as string, 2000);

  if (!name || !email) return { success: false, message: t("name_email_required", locale) };
  if (!isValidEmail(email)) return { success: false, message: t("invalid_email", locale) };
  if (phone && !isValidPhone(phone)) return { success: false, message: t("invalid_phone", locale) };

  console.log("[Contact Form]", { name, email, phone, message });

  persistSubmission({
    type: "contact",
    data: { name, email, phone, message },
    email: {
      subject: `New Contact Message from ${name}`,
      html: contactEmailHtml({ name, email, phone, message }),
      replyTo: email,
    },
    sheet: { sheet: "contacts", row: { name, email, phone, message } },
  });

  return { success: true, message: t("contact_success", locale) };
}

export async function submitEnrollment(data: {
  courseSlug: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  experience: string;
  format: string;
  message: string;
  locale?: string;
}): Promise<FormResult> {
  const locale = data.locale || "en";
  const rateLimited = await rateLimitGuard("enroll", 5, locale);
  if (rateLimited) return rateLimited;

  const courseSlug = sanitizeInput(data.courseSlug, 100);
  const fullName = sanitizeInput(data.fullName, 100);
  const email = sanitizeInput(data.email, 200);
  const phone = sanitizeInput(data.phone, 20);
  const dob = sanitizeInput(data.dob, 20);
  const experience = sanitizeInput(data.experience, 100);
  const format = sanitizeInput(data.format, 100);
  const message = sanitizeInput(data.message, 2000);

  if (!courseSlug || !fullName || !email) {
    return { success: false, message: t("required_fields", locale) };
  }

  const validSlugs = courses.map((c) => c.slug);
  if (!validSlugs.includes(courseSlug)) {
    return { success: false, message: t("invalid_course", locale) };
  }

  if (!isValidEmail(email)) return { success: false, message: t("invalid_email", locale) };
  if (phone && !isValidPhone(phone)) return { success: false, message: t("invalid_phone", locale) };

  const sanitized = { courseSlug, fullName, email, phone, dob, experience, format, message };

  console.log("[Enrollment]", sanitized);

  persistSubmission({
    type: "enrollment",
    data: { ...sanitized },
    email: {
      subject: `New Enrollment Application — ${courseSlug} — ${fullName}`,
      html: enrollmentEmailHtml(sanitized),
    },
    sheet: { sheet: "enrollments", row: { ...sanitized } },
  });

  return { success: true, message: t("enroll_success", locale) };
}

export async function submitNewsletter(formData: FormData): Promise<FormResult> {
  const locale = getLocale(formData);
  const rateLimited = await rateLimitGuard("newsletter", 3, locale);
  if (rateLimited) return rateLimited;

  const email = sanitizeInput(formData.get("email") as string, 200);

  if (!email) {
    return { success: false, message: t("email_required", locale) };
  }
  if (!isValidEmail(email)) return { success: false, message: t("invalid_email", locale) };

  console.log("[Newsletter]", { email });

  persistSubmission({
    type: "newsletter",
    data: { email },
    email: {
      subject: `New Newsletter Subscriber — ${email}`,
      html: newsletterEmailHtml(email),
    },
    sheet: { sheet: "newsletter", row: { email } },
  });

  return { success: true, message: t("newsletter_success", locale) };
}

export async function submitReferral(formData: FormData): Promise<FormResult> {
  const locale = getLocale(formData);
  const rateLimited = await rateLimitGuard("referral", 3, locale);
  if (rateLimited) return rateLimited;

  const yourName = sanitizeInput(formData.get("your_name") as string, 100);
  const yourEmail = sanitizeInput(formData.get("your_email") as string, 200);
  const friendName = sanitizeInput(formData.get("friend_name") as string, 100);
  const friendEmail = sanitizeInput(formData.get("friend_email") as string, 200);

  if (!yourEmail || !friendEmail) {
    return { success: false, message: t("both_emails", locale) };
  }
  if (!isValidEmail(yourEmail)) return { success: false, message: t("invalid_sender_email", locale) };
  if (!isValidEmail(friendEmail)) return { success: false, message: t("invalid_friend_email", locale) };

  console.log("[Referral]", { yourName, yourEmail, friendName, friendEmail });

  persistSubmission({
    type: "referral",
    data: { yourName, yourEmail, friendName, friendEmail },
    email: {
      subject: `New Referral from ${yourName || yourEmail} → ${friendName || friendEmail}`,
      html: referralEmailHtml({ yourName, yourEmail, friendName, friendEmail }),
    },
    sheet: { sheet: "referrals", row: { yourName, yourEmail, friendName, friendEmail } },
  });

  return { success: true, message: t("referral_success", locale) };
}
