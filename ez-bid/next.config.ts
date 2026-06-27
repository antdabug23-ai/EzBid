import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app so Next doesn't get confused by the
  // package-lock.json in the parent folder.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
