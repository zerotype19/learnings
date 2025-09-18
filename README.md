# Learnings.org Monorepo

Meme-first corporate jargon university. Frontend on Cloudflare Pages, API on Workers, D1 for data.

## Apps
- `apps/web` — React + Vite + Tailwind
- `apps/api` — Hono Worker (TypeScript)

## Packages
- `packages/ui` — Shared React components
- `packages/lib` — Types, utils, API client

## Dev
```sh
pnpm i
pnpm dev
```

## Migrations

```sh
pnpm migrate:local
```