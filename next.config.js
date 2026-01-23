/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development to help identify bugs
  reactStrictMode: true,

  // Image optimization
  images: {
    unoptimized: false,
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },

  // Code splitting and optimization
  swcMinify: true,

  // Compression
  compress: true,

  // Enable experimental features for better performance
  experimental: {
    // This will reduce the size of the JS bundle
    optimizePackageImports: ['react', 'react-dom', 'next'],
  },

  // Custom webpack configuration for optimization
  webpack: (config, { isServer }) => {
    // Disable minification for development to speed up builds
    if (!isServer) {
      config.optimization.minimize = false
    }

    return config
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for common paths
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
