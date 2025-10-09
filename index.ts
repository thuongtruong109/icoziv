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

async function handleRequest(request: Request): Promise<Response> {
  await loadIcons();

  const icons = getIcons();
  const iconNameList = getIconNameList();
  const themedIcons = getThemedIcons(); // ✅ Set<string>

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
      if (Number.isNaN(perLine) || perLine < 1 || perLine > 50)
        return errorResponse(ERRORS.INVALID_PERLINE);

      const iconNames = parseIconsParam(
        iconParam,
        themeParam,
        iconNameList,
        shortNames,
        themedIcons,
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
      return Response.redirect('https://thuongtruong109.github.io/icoziv', 302);
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
