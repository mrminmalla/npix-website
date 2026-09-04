import type { NextConfig } from "next";

// Member logos, team photos, and other CMS-uploaded images are served by
// the backend's asset store (local disk in dev, MinIO/S3 in production) at
// an absolute URL — next/image requires that host to be explicitly
// allow-listed. Defaults match the local dev API.
const assetHostname = process.env.ASSET_HOST_HOSTNAME ?? "localhost";
const assetPort = process.env.ASSET_HOST_PORT ?? "4100";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: assetHostname, port: assetPort, pathname: "/uploads/**" },
      { protocol: "https", hostname: assetHostname, pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
