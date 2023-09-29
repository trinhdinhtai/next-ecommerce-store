import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "uploadthing.com",
      },
    ],
  },
}

export default nextConfig
