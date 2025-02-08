/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: [
    'swagger-ui-react'
  ]
}

export default nextConfig;
