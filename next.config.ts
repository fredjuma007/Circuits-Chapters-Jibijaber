import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ignore lint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ ignore TS errors during build
  },
};

export default nextConfig;
