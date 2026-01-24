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
  allowedDevOrigins: ['192.168.1.38'],
  async redirects() {
    return [
      {
        source: '/rcn',
        destination: '/blogs/rcn',
        permanent: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/haydenso',
        permanent: false,
      },
      {
        source: '/twitter',
        destination: 'https://x.com/haydsso',
        permanent: false,
      },
      {
        source: '/x',
        destination: 'https://x.com/haydsso',
        permanent: false,
      },
      {
        source: '/scholar',
        destination: 'https://scholar.google.com/citations?user=B1qjlbQAAAAJ&hl=en',
        permanent: false,
      },
      {
        source: '/linkedin',
        destination: 'https://www.linkedin.com/in/haydenso/',
        permanent: false,
      },
      {
        source: '/email',
        destination: 'mailto:haydenso.hk@gmail.com',
        permanent: false,
      },
      {
        source: '/mail',
        destination: 'mailto:haydenso.hk@gmail.com',
        permanent: false,
      },
      // Blog shortlinks - redirect /slug to /blogs/slug
      {
        source: '/ChinaAI',
        destination: '/blogs/chinaai',
        permanent: false,
      },
      {
        source: '/chinaai',
        destination: '/blogs/chinaai',
        permanent: false,
      },
      {
        source: '/ChinaMAIM',
        destination: '/blogs/chinamaim',
        permanent: false,
      },
      {
        source: '/chinamaim',
        destination: '/blogs/chinamaim',
        permanent: false,
      },
      {
        source: '/rollups-rl',
        destination: '/blogs/rollup-rl',
        permanent: false,
      },
      {
        source: '/functions',
        destination: '/blogs/functions',
        permanent: false,
      },
      {
        source: '/players',
        destination: '/blogs/players',
        permanent: false,
      },
      {
        source: '/compass',
        destination: '/blogs/compass',
        permanent: false,
      },
      {
        source: '/swings',
        destination: '/blogs/swings',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
