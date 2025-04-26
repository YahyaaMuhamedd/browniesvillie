import type { NextConfig } from "next";



const withBundleAnalyzer =
  process.env.ANALYZE === 'true'
    ? require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    : null;


const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    if (!isServer && withBundleAnalyzer) {
      config.plugins.push(new withBundleAnalyzer());
    }
    return config;
  },
  swcMinify: true,
  images: {
    domains: ['i.ibb.co'], // Add the domain here
  },
  env: {
    DOMAIN: 'https://brownies-villie-back-end.vercel.app/api/',
    TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QyZjA2YzI5NzU5MTA5ODIzNjE5MzIiLCJlbWFpbCI6Im5hc2FzZHNhc0BleGFtcGxlLmNvbSIsImlhdCI6MTc0NTUwMzY1MCwiZXhwIjoxNzQ2MTA4NDUwfQ.hFdjwEuqv_-GO6CIHVPHPa12zF-8KLJptkiNTFx7yhg'
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
};

export default nextConfig;
