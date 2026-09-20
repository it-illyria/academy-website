import { type NextRequest } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export function verifyAdminRequest(request: NextRequest): boolean {
  // Check Authorization header (Bearer token = password for now)
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !ADMIN_PASSWORD) return false;

  const token = authHeader.replace("Bearer ", "");
  if (!token || !ADMIN_PASSWORD) return false;

  // crypto.timingSafeEqual throws on a buffer-length mismatch, so we check
  // lengths explicitly first rather than relying on the catch block below to
  // turn that throw into `false` — a future refactor could drop the
  // try/catch and silently reintroduce a crash-based timing oracle. The
  // try/catch stays as defense in depth.
  if (token.length !== ADMIN_PASSWORD.length) return false;

  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(ADMIN_PASSWORD)
    );
  } catch {
    return false;
  }
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
