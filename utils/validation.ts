import { CONTENT } from '../shared/index.js';
import { Theme } from '../types/index.js';

export function isValidTheme(theme: string, themes: Theme[]): theme is Theme {
  return themes.includes(theme as Theme);
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/^\/|\/$/g, '');
}

export function parseIconsParam(
  param: string | null,
  theme: Theme,
  iconNameList: string[],
  shortNames: Record<string, string>,
  themedIcons: Set<string>,
): string[] {
  if (!param) return [];
  const requested = param === 'all' ? iconNameList : param.split(',');
  return requested
    .map(name => {
      const resolved = iconNameList.includes(name) ? name : shortNames[name];
      if (!resolved) return null;
      return themedIcons.has(resolved) ? `${resolved}-${theme}` : resolved;
    })
    .filter((n): n is string => Boolean(n));
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: CONTENT.JSON,
  });
}

export function errorResponse(
  message: string,
  status = 400,
  asJson = false,
): Response {
  return asJson
    ? jsonResponse({ error: message }, status)
    : new Response(message, { status });
}
