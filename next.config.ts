import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/onayami-navi' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/onayami-navi/' : '',
};

export default nextConfig;
