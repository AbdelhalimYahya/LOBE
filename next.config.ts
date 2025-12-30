import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: [
      "storage.skinsort.com",
      "www.innisfree.com",
      "incidecoder-content.storage.googleapis.com",
      "media.sephora.eu",
      "ba.fimgs.net",
    ],
  },
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
