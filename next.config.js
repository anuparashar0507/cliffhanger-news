/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the app directory
  experimental: {
    appDir: true,
  },
  
  // Image optimization configuration
  images: {
    domains: [
      'localhost',
      'your-api-domain.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Transpile packages for compatibility
  transpilePackages: ['lucide-react'],
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Asset optimization
  compress: true,
  
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      // Add any redirects from old routes to new routes here
    ];
  },
};

module.exports = nextConfig;