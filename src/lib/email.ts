import { Resend } from "resend";

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Use custom domain when available, fallback to Resend's testing domain
// IMPORTANT: Change to your verified domain for production!
// After verifying likaacademy.al in Resend dashboard, change to:
// "Lika Academy <noreply@likaacademy.al>"
const FROM_EMAIL =
  process.env.EMAIL_FROM || "Lika Academy <onboarding@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@likaacademy.al";
const REPLY_TO = process.env.REPLY_TO_EMAIL || "info@likaacademy.al";

export async function sendEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email] No RESEND_API_KEY set, skipping email:", subject);
    return { success: true };
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: replyTo || REPLY_TO,
      subject: `[Lika Academy] ${subject}`,
      html: wrapInTemplate(html),
      headers: {
        "X-Entity-Ref-ID": `lika-${Date.now()}`,
      },
    });

    const logEntry = {
      to: ADMIN_EMAIL,
      subject,
      status: "sent",
      timestamp: new Date().toISOString(),
    };
    console.log("[Email Log]", JSON.stringify(logEntry));
    return { success: true };
  } catch (error) {
    const logEntry = {
      to: ADMIN_EMAIL,
      subject,
      status: "failed",
      error: String(error),
      timestamp: new Date().toISOString(),
    };
    console.log("[Email Log]", JSON.stringify(logEntry));
    console.error("[Email] Failed to send:", error);
    return { success: false, error };
  }
}

// Professional email template wrapper — reduces spam score
function wrapInTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lika Academy Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8f1414 0%, #cc2827 100%); padding: 24px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">
                      &lt;/&gt; Lika Academy
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #fafafe; border-top: 1px solid #eeeef2;">
              <p style="margin: 0; font-size: 11px; color: #9ca3af; line-height: 1.5;">
                This is an automated notification from <strong>Lika Academy</strong>.<br>
                Kamëz, Tirana, Albania &bull; <a href="https://likaacademy.al" style="color: #cc2827; text-decoration: none;">likaacademy.al</a><br>
                <a href="mailto:info@likaacademy.al" style="color: #cc2827; text-decoration: none;">info@likaacademy.al</a>
              </p>
            </td>
          </tr>
        </table>
        <!-- Unsubscribe / anti-spam text -->
        <p style="margin-top: 16px; font-size: 10px; color: #b0b0b8; text-align: center;">
          You received this email because a form was submitted on likaacademy.al.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function enrollmentEmailHtml(data: {
  courseSlug: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  experience: string;
  format: string;
  message: string;
}) {
  return `
    <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 18px;">🎓 New Enrollment Application</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555; width: 120px;">Course</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.courseSlug)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Name</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.fullName)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Email</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;"><a href="mailto:${escapeHtml(data.email)}" style="color: #cc2827;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Phone</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.phone)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">DOB</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.dob)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Experience</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.experience)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Format</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.format)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Message</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.message) || "—"}</td></tr>
    </table>
  `;
}

export function contactEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  return `
    <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 18px;">📩 New Contact Message</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555; width: 120px;">Name</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Email</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;"><a href="mailto:${escapeHtml(data.email)}" style="color: #cc2827;">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Phone</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.phone) || "—"}</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Message</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.message)}</td></tr>
    </table>
    <p style="margin-top: 16px; padding: 12px; background: #f0f0ff; border-radius: 8px; font-size: 13px; color: #555;">
      💡 <strong>Quick reply:</strong> Hit reply to respond directly to <a href="mailto:${escapeHtml(data.email)}" style="color: #cc2827;">${escapeHtml(data.email)}</a>
    </p>
  `;
}

export function newsletterEmailHtml(email: string) {
  return `
    <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 18px;">📬 New Newsletter Subscriber</h2>
    <p style="color: #333; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color: #cc2827;">${escapeHtml(email)}</a></p>
    <p style="margin-top: 12px; padding: 12px; background: #f0fff4; border-radius: 8px; font-size: 13px; color: #555;">
      ✅ Add this email to your newsletter mailing list.
    </p>
  `;
}

export function referralEmailHtml(data: {
  yourName: string;
  yourEmail: string;
  friendName: string;
  friendEmail: string;
}) {
  return `
    <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 18px;">🎁 New Referral Invitation</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555; width: 120px;">From</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.yourName)} (<a href="mailto:${escapeHtml(data.yourEmail)}" style="color: #cc2827;">${escapeHtml(data.yourEmail)}</a>)</td></tr>
      <tr><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; font-weight: 600; color: #555;">Invited Friend</td><td style="padding: 10px 8px; border-bottom: 1px solid #eeeef2; color: #1a1a2e;">${escapeHtml(data.friendName)} (<a href="mailto:${escapeHtml(data.friendEmail)}" style="color: #cc2827;">${escapeHtml(data.friendEmail)}</a>)</td></tr>
    </table>
    <p style="margin-top: 16px; padding: 12px; background: #fff8f0; border-radius: 8px; font-size: 13px; color: #555;">
      🎯 <strong>Action:</strong> Contact the friend and offer them the 15% referral discount.
    </p>
  `;
}
