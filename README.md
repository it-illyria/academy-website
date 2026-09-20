# Lika Academy

Website for Lika Academy — a coding academy in Kamëz/Tirana teaching kids, teens, and adults. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Supabase.

Full architecture, conventions, and feature inventory live in [AGENTS.md](./AGENTS.md) — read that first before making changes.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values you have (see AGENTS.md > Environment Variables)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (falls back to 3001/3002 if busy).

## Common Commands

```bash
npm run dev          # dev server (Turbopack)
npm run build         # production build
npm start              # run production build
npm run lint            # ESLint
npx tsc --noEmit        # TypeScript check
```

## Project Structure

See [AGENTS.md](./AGENTS.md#file-structure) for the full breakdown of `src/app`, `src/components`, `src/lib`, `messages/`, and `docs/`.

## Setup Guides

- [docs/supabase-setup.md](./docs/supabase-setup.md) — database schema
- [docs/google-sheets-setup.md](./docs/google-sheets-setup.md) — submissions backup webhook
- [docs/email-deliverability.md](./docs/email-deliverability.md) — Resend DNS (SPF/DKIM/DMARC)

## Deployment

Deployed on Vercel — push to `main` to trigger a build. See [AGENTS.md](./AGENTS.md#deployment) for domain and env var setup.
