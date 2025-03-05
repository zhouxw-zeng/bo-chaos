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
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/bofans_admin/review",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
