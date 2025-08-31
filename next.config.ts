import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname), // This points to the current directory (where next.config.ts lives)
  },
  /* other config options here */
};

export default nextConfig;
