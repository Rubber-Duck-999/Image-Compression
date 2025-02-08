/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    'swagger-ui-react'
  ]
}

module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig;
