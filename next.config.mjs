/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "shopping-phinf.pstatic.net",
      },
    ],
  },
  env: {
    NAVER_CLIENT_ID: "BoJTxbnp8XfeqDvtDwHc",
    NAVER_CLIENT_SECRET: "wUmPD8WYJB",
    NEXTAUTH_URL: isProd
      ? "https://mine-shopping.vercel.app/"
      : "http://localhost:3000/",
  },
};

export default nextConfig;
