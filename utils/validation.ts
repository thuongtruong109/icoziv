import { CONTENT } from '../shared/index.js';
import { Theme } from '../types/index.js';

export function isValidTheme(theme: string, themes: Theme[]): theme is Theme {
  return themes.includes(theme as Theme);
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/^\/|\/$/g, '');
}

// Cache for parsed icon parameters
const _parseCache = new Map<string, string[]>();
const MAX_PARSE_CACHE_SIZE = 50;

/**
 * Clear the parse cache. Useful for testing or memory management.
 */
export function clearParseCache(): void {
  _parseCache.clear();
}

export function parseIconsParam(
  param: string | null,
  theme: Theme,
  iconNameList: string[],
  shortNames: Record<string, string>,
  themedIcons: Set<string>,
): string[] {
  if (!param) return [];

  // Check cache
  const cacheKey = `${param}-${theme}`;
  if (_parseCache.has(cacheKey)) {
    return _parseCache.get(cacheKey)!;
  }

  const requested =
    param === 'all'
      ? iconNameList.slice()
      : param
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean);

  const seen = new Set<string>();
  const out: string[] = [];

  for (let raw of requested) {
    const m = raw.match(/^(.*)-(light|dark)$/);
    let explicitSuffix: 'light' | 'dark' | null = null;
    if (m) {
      raw = m[1];
      explicitSuffix = m[2] as 'light' | 'dark';
    }

    const resolved = iconNameList.includes(raw) ? raw : shortNames[raw];
    if (!resolved) continue;

    const finalName = explicitSuffix
      ? `${resolved}-${explicitSuffix}`
      : themedIcons.has(resolved)
        ? `${resolved}-${theme}`
        : resolved;

    if (!seen.has(finalName)) {
      seen.add(finalName);
      out.push(finalName);
    }
  }

  // Cache the result (with LRU-like behavior)
  if (_parseCache.size >= MAX_PARSE_CACHE_SIZE) {
    const firstKey = _parseCache.keys().next().value;
    if (firstKey) {
      _parseCache.delete(firstKey);
    }
  }
  _parseCache.set(cacheKey, out);

  return out;
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
