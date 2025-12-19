/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/scmp/:path*',
        destination: 'https://haydenso.github.io/scmp/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
