import {
  CONTENT,
  ERRORS,
  ICONS_PER_LINE,
  shortNames,
  THEMES,
} from './shared/index.js';

import {
  loadIcons,
  getIcons,
  getIconNameList,
  getThemedIcons,
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
  errorResponse,
  jsonResponse,
} from './utils/index.js';

function checkETag(request: Request, etag: string): boolean {
  const ifNoneMatch = request.headers.get('If-None-Match');
  return ifNoneMatch === etag;
}

function enhanceResponseHeaders(
  response: Response,
  maxAge = 31536000,
): Response {
  const headers = new Headers(response.headers);

  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  headers.set('Access-Control-Max-Age', '86400');
  headers.set('CDN-Cache-Control', `public, max-age=${maxAge}`);
  headers.set('Vary', 'Accept-Encoding');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleRequest(
  request: Request,
  env: Env,
  _ctx: { waitUntil?: (promise: Promise<unknown>) => void },
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  console.log('bindings:', Object.keys(env));

  await loadIcons(env);

  const icons = getIcons();
  const iconNameList = getIconNameList();
  const themedIcons = getThemedIcons();

  const { pathname, searchParams } = new URL(request.url);
  const path = normalizePath(pathname);

  switch (path) {
    case 'icons': {
      const iconParam = searchParams.get('i') || searchParams.get('icons');
      if (!iconParam) {
        const errResponse = errorResponse(ERRORS.NO_ICON_PARAM);
        return enhanceResponseHeaders(errResponse, 3600);
      }

      const themeParam =
        searchParams.get('t') || searchParams.get('theme') || 'dark';
      if (!isValidTheme(themeParam, THEMES)) {
        const errResponse = errorResponse(ERRORS.INVALID_THEME);
        return enhanceResponseHeaders(errResponse, 3600);
      }

      const perLine = Number(searchParams.get('perline')) || ICONS_PER_LINE;
      if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
        const errResponse = errorResponse(ERRORS.INVALID_PERLINE);
        return enhanceResponseHeaders(errResponse, 3600);
      }

      const iconNames = parseIconsParam(
        iconParam,
        themeParam,
        iconNameList,
        shortNames,
        themedIcons,
      );

      if (!iconNames.length) {
        const errResponse = errorResponse(ERRORS.NO_ICONS_FOUND);
        return enhanceResponseHeaders(errResponse, 3600);
      }

      const etag = CONTENT.SVG.ETag || '"icons-svg-tag"';
      if (checkETag(request, etag)) {
        return new Response(null, { status: 304, headers: { ETag: etag } });
      }

      const svg = generateSvg(iconNames, icons, perLine);
      const response = new Response(svg, { headers: CONTENT.SVG });
      return enhanceResponseHeaders(response, 31536000);
    }

    case 'api/icons': {
      const etag = CONTENT.JSON.ETag || '"icons-json-tag"';
      if (checkETag(request, etag)) {
        return new Response(null, { status: 304, headers: { ETag: etag } });
      }

      const response = jsonResponse(iconNameList);
      return enhanceResponseHeaders(response, 86400);
    }

    case 'api/svgs': {
      const etag = CONTENT.JSON.ETag || '"icons-json-tag"';
      if (checkETag(request, etag)) {
        return new Response(null, { status: 304, headers: { ETag: etag } });
      }

      const response = jsonResponse(icons);
      return enhanceResponseHeaders(response, 86400);
    }

    default:
      return Response.redirect('https://thuongtruong109.github.io/icoziv', 302);
  }
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: { waitUntil: (promise: Promise<unknown>) => void },
  ): Promise<Response> {
    try {
      const response = await handleRequest(request, env, ctx);

      const url = new URL(request.url);
      if (request.method === 'GET' && !url.pathname.includes('redirect')) {
        const cacheKey = new Request(url.toString(), request);
        const cache =
          (caches as unknown as { default: Cache }).default || caches;
        ctx.waitUntil(
          (cache as Cache).put(cacheKey, response.clone()).catch(() => {
            // Silently ignore cache errors
          }),
        );
      }

      return response;
    } catch (err) {
      const message = (err as Error).stack || 'Internal Error';
      const errorResp = errorResponse(message, 500, true);
      return enhanceResponseHeaders(errorResp, 0);
    }
  },
};
