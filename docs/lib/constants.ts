import type {
  BadgeBorderRadius,
  BadgeBorderStyle,
  BadgeBorderWidth,
  BadgeGap,
  BadgeGroupStyle,
  BadgeShadow,
  IconCategory,
} from '@/types/icon';

export const BADGE_BASE_URL = 'https://i.icoziv.workers.dev';
export const ICON_ASSET_BASE_URL =
  'https://raw.githubusercontent.com/thuongtruong109/icoziv/main/icons';
export const ICON_DATA_PATH = '/icoziv.json';
export const REPOSITORY_URL = 'https://github.com/thuongtruong109/icoziv';
export const LOGO_URL =
  'https://raw.githubusercontent.com/thuongtruong109/icoziv/main/public/logo.png';
export const BADGE_GAP_OPTIONS: BadgeGap[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const BADGE_BORDER_WIDTH_OPTIONS: Array<{
  value: BadgeBorderWidth;
  label: string;
  pixels: number;
}> = [
  { value: 'none', label: 'None', pixels: 0 },
  { value: 'thin', label: 'Thin', pixels: 1 },
  { value: 'medium', label: 'Medium', pixels: 2 },
  { value: 'bold', label: 'Bold', pixels: 3 },
];
export const BADGE_BORDER_STYLE_OPTIONS: Array<{
  value: BadgeBorderStyle;
  label: string;
}> = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
];
export const BADGE_BORDER_RADIUS_OPTIONS: Array<{
  value: BadgeBorderRadius;
  label: string;
  pixels: number;
}> = [
  { value: 'none', label: 'None', pixels: 0 },
  { value: 'xs', label: 'XS', pixels: 2 },
  { value: 'sm', label: 'SM', pixels: 4 },
  { value: 'md', label: 'MD', pixels: 8 },
  { value: 'lg', label: 'LG', pixels: 12 },
  { value: 'xl', label: 'XL', pixels: 16 },
];
export const BADGE_SHADOW_OPTIONS: Array<{
  value: BadgeShadow;
  label: string;
}> = [
  { value: 'none', label: 'None' },
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'SM' },
  { value: 'md', label: 'MD' },
  { value: 'lg', label: 'LG' },
  { value: 'xl', label: 'XL' },
];
export const BADGE_GROUP_STYLE_OPTIONS: Array<{
  value: BadgeGroupStyle;
  label: string;
  description: string;
}> = [
  { value: 'none', label: 'None', description: 'One continuous icon grid' },
  {
    value: 'card',
    label: 'Card',
    description: 'Framed groups with label pills',
  },
  { value: 'label', label: 'Label', description: 'Headings with subtle rules' },
  {
    value: 'divider',
    label: 'Divider',
    description: 'Compact groups with separators',
  },
];

export const DEMO_ICONS = [
  'reactjs',
  'typescript',
  'nodejs',
  'docker',
  'postgresql',
];

export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
}

export const CATEGORY_OPTIONS: Array<{
  value: IconCategory | 'all';
  label: string;
}> = [
  { value: 'all', label: 'All icons' },
  { value: 'frameworks', label: 'Frameworks' },
  { value: 'languages', label: 'Languages' },
  { value: 'tools', label: 'Tools & IDEs' },
  { value: 'databases', label: 'Databases' },
  { value: 'cloud', label: 'Cloud & DevOps' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Design' },
  { value: 'testing', label: 'Testing' },
  { value: 'ai', label: 'AI & Data' },
  { value: 'other', label: 'Other' },
];

export const CATEGORY_KEYWORDS: Record<IconCategory, string[]> = {
  frameworks: [
    'react',
    'angular',
    'vue',
    'svelte',
    'next',
    'nuxt',
    'astro',
    'remix',
    'solid',
    'preact',
    'django',
    'flask',
    'laravel',
    'rails',
    'spring',
    'express',
    'nestjs',
  ],
  languages: [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cplusplus',
    'golang',
    'rust',
    'php',
    'ruby',
    'swift',
    'kotlin',
    'dart',
    'scala',
    'elixir',
    'haskell',
    'lua',
    'solidity',
    'zig',
  ],
  tools: [
    'git',
    'github',
    'gitlab',
    'vscode',
    'visualstudio',
    'webstorm',
    'pycharm',
    'vim',
    'neovim',
    'postman',
    'webpack',
    'vite',
    'rollup',
    'npm',
    'pnpm',
    'yarn',
    'bun',
  ],
  databases: [
    'mongodb',
    'postgres',
    'mysql',
    'redis',
    'sqlite',
    'mariadb',
    'oracle',
    'dynamodb',
    'cassandra',
    'firebase',
    'supabase',
    'prisma',
    'graphql',
    'elasticsearch',
  ],
  cloud: [
    'aws',
    'amazonwebservices',
    'azure',
    'googlecloud',
    'cloudflare',
    'vercel',
    'netlify',
    'docker',
    'kubernetes',
    'terraform',
    'ansible',
    'jenkins',
    'grafana',
  ],
  mobile: [
    'android',
    'ios',
    'flutter',
    'reactnative',
    'ionic',
    'capacitor',
    'xamarin',
    'expo',
  ],
  design: [
    'figma',
    'sketch',
    'adobe',
    'photoshop',
    'illustrator',
    'xd',
    'canva',
    'blender',
    'framer',
  ],
  testing: [
    'jest',
    'vitest',
    'cypress',
    'playwright',
    'selenium',
    'mocha',
    'jasmine',
    'storybook',
  ],
  ai: [
    'openai',
    'anthropic',
    'tensorflow',
    'pytorch',
    'keras',
    'huggingface',
    'langchain',
    'jupyter',
    'numpy',
    'pandas',
  ],
  other: [],
};
