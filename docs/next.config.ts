import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const repositoryBasePath = '/icoziv';

const nextConfig: NextConfig = {
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? repositoryBasePath : '',
  },
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? repositoryBasePath : '',
  assetPrefix: isGitHubPages ? repositoryBasePath : '',
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
