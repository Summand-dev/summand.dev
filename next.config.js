/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // i18n: {
  //   locales: ["en", "fa"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
  images: { unoptimized: true },
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
