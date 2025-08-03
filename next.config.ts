/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // This might be your existing pattern for another service
      {
        protocol: 'https',
        hostname: 'd8iqbmvu05s9c.cloudfront.net',
        pathname: '/**',
      },
      // ✅ Add the new pattern for Cloudinary
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },

    ],
  },
  eslint: {
    // Your other configurations...
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;