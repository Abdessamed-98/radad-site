import type { NextConfig } from "next";

/* GH_PAGES=1 (set by the deploy workflow) builds a static export for
   GitHub Pages, which serves the site under /radad-site and cannot run
   server-side redirects. Local dev and any future Vercel deploy use the
   default server build with the / → /ar redirect. */
const ghPages = process.env.GH_PAGES === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Plain <img> tags under public/ need the prefix spelled out.
  env: { NEXT_PUBLIC_BASE_PATH: ghPages ? "/radad-site" : "" },
  ...(ghPages
    ? {
        output: "export" as const,
        basePath: "/radad-site",
        trailingSlash: true,
      }
    : {
        async redirects() {
          // Arabic is the primary locale; bare / lands there.
          return [{ source: "/", destination: "/ar", permanent: false }];
        },
      }),
};

export default nextConfig;
