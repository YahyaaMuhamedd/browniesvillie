import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.ibb.co'], // Add the domain here
  },
  env: {
    DOMAIN: 'https://brownies-villie-back-end.vercel.app/api/',
    TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2QyZjA2YzI5NzU5MTA5ODIzNjE5MzIiLCJlbWFpbCI6Im5hc2FzZHNhc0BleGFtcGxlLmNvbSIsImlhdCI6MTc0MTg4MDI1MiwiZXhwIjoxNzQzMDg5ODUyfQ.LM9MQODvBqhRPQaRACzWWpDdxTj4NbOuEKMnQVZ_WNc'
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
};

export default nextConfig;
