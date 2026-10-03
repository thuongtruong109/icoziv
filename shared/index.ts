import {
  BorderRadiusLevel,
  BorderStyle,
  BorderWidthLevel,
  GapLevel,
  GroupStyle,
  ShadowLevel,
  Theme,
} from '../types/index.js';

export const ICONS_PER_LINE = 15;
export const THEMES: Theme[] = ['light', 'dark'];
export const DEFAULT_GAP: GapLevel = 'sm';
export const GAP_LEVELS: GapLevel[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const DEFAULT_BORDER_WIDTH: BorderWidthLevel = 'none';
export const DEFAULT_BORDER_COLOR = 'transparent';
export const DEFAULT_BORDER_STYLE: BorderStyle = 'solid';
export const DEFAULT_BORDER_RADIUS: BorderRadiusLevel = 'none';
export const DEFAULT_SHADOW: ShadowLevel = 'none';
export const DEFAULT_GROUP_STYLE: GroupStyle = 'card';
export const BORDER_WIDTH_LEVELS: BorderWidthLevel[] = [
  'thin',
  'medium',
  'bold',
];
export const BORDER_STYLES: BorderStyle[] = ['solid', 'dashed', 'dotted'];
export const BORDER_RADIUS_LEVELS: BorderRadiusLevel[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
];
export const SHADOW_LEVELS: ShadowLevel[] = ['xs', 'sm', 'md', 'lg', 'xl'];
export const GROUP_STYLES: GroupStyle[] = ['card', 'label', 'divider'];

export const CONTENT = {
  JSON: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    Vary: 'Accept-Encoding',
  },
  HTML: {
    'Content-Type': 'text/html;charset=UTF-8',
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    Vary: 'Accept-Encoding',
  },
  SVG: {
    'Content-Type': 'image/svg+xml',
    'Cache-Control':
      'public, max-age=31536000, immutable, stale-while-revalidate=86400',
    Vary: 'Accept-Encoding',
  },
};

export const ERRORS = {
  INVALID_THEME: `Theme must be ${THEMES.join(' or ')}`,
  INVALID_PERLINE: 'Icons per line must be a number between 1 and 50',
  INVALID_GAP: `Gap must be ${GAP_LEVELS.join(', ')}`,
  INVALID_BORDER_WIDTH: `Border must be ${BORDER_WIDTH_LEVELS.join(', ')}`,
  INVALID_BORDER_STYLE: `Border style must be ${BORDER_STYLES.join(', ')}`,
  INVALID_BORDER_RADIUS: `Rounded must be ${BORDER_RADIUS_LEVELS.join(', ')}`,
  INVALID_SHADOW: `Shadow must be ${SHADOW_LEVELS.join(', ')}`,
  INVALID_GROUP_STYLE: `Group style must be ${GROUP_STYLES.join(', ')}`,
  INVALID_GROUPS:
    'Groups must use Label:icon1,icon2 separated by | with labels up to 40 characters',
  INVALID_BORDER_COLOR:
    'Border color must be transparent or a 3, 4, 6, or 8-digit hex color',
  INVALID_PADDING: 'Padding must be a whole number of pixels between 0 and 200',
  INVALID_BG: 'Background must be a hex color or an HTTPS image URL',
  NO_ICON_PARAM: 'You must specify ?i=icon1,icon2 or i=all',
  NO_ICONS_FOUND: 'No valid icons found from the given parameters',
  NOT_FOUND: 'Not found',
};

export const shortNames: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  rb: 'ruby',
  rs: 'rust',
  go: 'golang',
  cs: 'csharp',
  'c#': 'csharp',
  cpp: 'cplusplus',
  'c++': 'cplusplus',
  sh: 'bash',
  zsh: 'zshell',
  bat: 'batch',
  pwsh: 'powershell',
  ps1: 'powershell',
  md: 'markdown',
  wasm: 'webassembly',
  vb: 'visualbasic',
  sc: 'scala',
  asm: 'assembly',
  tailwind: 'tailwindcss',
  tw: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  react: 'reactjs',
  next: 'nextjs',
  angular: 'angularjs',
  ng: 'angularjs',
  svelte: 'svelte',
  sv: 'svelte',
  bs: 'bootstrap',
  mui: 'materialui',
  windi: 'windicss',
  bulma: 'bulmacss',
  post: 'postcss',
  express: 'expressjs',
  nest: 'nestjs',
  dj: 'django',
  drf: 'djangorestframework',
  flask: 'flask',
  fast: 'fastapi',
  sb: 'springboot',
  spring: 'springboot',
  gql: 'graphql',
  ktorio: 'ktor',
  aws: 'amazonwebservices',
  amz: 'amazonwebservices',
  gcp: 'googlecloud',
  cf: 'cloudflare',
  k8s: 'kubernetes',
  pod: 'podman',
  ans: 'ansible',
  tf: 'terraform',
  do: 'digitalocean',
  pg: 'postgresql',
  pgsql: 'postgresql',
  mongo: 'mongodb',
  elk: 'elasticsearch',
  rmq: 'rabbitmq',
  mac: 'macos',
  win: 'windows',
  arch: 'archlinux',
  alpine: 'alpinelinux',
  gh: 'github',
  gl: 'gitlab',
  bb: 'bitbucket',
  ghactions: 'githubactions',
  vs: 'visualstudio',
  vscode: 'visualstudiocode',
  idea: 'intellijidea',
  ij: 'intellijidea',
  vi: 'vim',
  nvim: 'neovim',
  rollup: 'rollupjs',
  esb: 'esbuild',
  ps: 'adobephotoshop',
  ai: 'adobeillustrator',
  pr: 'adobepremiere',
  ae: 'adobeaftereffects',
  id: 'adobeindesign',
  au: 'adobeaudition',
  np: 'numpy',
  pd: 'pandas',
  plt: 'matplotlib',
  sklearn: 'scikitlearn',
  ga: 'googleanalytics',
  chart: 'chartjs',
  gr: 'gradio',
  st: 'streamlit',
  langchain: 'langchain',
  bots: 'discordbots',
  gatsbyjs: 'gatsby',
  unreal: 'unrealengine',
  fcad: 'freecad',
  gas: 'googleappsscript',
  fm: 'framermotion',
  o365: 'microsoftoffice',
  word: 'microsoftword',
  pp: 'microsoftpowerpoint',
  msteams: 'microsoftteams',
};
