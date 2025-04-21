import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["http://localhost:3000", "http://localhost:3001", "https://edqkxwgbbunlomuzarwt.supabase.co"],
  images: {
    remotePatterns: [new URL('https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/**')],
  },
};

export default nextConfig;
