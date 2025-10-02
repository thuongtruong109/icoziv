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
  themedIcons: Set<string>
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

export function generateSvg(
  iconNames: string[],
  icons: Record<string, string>,
  perLine: number,
  baseSize = 300,
  margin = 44,
  scale = 48 / (300 - 44)
): string {
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const length =
    Math.min(perLine * baseSize, iconNames.length * baseSize) - margin;
  const height = Math.ceil(iconSvgList.length / perLine) * baseSize - margin;
  const scaledHeight = height * scale;
  const scaledWidth = length * scale;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}"
       fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">
    ${iconSvgList
      .map(
        (i, idx) => `
      <g transform="translate(${(idx % perLine) * baseSize}, ${
          Math.floor(idx / perLine) * baseSize
        })">
        ${i}
      </g>`
      )
      .join('')}
  </svg>`;
}
