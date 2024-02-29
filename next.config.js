/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/dash/:path*",
        destination: "/dashboard/",
      },
    ];
  },
};

module.exports = nextConfig;
