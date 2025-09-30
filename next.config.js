/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel deployment: file uploads should use S3/external storage
  // For local dev, files go to public/uploads
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // For resume uploads
    }
  }
}

module.exports = nextConfig