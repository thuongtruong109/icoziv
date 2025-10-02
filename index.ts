import iconsJson from './dist/icons.json';

type IconsMap = Record<string, string>;
const icons: IconsMap = iconsJson as IconsMap;

const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const BASE_SIZE = 300;
const MARGIN = 44;
const SCALE = ONE_ICON / (BASE_SIZE - MARGIN);
const THEMES = ['light', 'dark'] as const;

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
const themedIcons: string[] = [
  ...new Set(
    Object.keys(icons)
      .filter(i => i.includes('-light') || i.includes('-dark'))
      .map(i => i.split('-')[0])
  ),
];

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  });
}

function errorResponse(message: string, status = 400): Response {
  return new Response(message, { status });
}

function generateSvg(iconNames: string[], perLine: number): string {
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);

  const length =
    Math.min(perLine * BASE_SIZE, iconNames.length * BASE_SIZE) - MARGIN;
  const height = Math.ceil(iconSvgList.length / perLine) * BASE_SIZE - MARGIN;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}"
       fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
    ${iconSvgList
      .map(
        (i, idx) => `
      <g transform="translate(${(idx % perLine) * BASE_SIZE}, ${
          Math.floor(idx / perLine) * BASE_SIZE
        })">
        ${i}
      </g>`
      )
      .join('')}
  </svg>`;
}

function parseShortNames(names: string[], theme: string = 'dark'): string[] {
  return names
    .map(name => {
      const resolved = iconNameList.includes(name) ? name : shortNames[name];
      if (!resolved) return null;
      const themed = themedIcons.includes(resolved)
        ? `${resolved}-${theme}`
        : resolved;
      return themed;
    })
    .filter((n): n is string => Boolean(n));
}

async function handleRequest(request: Request): Promise<Response> {
  const { pathname, searchParams } = new URL(request.url);
  const path = pathname.replace(/^\/|\/$/g, '');

  if (path === 'icons') {
    const iconParam = searchParams.get('i') || searchParams.get('icons');
    if (!iconParam)
      return errorResponse('You must specify ?i=icon1,icon2 or i=all');

    const theme = searchParams.get('t') || searchParams.get('theme') || 'dark';
    if (!THEMES.includes(theme as any))
      return errorResponse(`Theme must be ${THEMES.join(' or ')}`);

    const perLine = Number(searchParams.get('perline')) || ICONS_PER_LINE;
    if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
      return errorResponse('Icons per line must be a number between 1 and 50');
    }

    const iconShortNames =
      iconParam === 'all' ? iconNameList : iconParam.split(',');
    const iconNames = parseShortNames(iconShortNames, theme);
    if (!iconNames.length)
      return errorResponse('No valid icons found from the given parameters');

    const svg = generateSvg(iconNames, perLine);
    return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
  } else if (path === 'api/icons') {
    return jsonResponse(iconNameList);
  } else if (path === 'api/svgs') {
    return jsonResponse(icons);
  } else if (path === '') {
    return new Response(
      `<h1>Alpicon Worker</h1>
       <p>Welcome! Try:</p>
       <ul>
         <li><a href="/icons?i=js,ts,go&t=dark">/icons?i=js,ts,go&t=dark</a></li>
         <li><a href="/api/icons">/api/icons</a></li>
         <li><a href="/api/svgs">/api/svgs</a></li>
       </ul>`,
      { headers: { 'content-type': 'text/html;charset=UTF-8' } }
    );
  } else {
    return errorResponse('Not found', 404);
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      return await handleRequest(request);
    } catch (err) {
      return errorResponse((err as Error).stack || 'Internal Error', 500);
    }
  },
};
