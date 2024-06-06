/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["img.clerk.com", "www.google.com", "aigeneratorkit.com"],
  },
};

export default nextConfig;
