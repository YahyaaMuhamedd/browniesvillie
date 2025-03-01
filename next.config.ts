import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.ibb.co'], // Add the domain here
  },
  env: {
    DOMAIN: 'https://brownies-villie-back-end.vercel.app/api/',
    TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I5ZTEyN2RiZmY1ZGUyYzRhOWY1ODkiLCJlbWFpbCI6Im11dGF6QGV4YW1wbGUuY29tIiwiaWF0IjoxNzQwMjQxMjgyLCJleHAiOjE3NDA1MDA0ODJ9.gRLDmYqV1UTTZo0M2Wxpe_XppBUtPMODYzSfXZq_JZg'
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
};

export default nextConfig;
