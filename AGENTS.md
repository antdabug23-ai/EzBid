# EZ Bid — repository guide

## Active project location

The active application lives in the **`ez-bid/`** subfolder (Next.js 16 App Router, React 19, Prisma 6, Tailwind 4). All recent development happens there — run every command from `ez-bid/`, not the repo root.

The files at the repository root (`/workspace/package.json`, `/workspace/src`, `/workspace/prisma`, root `README.md`) are an older legacy version (Next 14 / Prisma 5) and are not the project under active development. The root `README.md` also contains a leftover merge-conflict marker; ignore it. Use `ez-bid/README.md` for product/setup docs.

## Cursor Cloud specific instructions

### Services
- Single service: the **EZ Bid Next.js app** in `ez-bid/`. It needs a **PostgreSQL** database and an `AUTH_SECRET`.
- Standard commands live in `ez-bid/package.json` scripts and `ez-bid/README.md`. Run them from `ez-bid/`: `npm run dev`, `npm run lint`, `npm run build`, `npm run db:push`, `npm run db:seed`.

### Database (local Postgres)
- The update script only refreshes npm deps. It does **not** install Postgres, start it, create `.env`, or sync/seed the DB. Do those once per fresh VM:
  - PostgreSQL 16 is installed via apt. It does **not** auto-start (init policy is denied during image build), so start it manually: `sudo pg_ctlcluster 16 main start`.
  - Dev DB/role used during setup: database `ezbid`, user `ezbid`, password `ezbid` on `localhost:5432` (created with `sudo -u postgres psql`). Recreate if missing.
- `ez-bid/.env` is git-ignored (never commit it). It must contain `DATABASE_URL` (the local Postgres URL above) and a 32-byte hex `AUTH_SECRET` (min 16 chars, or auth throws `AuthConfigurationError`). Generate a secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- There is **no `prisma/migrations`** folder — apply the schema with `npm run db:push` (not `migrate`), then `npm run db:seed` to load the 8 service categories (the job form needs them).

### Gotchas
- `next dev`/`build` print a harmless "multiple lockfiles" warning because both the root and `ez-bid/` have a `package-lock.json`; the `ez-bid/` one is the one that matters.
- Prisma prints a deprecation warning about `package.json#prisma`; this is expected and must stay (do not add `prisma.config.ts` or upgrade to Prisma 7).
- Auth-protected routes (`/customer/*`, `/vendor/*`, `/admin/*`) redirect to `/login` (HTTP 307) without a valid session cookie — expected, not an error.
- Production-only Supabase pgbouncer query params are auto-appended only when the URL contains `pooler.supabase.com`; the local URL is unaffected.
