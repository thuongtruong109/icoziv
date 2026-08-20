import type { BackgroundParam } from './validation.js';

const _svgCache = new Map<string, string>();
const MAX_CACHE_SIZE = 100;

export function clearSvgCache(): void {
  _svgCache.clear();
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateSvg(
  iconNames: string[],
  icons: Record<string, string>,
  perLine: number,
  background: BackgroundParam | null = null,
  baseSize = 300,
  margin = 44,
  padding = 0,
  scale = 48 / (300 - 44),
): string {
  const cacheKey = `${iconNames.join(',')}-${perLine}-${background?.type || 'none'}-${background?.value || 'none'}-${baseSize}-${margin}-${padding}-${scale}`;

  if (_svgCache.has(cacheKey)) {
    return _svgCache.get(cacheKey)!;
  }
  const scaledPadding = padding * 10;
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const contentWidth =
    Math.min(perLine * baseSize, iconNames.length * baseSize) - margin;
  const contentHeight =
    Math.ceil(iconSvgList.length / perLine) * baseSize - margin;
  const paddedWidth = contentWidth + scaledPadding * 2;
  const paddedHeight = contentHeight + scaledPadding * 2;
  const scaledHeight = paddedHeight * scale;
  const scaledWidth = paddedWidth * scale;

  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${scaledPadding + (idx % perLine) * baseSize},${scaledPadding + Math.floor(idx / perLine) * baseSize})">${i}</g>`,
    )
    .join('');

  let backgroundMarkup = '';
  if (background?.type === 'color') {
    backgroundMarkup = `<rect width="${paddedWidth}" height="${paddedHeight}" fill="${escapeAttr(background.value)}"/>`;
  } else if (background?.type === 'image') {
    const href = escapeAttr(background.value);
    backgroundMarkup = `<image href="${href}" x="0" y="0" width="${paddedWidth}" height="${paddedHeight}" preserveAspectRatio="xMidYMid slice"/>`;
  }

  const svg = `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${paddedWidth} ${paddedHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${backgroundMarkup}${groups}</svg>`;

  // Cache the result (with LRU-like behavior)
  if (_svgCache.size >= MAX_CACHE_SIZE) {
    const firstKey = _svgCache.keys().next().value;
    if (firstKey) {
      _svgCache.delete(firstKey);
    }
  }
  _svgCache.set(cacheKey, svg);

  return svg;
}
