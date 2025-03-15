/** @type {import('next').NextConfig} */
const nextConfig = {
  // Nuqs için gerekli yapılandırma
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Harici görüntü kaynaklarını yapılandırma
  images: {
    domains: ['rickandmortyapi.com'],
  },
};

module.exports = nextConfig; 