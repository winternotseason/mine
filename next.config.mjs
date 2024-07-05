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
    MONGODB_URI:
      "mongodb+srv://xitseo:ajvls450@universe.bpzvwux.mongodb.net/?retryWrites=true&w=majority&appName=universe",
    NAVER_CLIENT_ID: "s9DWSCUnEC9rmTGQgmdN",
    NAVER_CLIENT_SECRET: "EiRdq0AC6D",
    MONGODB_PASSWORD: "alswjd0101",
    AUTH_URL: isProd
      ? "https://mine-shopping.vercel.app/"
      : "http://127.0.0.1:3000/",
  },
};

export default nextConfig;
