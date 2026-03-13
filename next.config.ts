import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const pagesRepoName = process.env.PAGES_REPO_NAME || "vacation_dashboard";
const pagesBasePath = `/${pagesRepoName}`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isProd
    ? {
        basePath: pagesBasePath,
        assetPrefix: `${pagesBasePath}/`,
      }
    : {}),
};

export default nextConfig;
