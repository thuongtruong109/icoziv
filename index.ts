import {
  CONTENT,
  ERRORS,
  ICONS_PER_LINE,
  shortNames,
  THEMES,
} from './shared/index.js';
import {
  iconNameList,
  icons,
  themedIcons,
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
} from './utils/index.js';

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: CONTENT.JSON,
  });
}

function errorResponse(
  message: string,
  status = 400,
  asJson = false
): Response {
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

      const themeParam =
        searchParams.get('t') || searchParams.get('theme') || 'dark';
      if (!isValidTheme(themeParam, THEMES))
        return errorResponse(ERRORS.INVALID_THEME);

      const perLine = Number(searchParams.get('perline')) || ICONS_PER_LINE;
      if (Number.isNaN(perLine) || perLine < 1 || perLine > 50) {
        return errorResponse(ERRORS.INVALID_PERLINE);
      }

      const iconNames = parseIconsParam(
        iconParam,
        themeParam,
        iconNameList,
        shortNames,
        themedIcons
      );
      if (!iconNames.length) return errorResponse(ERRORS.NO_ICONS_FOUND);

      const svg = generateSvg(iconNames, icons, perLine);
      return new Response(svg, { headers: CONTENT.SVG });
    }

    case 'api/icons':
      return jsonResponse(iconNameList);

    case 'api/svgs':
      return jsonResponse(icons);

    default:
      return Response.redirect(
        'https://github.com/thuongtruong109/icoziv',
        302
      );
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
