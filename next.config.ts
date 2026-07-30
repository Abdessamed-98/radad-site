import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Arabic is the primary locale; bare / lands there.
    return [{ source: "/", destination: "/ar", permanent: false }];
  },
};

export default nextConfig;
