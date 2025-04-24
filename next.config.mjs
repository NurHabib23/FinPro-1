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
  experimental: {
    serverComponentsExternalPackages: ['@supabase/auth-helpers-nextjs'],
  },
  webpack: (config, { isServer }) => {
    // This is to handle the App Router vs Pages Router conflict
    if (!isServer) {
      // Don't resolve 'next/headers' on the client to avoid error
      config.resolve.alias['next/headers'] = 'next/dist/client/components/headers-noop'
    }
    return config
  },
}

export default nextConfig
