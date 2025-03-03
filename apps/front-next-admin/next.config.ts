import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  rewrites: async () => {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "http://localhost:3000/bofans/:path*",
      // },
      {
        source: "/api/:path*",
        destination: "https://yuanbo.online/rpg/bofans/:path*",
      },
    ];
  },
};

export default nextConfig;
