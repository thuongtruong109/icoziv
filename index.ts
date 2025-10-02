import iconsJson from './dist/icons.json' with { type: "json" };
import type { Theme } from './types/index.js';
import {
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
} from './utils/index.js';

type IconsMap = Record<string, string>;
const icons: IconsMap = iconsJson as IconsMap;

const ICONS_PER_LINE = 15;
const THEMES: Theme[] = ['light', 'dark'];

const CONTENT = {
  JSON: { 'content-type': 'application/json;charset=UTF-8' },
  HTML: { 'content-type': 'text/html;charset=UTF-8' },
  SVG: { 'content-type': 'image/svg+xml' },
};

const ERRORS = {
  INVALID_THEME: `Theme must be ${THEMES.join(' or ')}`,
  INVALID_PERLINE: 'Icons per line must be a number between 1 and 50',
  NO_ICON_PARAM: 'You must specify ?i=icon1,icon2 or i=all',
  NO_ICONS_FOUND: 'No valid icons found from the given parameters',
  NOT_FOUND: 'Not found',
};

const shortNames: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
};

const iconNameList: string[] = [
  ...new Set(Object.keys(icons).map(i => i.split('-')[0])),
];

const themedIcons: Set<string> = new Set(
  Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0])
);

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: CONTENT.JSON,
  });
}

function errorResponse(message: string, status = 400, asJson = false): Response {
  return asJson
    ? jsonResponse({ error: message }, status)
    : new Response(message, { status });
}

async function handleRequest(request: Request): Promise<Response> {
  const { pathname, searchParams } = new URL(request.url);
  const path = normalizePath(pathname);

  switch (path) {
    case 'icons': {
      const iconParam = searchParams.get('i') || searchParams.get('icons');
      if (!iconParam) return errorResponse(ERRORS.NO_ICON_PARAM);

      const themeParam = searchParams.get('t') || searchParams.get('theme') || 'dark';
      if (!isValidTheme(themeParam, THEMES)) return errorResponse(ERRORS.INVALID_THEME);

      const perLine = Number(searchParams.get('perline')) || ICONS_PER_LINE;
      if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
        return errorResponse(ERRORS.INVALID_PERLINE);
      }

      const iconNames = parseIconsParam(iconParam, themeParam, iconNameList, shortNames, themedIcons);
      if (!iconNames.length) return errorResponse(ERRORS.NO_ICONS_FOUND);

      const svg = generateSvg(iconNames, icons, perLine);
      return new Response(svg, { headers: CONTENT.SVG });
    }

    case 'api/icons':
      return jsonResponse(iconNameList);

    case 'api/svgs':
      return jsonResponse(icons);

    case '':
      return new Response(
        `<h1>Alpicon Worker</h1>
         <p>Welcome! Try:</p>
         <ul>
           <li><a href="/icons?i=js,ts,go&t=dark">/icons?i=js,ts,go&t=dark</a></li>
           <li><a href="/api/icons">/api/icons</a></li>
           <li><a href="/api/svgs">/api/svgs</a></li>
         </ul>`,
        { headers: CONTENT.HTML }
      );

    default:
      return errorResponse(ERRORS.NOT_FOUND, 404);
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await handleRequest(request);
    } catch (err) {
      const message = (err as Error).stack || 'Internal Error';
      return errorResponse(message, 500, true);
    }
  },
};
