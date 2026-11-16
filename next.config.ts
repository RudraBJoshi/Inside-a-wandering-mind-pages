import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WordPress URLs end in a slash (/departments/); keep them identical.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
