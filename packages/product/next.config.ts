import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: '../../tsconfig.app.json',
  },
};

export default nextConfig;
