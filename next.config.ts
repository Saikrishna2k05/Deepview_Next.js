import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd8iqbmvu05s9c.cloudfront.net',
        port: '',
        pathname: '/**', // This allows any path from the specified hostname
      },
    ],
  },
};

export default nextConfig;