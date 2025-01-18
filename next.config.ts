/** @type {import('next').NextConfig} */

import { NextConfig } from "next"

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        canvas: false,
        'pdf-parse': false,
        https: false,
        http: false,
        url: false,
      }
    }
    return config
  },
  experimental: {
    turbo: {
      resolveAlias: {
        canvas: "./empty-module.ts"
      }
    }
  }
}

module.exports = nextConfig