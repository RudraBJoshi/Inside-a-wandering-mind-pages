import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WordPress URLs end in a slash (/departments/); keep them identical.
  trailingSlash: true,
  // The live site 301-redirects these short URLs to their canonical /categories/... pages.
  async redirects() {
    return ["c1-stem", "c2-world-society", "c3-arts-entertainment", "c4-creative-works-fiction", "c5-personal-experiences"].map(
      (slug) => ({ source: `/${slug}/`, destination: `/categories/${slug}/`, permanent: true }),
    );
  },
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
