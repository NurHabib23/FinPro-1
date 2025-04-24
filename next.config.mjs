/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This is the key part - we're excluding all App Router features from the build
  experimental: {
    appDir: false, // Disable App Router completely
  },
  webpack: (config, { isServer }) => {
    // Add a rule to ignore all App Router features
    config.module.rules.push({
      test: /next\/headers|next\/navigation|use server/,
      use: 'null-loader',
    });
    
    return config;
  },
}

export default nextConfig
