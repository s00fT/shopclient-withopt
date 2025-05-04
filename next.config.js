/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // 🔍 включаем анализ только при запуске с ANALYZE=true
})

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
  },
  images: {
    domains: ['loremflickr.com'], // ✅ для внешних изображений
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ отключает ошибки eslint при сборке
  },
}

module.exports = withBundleAnalyzer(nextConfig)
