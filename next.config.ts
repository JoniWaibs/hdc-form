import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://edqkxwgbbunlomuzarwt.supabase.co",
    "https://jvevtkznriglypumdjvy.supabase.co",
    "https://www.mercadopago.com",
    ...(process.env.NODE_ENV === "development" && process.env.APP_URL
      ? [process.env.APP_URL]
      : []),
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development" && process.env.APP_URL
                ? process.env.APP_URL
                : "*",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      new URL(
        "https://edqkxwgbbunlomuzarwt.supabase.co/storage/v1/object/public/assets/**"
      ),
    ],
  },
};

export default nextConfig;
