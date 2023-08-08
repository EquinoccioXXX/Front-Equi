/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/inicio',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['localhost'], // Agrega 'localhost' a los dominios permitidos
  },
};

module.exports = nextConfig;