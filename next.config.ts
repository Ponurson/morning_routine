import type { NextConfig } from "next";

const normalizedBasePath = process.env.NEXT_BASE_PATH?.trim();
const basePath =
  normalizedBasePath && normalizedBasePath !== "/"
    ? normalizedBasePath.replace(/\/+$/, "")
    : undefined;
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix,
      }
    : {}),
};

export default nextConfig;
