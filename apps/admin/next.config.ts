import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Talks only to the backend API — never touches the DB or the public
  // frontend directly.
};

export default nextConfig;
