# EZ Bid

A mobile-friendly local service marketplace that connects customers with local blue-collar service vendors. Customers post jobs, vendors submit bids, and customers accept one bid. A finder's fee is recorded, and the customer's exact address stays private until the fee is confirmed.

This is the MVP: clean, scalable, and easy to upgrade.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **PostgreSQL** + **Prisma ORM**
- **Zod** for validation, **React Hook Form**-friendly forms via server actions
- Lightweight **cookie session auth** (email + password, bcrypt, signed JWT via `jose`) — abstracted behind `src/lib/auth` so it can be swapped for Supabase Auth or Clerk later
- Local-disk **file uploads** (`public/uploads`) abstracted behind `src/lib/services/uploads.ts` so it can be swapped for Supabase Storage later

> Payments are intentionally **not** integrated. The finder's fee is recorded in the database as `PENDING` and confirmed manually by an admin. This is the seam where Stripe plugs in later.

## Getting started

### 1. Prerequisites

- Node.js 18.18+ (or 20+)
- A PostgreSQL database (local, or hosted on Supabase / Neon / Railway)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

- `DATABASE_URL` — your PostgreSQL connection string
- `AUTH_SECRET` — a long random string. Generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — credentials for the seeded admin account

### 4. Create the database schema and seed data

```bash
npm run db:push      # create tables from prisma/schema.prisma
npm run db:seed      # seed service categories + an admin user
```

(Or use `npm run db:migrate` if you prefer tracked migrations.)

### 5. Run the app

```bash
npm run dev
```

Open http://localhost:3000.

## Default accounts

- **Admin**: the credentials from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` (default `admin@ezbid.local` / `admin12345`).
- **Customers / Vendors**: create them via the signup pages (`/signup/customer`, `/signup/vendor`).

## Core flow to try

1. Sign up as a **customer** and post a job (`/customer/jobs/new`).
2. Sign up as a **vendor**, complete the profile, and submit a bid on that job.
3. As the customer, compare bids and accept one — a finder's fee is recorded as `PENDING`.
4. Log in as **admin** and confirm the finder's fee (`/admin/finder-fees`).
5. As the winning vendor, open the job — the exact address and customer contact are now unlocked.
6. As the customer, mark the job completed and leave a review. The vendor's rating updates.

## Project structure

```
prisma/
  schema.prisma        # models, enums, indexes
  seed.ts              # service categories + admin
src/
  app/
    (public)/          # home, how-it-works, login, signup
    customer/          # customer dashboard & pages
    vendor/            # vendor dashboard & pages
    admin/             # admin dashboard & pages
    api/upload/        # protected file upload route
  components/
    ui/                # Button, Input, Card, Badge, FileUpload, ...
    shared/            # PageHeader, EmptyState, states, StatusBadge, StatCard
    jobs/ bids/ vendors/ reviews/ profile/ layout/ admin/
  lib/
    auth/              # session, password, role guards
    db/                # Prisma client
    validations/       # Zod schemas
    services/          # business logic (jobs, bids, finderFees, reviews, ...)
    actions/           # server actions
    utils/             # formatting & labels
```

## Business rules (where they live)

- **Finder's fee calculation** — `src/lib/services/finderFees.ts` (`calculateFinderFee`)
- **Bid acceptance (transactional)** — `src/lib/services/bids.ts` (`acceptBid`)
- **Address unlock logic** — `src/lib/services/authorization.ts` (`canViewExactJobLocation`)
- **Review rules + rating recompute** — `src/lib/services/reviews.ts`
- **Verification** — `src/lib/services/verification.ts`

## Finder's fee tiers (MVP)

| Accepted bid amount | Fee |
| --- | --- |
| $0 – $249 | $10 flat |
| $250 – $499 | $20 flat |
| $500 – $999 | 5% |
| $1,000 – $2,499 | 4% |
| $2,500+ | 3% (future cap) |

Always rounded up to the nearest dollar.

## Future upgrades (designed for, not built)

Payments/Stripe, recurring contracts, rewards, vendor subscriptions, masked phone numbers, in-app messaging, scheduling, invoicing, analytics, AI quote assistant, and native apps. The service layer and finder-fee seam are structured so these can be added without a rewrite.
