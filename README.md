<<<<<<< HEAD
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

# EZ Bid

EZ Bid is a mobile-friendly local service marketplace that connects customers with local service vendors.

Customers can post jobs, vendors can submit bids, and customers can choose the vendor they want to work with.

This is the MVP/beta version: simple, clean, and designed to be upgraded over time.

## Current MVP Status

For now, EZ Bid is free during beta.

* Customers can post jobs and compare bids.
* Vendors can create profiles and submit bids.
* Admin tools are included for basic platform management.
* Payment features are not active yet.

## Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* PostgreSQL
* Prisma ORM
* Zod validation
* Local authentication
* Local file upload structure for development

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root of the project.

Required values:

```bash
DATABASE_URL="your-database-url"
AUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:3000"
SEED_ADMIN_EMAIL="admin@ezbid.local"
SEED_ADMIN_PASSWORD="admin12345"
```

Do not commit your real `.env` file to GitHub.

### 3. Generate Prisma client

```bash
npx prisma generate
```

### 4. Create or update the database

```bash
npx prisma migrate dev --name init
```

### 5. Seed starter data

```bash
npx prisma db seed
```

### 6. Run the app locally

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Default Admin Account

The seeded admin account uses the values from:

```bash
SEED_ADMIN_EMAIL
SEED_ADMIN_PASSWORD
```

Default local development values:

```bash
admin@ezbid.local
admin12345
```

## Core MVP Flow

1. Customer signs up.
2. Customer posts a job.
3. Vendor signs up.
4. Vendor completes a profile.
5. Vendor submits a bid.
6. Customer compares bids.
7. Customer accepts one bid.
8. Job can be completed.
9. Customer can leave a review.

## Project Structure

```bash
prisma/
  schema.prisma
  seed.ts

src/
  app/
    public pages
    customer pages
    vendor pages
    admin pages

  components/
    ui components
    shared components

  lib/
    auth
    db
    validations
    services
    actions
    utils
```

## Important MVP Notes

This version is intentionally simple.

Do not add advanced features until the core marketplace flow is stable.

Future upgrades may include:

* Payments
* Customer access plans
* Vendor tools
* Messaging
* Scheduling
* Invoicing
* Analytics
* AI quote assistance
* Native mobile apps

These features are not active in the current MVP.
