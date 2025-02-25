import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.ibb.co'], // Add the domain here
  },
  env: {
    DOMAIN: 'https://brownies-villie-back-end.vercel.app/api/'
  }
};

export default nextConfig;
