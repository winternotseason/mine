
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "shopping-phinf.pstatic.net",
      },
      {
        hostname : "res.cloudinary.com"
      }
    ],
  },
};

export default nextConfig;
