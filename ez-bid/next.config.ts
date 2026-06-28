import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Prisma out of the Next.js bundle so the query engine works on Vercel.
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
