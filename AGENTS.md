<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Lika Academy Development Standards

## Quality Philosophy

**Lika Academy is a production-grade learning platform, not an MVP.**

We deliver a trustworthy, polished coding academy website for Albanian and Kosovar students (ages 7+) and their parents. Shortcuts, "good enough for now" solutions, and deferred quality are not acceptable. Every feature must be production-ready when marked complete. This platform represents Simi's reputation and the future of tech education in Kamëz/Tirana — trust is earned through reliability, transparency, and polish.

## Non-Negotiable Standards

### Content Quality

- Every public-facing string MUST exist in both `messages/sq.json` AND `messages/en.json` with 100% key parity
- Pricing, durations, schedule info, and course details MUST be consistent across ALL files (courses.ts, chatbot-data.ts, blog-posts.ts, terms-page.tsx, FAQ, metadata)
- No hardcoded English in Albanian contexts and vice versa
- No placeholder text shipped to production — either populate or hide

### Code Quality

- TypeScript strict mode, Pydantic-style input validation in server actions
- Every form submission MUST: validate input, sanitize, rate-limit, log to email + Sheets + Supabase, return bilingual message
- Every admin API route MUST start with `verifyAdminRequest(request)` — no exceptions
- Every user input rendered in emails MUST pass through `escapeHtml()`
- Every `localStorage`/`sessionStorage` call MUST be wrapped in try/catch (private mode)
- Every animation MUST respect `prefers-reduced-motion`
- No `TODO: fix later` in main branch — fix it or don't ship it

### Production Readiness

- Every feature must ship with: server action, bilingual translations, mobile responsive, accessible (aria-labels, keyboard nav), SEO metadata
- Build issues must be resolved, not documented
- Every form MUST have: loading state, success state, error state, rate limiting, validation, bilingual messages
- Every page MUST have: metadata, loading.tsx skeleton (if route), error boundary
- Security: CSRF (Next.js server actions), rate limiting, XSS prevention, input sanitization, security headers

### Documentation

- Every phase must update this file with shipped features
- `docs/` folder holds setup guides (Supabase, Google Sheets, email deliverability)
- i18n keys MUST stay in sync between `sq.json` and `en.json`
- Chatbot Q&A lives in `src/lib/chatbot-data.ts` — bilingual responses required

## Architecture Overview

**Single Next.js 16 App** (App Router, TypeScript, React 19):

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 16.2 (Turbopack, App Router) |
| UI | React 19 + Tailwind CSS v4 + shadcn/ui (base-nova style) |
| i18n | next-intl (sq + en, locale-based routing) |
| Theme | next-themes (dark default + light) |
| Database | Supabase (PostgreSQL + Row-Level Security) |
| Email | Resend |
| Backup storage | Google Sheets webhook |
| Auth (admin) | Password-based, Bearer token, constant-time compare |
| Hosting target | Vercel |
| Domain | likaacademy.al (not purchased yet) |

**No microservices. No separate backend. No Docker in dev.** One Next.js app with server actions and API routes.

## File Structure

```
src/
├── app/
│   ├── layout.tsx                   # Root (html, body, fonts, ThemeProvider)
│   ├── [locale]/
│   │   ├── layout.tsx               # Navbar, Footer, Chatbot, CookieConsent
│   │   ├── page.tsx                 # Homepage
│   │   ├── template.tsx             # Page transition animation
│   │   ├── loading.tsx              # Generic skeleton
│   │   ├── not-found.tsx            # Locale-aware 404
│   │   ├── programs/[slug]/         # Course detail pages
│   │   ├── blog/[slug]/             # Blog post pages
│   │   ├── about/ contact/ enroll/ schedule/ stories/
│   │   ├── calculator/ compare/ playground/ referral/ instructors/
│   │   └── privacy/ terms/
│   ├── admin/                       # Admin panel (outside [locale] routing)
│   │   ├── page.tsx                 # Dashboard + submissions
│   │   ├── courses/ blog/ schedule/ analytics/
│   │   └── login.tsx                # Auth gate
│   ├── api/
│   │   ├── admin/auth/              # Login
│   │   ├── admin/verify/            # Session check
│   │   ├── admin/submissions/       # CRUD
│   │   ├── admin/courses/           # CMS CRUD
│   │   ├── admin/blog/              # CMS CRUD
│   │   └── admin/schedule/          # CMS CRUD
│   ├── sitemap.ts                   # Dynamic sitemap generator
│   ├── robots.ts                    # robots.txt
│   ├── icon.svg                     # Favicon
│   ├── error.tsx                    # Error boundary
│   └── global-error.tsx             # Root error boundary
├── components/
│   ├── ui/                          # shadcn components (Button, Card, etc.)
│   ├── sections/                    # Homepage sections (hero, programs-preview, etc.)
│   ├── pages/                       # Page-level components
│   ├── navbar.tsx footer.tsx
│   ├── chatbot.tsx                  # Zana chat widget
│   ├── zana-mascot.tsx              # Zana avatar components
│   ├── cookie-consent.tsx           # GDPR banner
│   ├── analytics.tsx                # Page view tracking + GA loader
│   ├── scroll-to-top.tsx            # Back-to-top button
│   ├── sw-register.tsx              # Service worker registration
│   └── theme-provider.tsx theme-toggle.tsx
├── lib/
│   ├── actions.ts                   # Form server actions (bilingual)
│   ├── email.ts                     # Resend + HTML templates
│   ├── sheets.ts                    # Google Sheets webhook
│   ├── supabase.ts                  # Supabase client
│   ├── admin-auth.ts                # verifyAdminRequest helper
│   ├── rate-limit.ts                # In-memory rate limiter
│   ├── cms.ts                       # Supabase → fallback to hardcoded
│   ├── courses.ts blog-posts.ts schedule-data.ts instructors.ts
│   ├── chatbot-data.ts              # 109+ Q&A patterns
│   └── utils.ts
├── i18n/
│   ├── routing.ts                   # Locale config
│   └── request.ts                   # Server-side locale loading
└── middleware.ts                    # next-intl middleware (excludes /admin)

messages/
├── sq.json                          # Albanian (default)
└── en.json                          # English

public/
├── zana/                            # Mascot images (PNG + WebP)
├── manifest.json                    # PWA manifest
├── sw.js                            # Service worker
└── offline.html                     # Offline fallback page

docs/
├── supabase-setup.md
├── google-sheets-setup.md
└── email-deliverability.md
```

## Local Development

```bash
# Install
npm install

# Dev server (uses .env.local)
npm run dev              # http://localhost:3000 (or 3001/3002 if busy)

# Production build
npm run build
npm start

# Lint
npm run lint

# TypeScript check
npx tsc --noEmit
```

**Hot reload** works for all file changes. Tailwind v4 rebuilds automatically.

## Deployment

**Target:** Vercel.

**Workflow:**
1. Push to GitHub `main` branch
2. Vercel auto-deploys
3. Add env vars in Vercel dashboard (see `.env.example`)
4. Link custom domain `likaacademy.al`
5. Verify domain in Resend (DNS: SPF + DKIM + DMARC)

**Build command:** `next build` (Vercel auto-detects).

**No CI/CD pipeline yet** — Vercel handles build and preview deploys for every push/PR.

## Environment Variables

See `.env.example` for full list. Required for production:

| Variable | Purpose |
| -------- | ------- |
| `ADMIN_PASSWORD` | Admin panel login (no default — MUST be set) |
| `RESEND_API_KEY` | Email sending |
| `EMAIL_FROM` | From address (use verified domain: `Lika Academy <noreply@likaacademy.al>`) |
| `ADMIN_EMAIL` | Where form notifications go |
| `REPLY_TO_EMAIL` | Reply-to header |
| `SHEETS_WEBHOOK_URL` | Google Sheets backup (optional) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public read access |
| `SUPABASE_SERVICE_KEY` | Server-side admin access (SECRET) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (format: `G-XXXXXXXXXX`) |

**Graceful degradation:** If any of these are missing, features degrade silently:
- No `RESEND_API_KEY` → emails log but don't send
- No `SUPABASE_*` → submissions log but don't persist
- No `SHEETS_WEBHOOK_URL` → Sheets backup skipped
- No `NEXT_PUBLIC_GA_ID` → GA scripts not loaded
- No `ADMIN_PASSWORD` → admin API returns 500

## Internationalization (next-intl)

**Locales:** `sq` (Albanian, default) and `en` (English).

**Routing:** `/sq/programs`, `/en/programs`. Middleware redirects `/programs` → `/sq/programs`.

**100% parity required:** Every key in `sq.json` must exist in `en.json` and vice versa.

**How to add a translation:**
1. Add key to BOTH `messages/sq.json` and `messages/en.json`
2. Use it via `const t = useTranslations("namespace")` then `t("key")`
3. For server components: `const t = await getTranslations("namespace")`

**Dynamic locale in components:**
```tsx
import { useLocale } from "next-intl";
const locale = useLocale(); // "sq" or "en"
```

**Server actions receive locale** via hidden form field (`<input type="hidden" name="locale" value={locale} />`) or as explicit parameter — never guess from headers.

## Forms & Server Actions

**All forms submit to `src/lib/actions.ts` server actions.** Each action:

1. Reads locale from form data
2. Rate-limits by IP (5/hr for contact/enroll, 3/hr for newsletter/referral)
3. Sanitizes + validates inputs (email format, phone format, max lengths)
4. For enrollment: validates `courseSlug` against `courses.ts`
5. Logs to console (structured JSON)
6. Fires 3 parallel async writes (non-blocking):
   - `sendEmail()` → Resend (with `replyTo` for contact form)
   - `appendToSheet()` → Google Sheets webhook
   - `supabase.from("submissions").insert()` → Postgres
7. Returns `{ success: boolean, message: string }` in user's locale

**Never await** the persistence writes — they're fire-and-forget with `.catch(console.error)`.

**Client-side save:** After successful server action, client also saves to `localStorage` via `save-submission.ts` for admin dashboard viewing (local only).

## Admin Panel

**Route:** `/admin` (not `/sq/admin` or `/en/admin` — outside i18n).

**Auth flow:**
1. User submits password → `POST /api/admin/auth` → 200 or 401
2. Password stored in `sessionStorage` as `lika-admin-auth`
3. Every subsequent API call sends `Authorization: Bearer <password>`
4. Every admin API route calls `verifyAdminRequest(request)` FIRST — returns 401 if missing/invalid
5. Constant-time comparison (`crypto.timingSafeEqual`) to prevent timing attacks
6. Rate limit: 5 login attempts per 15 min per IP

**Pages:**
- `/admin` — Submissions dashboard (filter, status cycle, CSV export, delete)
- `/admin/courses` — Courses CRUD with module editor
- `/admin/blog` — Blog posts CRUD (markdown content)
- `/admin/schedule` — Cohorts CRUD with timetable grid
- `/admin/analytics` — Page views chart + top pages

**Data flow:**
- Website reads from Supabase via `src/lib/cms.ts` (with fallback to hardcoded data in `courses.ts` / `blog-posts.ts` / `schedule-data.ts`)
- Admin writes via `/api/admin/*` routes using `SUPABASE_SERVICE_KEY`
- "Seed from hardcoded" button imports hardcoded data into Supabase

## Security

| Measure | Implementation |
| ------- | -------------- |
| Admin auth | Bearer token (password), constant-time compare, rate-limited |
| CSRF | Next.js server actions (built-in token validation) |
| XSS in emails | `escapeHtml()` on every user input before interpolation |
| XSS in UI | React auto-escapes; no `dangerouslySetInnerHTML` anywhere |
| SQL injection | Supabase uses parameterized queries |
| iframe sandbox | `sandbox=""` on playground iframe (no JS execution) |
| Rate limiting | In-memory (per IP) — upgrade to Redis for multi-instance prod |
| Input validation | Email regex, phone regex, max lengths, slug whitelist |
| Security headers | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy, Strict-Transport-Security |
| Private mode | All `localStorage`/`sessionStorage` calls wrapped in try/catch |
| `.env.local` | Gitignored; secrets never committed |
| Default password | Removed — `ADMIN_PASSWORD` must be set or API returns 500 |
| Dependencies | `npm audit` clean (0 vulnerabilities as of 2026-04-18) |

**NOT implemented (accepted risk for pre-launch solo founder):**
- JWT tokens with expiry (using plain password in Bearer header)
- HTTP-only cookies for auth (using sessionStorage — vulnerable to XSS)
- CSP header (too complex to tune for launch)
- Redis-backed rate limiting
- Audit logging of admin actions
- 2FA

These should be added when the business scales past 50+ students or handles real payment data.

## Zana — The AI Assistant Mascot

**Zana** is Lika Academy's digital assistant mascot — a static keyword-matching chatbot, NOT a real AI API.

**Architecture:**
- `src/lib/chatbot-data.ts` — 109+ Q&A pairs (bilingual sq + en), regex patterns
- `src/components/chatbot.tsx` — floating widget, chat panel
- `src/components/zana-mascot.tsx` — avatar components (ZanaMascot, ZanaAvatar, ZanaBust)
- Zero cost — no API calls, runs entirely client-side
- `getResponse(input, locale)` iterates patterns, returns first match or `DEFAULT_RESPONSE`

**Name origin:** Albanian mythology — Zanat are powerful female mountain spirits who protect and guide. The bot references this in the "who are you?" Q&A.

**Visual identity:**
- 3D rendered character (orange → purple hair, headphones, dark jacket with `</>` symbol)
- Images: `public/zana/avatar.png` (full res) + `avatar-sm.webp` (3.4KB optimized)
- Floating button: bottom-right, purple ring glow, `priority` loaded
- Chat bubbles use `ZanaAvatar` (32px, lazy loaded)

**Conversations are NOT stored.** Chatbot is stateless.

## Email (Resend)

**Transport:** Resend (only — no SMTP fallback for simplicity).

**All emails sent to ADMIN_EMAIL** (Simi) — users don't receive automated emails yet.

**Templates** (`src/lib/email.ts`):
- `enrollmentEmailHtml` — new course application
- `contactEmailHtml` — new contact message (with reply-to user's email)
- `newsletterEmailHtml` — new subscriber
- `referralEmailHtml` — new referral invitation

**All templates wrapped** in professional HTML5 email structure (`wrapInTemplate()`):
- Purple gradient header with `</>` brand
- Content section
- Footer with physical address (Kamëz, Tirana), website link, anti-spam explanation
- Proper DOCTYPE, charset, viewport meta tags
- `X-Entity-Ref-ID` header for deduplication

**Dev mode:** If `RESEND_API_KEY` is empty, emails log structured JSON (`[Email Log]`) but don't send.

**Deliverability:** See `docs/email-deliverability.md` for DNS setup (SPF, DKIM, DMARC).

## Course Structure

**As of 2026-09-19: Lika Kids and Future Generations were merged into a single "Web Development" course** (`web-development` slug, category `webdev`). No age range or price has been set for it yet — the site shows "Coming soon" instead of a number wherever price would appear (course detail page, chatbot, FAQ, terms). It's excluded from the Calculator (bundle pricing requires a real price) and the Compare page (Pro Tracks only).

**Marketing label:** "2 months" for Pro Tracks and Web Development.

**Actual structure (Pro Tracks + Web Development):**
- 6 weeks of lessons + 4 weeks of projects = ~10 weeks
- 12 lesson sessions × 2 hours = 24 hours of instruction
- Weekends only: Saturday & Sunday, 08:00–16:00
- 4 time slots per day, max 8 sessions/week across all groups
- Each student group meets 2x/week
- 4 portfolio projects (1 per week during project phase)

**Web Development:** 2 months, 4 portfolio projects, price TBD.

**Pro Tracks (19+):** 2 months, 4 portfolio projects, **99€ launch price** (no crossed-out regular price shown on site — internal reference only, see `docs/talking-points-ubt.html`).

**Course data lives in `src/lib/courses.ts`.** Admin CMS can override via Supabase; `src/lib/cms.ts` tries Supabase first, falls back to hardcoded.

## Schedule

**Data:** `src/lib/schedule-data.ts` — 3 cohorts (May, June, July 2026).

**Timetable structure per cohort:**
```ts
timetable: [
  { time: "08:00 - 10:00", saturday: "open", sunday: "open" },
  { time: "10:00 - 12:00", saturday: "open", sunday: "open" },
  { time: "12:00 - 14:00", saturday: "open", sunday: "open" },
  { time: "14:00 - 16:00", saturday: "open", sunday: "open" },
]
```

When courses are assigned, replace `"open"` with the course slug.

**First cohort:** May 2026 — marked `isFirst: true`.

## PWA & Offline

**Manifest:** `public/manifest.json` — installable as app.

**Service Worker:** `public/sw.js` — network-first, falls back to cache, then to `offline.html`.

**Caching strategy:**
- Skips `/api/` and `/admin/` routes
- Caches successful HTML responses
- `offline.html` precached on install (bilingual: sq + en)
- Auto-updates: `Cache-Control: no-cache` on sw.js

**Registration:** `src/components/sw-register.tsx` registers SW on mount.

## Analytics & Cookie Consent

**Cookie consent** (`src/components/cookie-consent.tsx`):
- 4 categories: Necessary (always on), Analytics, Marketing, Functional
- Stored in `localStorage` as `lika-cookie-consent`
- GDPR-compliant: no tracking before consent

**Analytics** (`src/components/analytics.tsx`):
- Only loads Google Analytics if `analytics: true` in cookie preferences
- Only tracks page views to localStorage if `functional: true`
- Polls cookie preferences every 2s to catch changes (storage event doesn't fire same-tab)
- `anonymize_ip: true` in GA config

## SEO

**Sitemap:** `src/app/sitemap.ts` — auto-generates for all static pages + course slugs + blog slugs × 2 locales.

**robots.ts:** Allows all, disallows `/api/`, points to sitemap.

**Metadata:**
- Root layout: defaults for title, description, OG, Twitter cards
- Each page: custom `metadata` export
- Dynamic OG locale per language (`sq_AL` / `en_US`) via locale layout `generateMetadata`
- `metadataBase: new URL("https://likaacademy.al")` — update after domain purchase

**OG image:** `/zana/bust.png` (full resolution, only loaded by social crawlers).

**Sitemap URL:** `https://likaacademy.al/sitemap.xml` (points to production domain even in dev).

## Performance

**Optimizations applied:**
- Removed framer-motion (replaced with CSS transitions + IntersectionObserver) — saved ~50KB
- Images: WebP format (avatar-sm.webp 3.4KB, bust-sm.webp 7.6KB)
- Next.js Image with proper `sizes` + `priority`/`loading="lazy"`
- Chatbot data extracted to separate file (reduced component size from 920 → 253 lines)
- Analytics scripts: `strategy="lazyOnload"` (deferred until idle)
- `prefers-reduced-motion` respected — animations disabled
- `oklch()` colors with hex fallback via `@supports not` query
- Webkit prefixes for `mask-composite`, `backdrop-filter`

**Core Web Vitals target:** LCP < 2.5s, FID < 100ms, CLS < 0.1.

## Accessibility (WCAG AA)

**Implemented:**
- Skip navigation link
- `aria-label` on all icon-only buttons (theme toggle, language switch, mobile menu, social links, playground textareas)
- `aria-hidden="true"` on decorative elements (hero 3D illustration)
- `role="status"`/`role="alert"` with `aria-live` on form success/error messages
- `scope="col"`/`scope="row"` on data tables
- `prefers-reduced-motion` support
- Color contrast WCAG AA compliant (muted-foreground bumped for readability)
- Keyboard navigation throughout (no mouse-only interactions)
- `lang` attribute on `<html>` set per locale
- Focus indicators visible (shadcn defaults)
- Form labels properly associated with inputs

## Features Built (as of 2026-04-18)

Everything listed here is **shipped and functional** in the codebase.

### Public Website (18 pages × 2 locales)

**Homepage:**
- Hero with Zana 3D illustration (desktop)
- Programs preview (3 cards: Kids, Future Gen, Pro Tracks)
- Testimonials → replaced with "Why Choose" promises (no real students yet)
- Journey (4-step visual)
- Newsletter signup (changed from "Free PDF Roadmap" to honest "Stay Updated")
- Playground banner

**Content pages:**
- Programs listing (5 courses, `99€` launch price for Pro Tracks — Web Development price coming soon, no crossed-out regular price shown)
- Course detail × 5 (Python, JavaScript/MERN, Golang, .NET, Web Development)
- About + FAQ
- Contact (form + social links + map placeholder)
- Blog listing + 6 blog posts (bilingual markdown)
- Success Stories (career paths with salary data)
- Schedule (weekend timetable grid + 3 cohorts)
- Instructors (only Simi as founder + "We're hiring" banner)
- Privacy Policy + Terms of Service (bilingual, GDPR)

**Interactive tools:**
- Code Playground (HTML/CSS editor + live preview, 3-step guided lesson)
- Pricing Calculator (select courses, bundle discounts 10%/15%)
- Course Comparison (Pro Tracks side-by-side)
- Referral Program (15% off for both)
- Enrollment Wizard (4-step, pre-fills course from `?course=` URL param, sessionStorage persistence)

### Admin Panel (password-protected, `/admin`)

- Login with sessionStorage auth
- Submissions dashboard (filter, status cycle, CSV export, delete)
- Courses CMS (5 courses, module editor, seed from hardcoded)
- Blog CMS (6 posts, markdown editor, publish toggle, seed)
- Schedule CMS (3 cohorts, timetable editor, seed)
- Analytics dashboard (page views from localStorage)

### Backend Integrations

- Resend email (all form submissions)
- Google Sheets webhook (backup of all submissions)
- Supabase (submissions + courses + blog_posts + cohorts tables with RLS)

### Platform-Wide

- Bilingual SQ/EN (100% key parity, 2300+ keys across both languages)
- Dark (default) + Light theme with `oklch()` color system
- Zana chatbot (109 Q&A patterns, bilingual, static — no AI API)
- Cookie consent (GDPR, 4 categories, respected by analytics)
- Service Worker + offline.html
- PWA manifest (installable)
- Security headers (6 headers on all routes)
- Rate limiting (per-IP, per-endpoint)
- Skip navigation, aria-labels, reduced motion support
- Print stylesheet (clean syllabus printing)
- Custom 404 pages (root + locale)
- Error boundaries (root + locale)
- Loading skeletons (9 routes)
- Scroll to top button
- Cross-browser compatibility (Safari 15+, Firefox 113+, Chrome 111+)

### Known Gaps (intentionally NOT built yet)

These are roadmap items — do not assume they exist:

- Real student dashboard / portal (no students yet — planned post-launch)
- Payment integration (Stripe) — currently manual IBAN / bank transfer
- Real CMS with image uploads (admin shows text fields only)
- AI chatbot backed by real LLM (we chose static FAQ matching — zero cost)
- WhatsApp floating button (commented out; exists in `src/components/whatsapp-button.tsx` but not mounted)
- Partners section on homepage (commented out in `page.tsx`)
- Mobile app (web-only, but installable as PWA)
- Multi-instructor profiles (only Simi as founder)
- Video content / recorded lessons
- Email automation / drip campaigns
- SMS notifications

### Not Yet Configured (requires Simi's action)

- Domain: `likaacademy.al` not purchased
- Resend domain verification (DNS: SPF + DKIM + DMARC)
- Supabase project + tables (SQL in `docs/supabase-setup.md`)
- Google Sheets webhook (setup in `docs/google-sheets-setup.md`)
- Google Analytics property (set `NEXT_PUBLIC_GA_ID`)
- Real phone number (currently `+355 69 000 0000` placeholder)
- Social media: ✅ Instagram (@likaacademy.al), ✅ Facebook (/likaacademy.al). LinkedIn/YouTube — not yet.
- Admin password (change from `lika2026` default)

### Verification Resources

- This file (`AGENTS.md`) — authoritative feature inventory
- `docs/supabase-setup.md` — database SQL
- `docs/google-sheets-setup.md` — webhook setup
- `docs/email-deliverability.md` — DNS + spam score

## Ownership

**You own every line of code in this codebase.** Code written in previous sessions is still YOUR code. Never dismiss failures as "pre-existing" or "not caused by my changes." If something is broken, debug it, fix it, and propose the solution. Check git history for context from prior sessions. There is no "someone else's problem" — it's all yours.

## Agent Behavior

### Plan Before Building

- For any non-trivial task (3+ steps), plan first
- If something goes sideways, STOP and re-plan — don't keep pushing a broken approach

### Subagent Hygiene

- Use subagents liberally to keep the main context window clean
- One task per subagent for focused execution
- Offload research, exploration, and parallel analysis to subagents
- When user says "puno ne paralel" (work in parallel), launch concurrent agents in a single message

### Prove It Works

- Never mark a task complete without proving it works
- Run `npm run build` after every significant change
- For UI changes: start the dev server and actually verify in browser
- For forms: click through the happy path end-to-end
- Ask yourself: "Would a staff engineer approve this?"

### Content Consistency Is Sacred

When changing ANY of these, check ALL of these files for consistency:
- **Pricing** → `courses.ts`, `chatbot-data.ts`, `blog-posts.ts`, `terms-page.tsx`, `programs-page.tsx`, `messages/*.json`, `layout.tsx` SEO, `programs/page.tsx` SEO
- **Duration** → same list + schedule page
- **Project count** → same list + testimonials + journey step3
- **Course names** → `courses.ts`, `programs-page.tsx`, `enroll-page.tsx`, `chatbot-data.ts`
- **Location** → `layout.tsx` SEO, all page SEO, `chatbot-data.ts`, `messages/*.json` address/subtitle, privacy/terms contact sections

If you change pricing in one place and not another, you've shipped a bug. Always grep for all mentions before editing.

### Self-Correction

- After ANY correction from the user: update this file with the pattern
- Write rules that prevent the same mistake
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"

### Autonomous Execution

- User writes in Albanian → respond in Albanian
- User writes in English → respond in English
- Mirror their language; don't auto-translate their words back at them
- When given a bug report: just fix it. Point at logs, errors — then resolve them

## When Making Decisions

Ask: "Is this production-ready, or am I cutting corners?"

Lika Academy's first users will be parents trusting Simi with their children's education, and adults betting their career change on this academy. If you wouldn't trust a friend's child's education to this version, invest the time to do it right.

---

_Last updated: 2026-04-18_
