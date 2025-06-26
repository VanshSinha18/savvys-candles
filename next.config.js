/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ["example.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
