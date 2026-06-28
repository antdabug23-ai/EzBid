import { PrismaClient } from "@prisma/client";

function resolveDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return undefined;

  let url = raw;
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1);
  }

  // Supabase pooler + Prisma on serverless needs pgbouncer mode.
  if (url.includes("pooler.supabase.com") && !url.includes("pgbouncer=true")) {
    url += url.includes("?") ? "&" : "?";
    url += "pgbouncer=true&connection_limit=1";
  }

  return url;
}

const databaseUrl = resolveDatabaseUrl();

if (!databaseUrl) {
  console.error("[prisma] DATABASE_URL is not set");
} else {
  console.info(
    "[prisma] DATABASE_URL configured:",
    true,
    "pooler:",
    databaseUrl.includes("pooler.supabase.com")
  );
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;
