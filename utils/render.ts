import type { BackgroundParam } from '../types/index.js';

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

function formatNumber(value: number): string {
  return Number(value.toFixed(4)).toString();
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
  const viewBoxPadding = padding / scale;
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const contentWidth =
    Math.min(perLine * baseSize, iconNames.length * baseSize) - margin;
  const contentHeight =
    Math.ceil(iconSvgList.length / perLine) * baseSize - margin;
  const paddedWidth = contentWidth + viewBoxPadding * 2;
  const paddedHeight = contentHeight + viewBoxPadding * 2;
  const renderedHeight = contentHeight * scale + padding * 2;
  const renderedWidth = contentWidth * scale + padding * 2;

  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${formatNumber(viewBoxPadding + (idx % perLine) * baseSize)},${formatNumber(viewBoxPadding + Math.floor(idx / perLine) * baseSize)})">${i}</g>`,
    )
    .join('');

  let backgroundMarkup = '';
  if (background?.type === 'color') {
    backgroundMarkup = `<rect width="${formatNumber(paddedWidth)}" height="${formatNumber(paddedHeight)}" fill="${escapeAttr(background.value)}"/>`;
  } else if (background?.type === 'image') {
    const href = escapeAttr(background.value);
    backgroundMarkup = `<image href="${href}" x="0" y="0" width="${formatNumber(paddedWidth)}" height="${formatNumber(paddedHeight)}" preserveAspectRatio="xMidYMid slice"/>`;
  }

  const svg = `<svg width="${formatNumber(renderedWidth)}" height="${formatNumber(renderedHeight)}" viewBox="0 0 ${formatNumber(paddedWidth)} ${formatNumber(paddedHeight)}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${backgroundMarkup}${groups}</svg>`;

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
