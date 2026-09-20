// Simple in-memory rate limiter
// For production, use Redis (Upstash) instead

const hits = new Map<string, { count: number; resetAt: number }>();

// Clean old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of hits) {
    if (now > value.resetAt) hits.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Check if a request is within rate limit
 * @returns true if allowed, false if rate limited
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const record = hits.get(key);

  if (!record || now > record.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  record.count++;
  return record.count <= maxRequests;
}
