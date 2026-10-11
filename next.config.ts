import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Lets the static pages know when they were built (launch-offer end date).
  env: { NEXT_PUBLIC_BUILT_AT: String(Date.now()) },
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
