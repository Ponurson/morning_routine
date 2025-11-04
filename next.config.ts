import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(isProd
    ? {
        basePath: "/bejba_poranki_up",
        assetPrefix: "/bejba_poranki_up/",
      }
    : {}),
};

export default nextConfig;
