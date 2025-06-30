<<<<<<< HEAD
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
=======
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript: {
>>>>>>> c15284b00db3931ae0616bc79dcf2837901b639f
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
