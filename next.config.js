/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Forwarded-Host',
            value: process.env.NEXT_PUBLIC_TUNNEL_URL || '',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
