import { DEFAULT_GAP } from '../shared/index.js';
import type { BackgroundParam, GapLevel } from '../types/index.js';

const ICON_VIEWBOX_SIZE = 256;
const OUTPUT_ICON_SIZE = 48;
const OUTPUT_SCALE = OUTPUT_ICON_SIZE / ICON_VIEWBOX_SIZE;

// The existing 44-unit spacing is `sm`; the other levels scale around it.
const GAP_VIEWBOX_UNITS: Record<GapLevel, number> = {
  xs: 22,
  sm: 44,
  md: 66,
  lg: 88,
  xl: 132,
};

export interface SvgRenderOptions {
  background?: BackgroundParam | null;
  gap?: GapLevel;
  padding?: number;
}

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
  options: SvgRenderOptions = {},
): string {
  const { background = null, gap = DEFAULT_GAP, padding = 0 } = options;
  const gapUnits = GAP_VIEWBOX_UNITS[gap];
  const iconStep = ICON_VIEWBOX_SIZE + gapUnits;
  const cacheKey = `${iconNames.join(',')}-${perLine}-${background?.type || 'none'}-${background?.value || 'none'}-${gap}-${padding}`;

  if (_svgCache.has(cacheKey)) {
    return _svgCache.get(cacheKey)!;
  }
  const viewBoxPadding = padding / OUTPUT_SCALE;
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const columns = Math.min(perLine, iconSvgList.length);
  const rows = Math.ceil(iconSvgList.length / perLine);
  const contentWidth =
    columns * ICON_VIEWBOX_SIZE + Math.max(0, columns - 1) * gapUnits;
  const contentHeight =
    rows * ICON_VIEWBOX_SIZE + Math.max(0, rows - 1) * gapUnits;
  const paddedWidth = contentWidth + viewBoxPadding * 2;
  const paddedHeight = contentHeight + viewBoxPadding * 2;
  const renderedHeight = contentHeight * OUTPUT_SCALE + padding * 2;
  const renderedWidth = contentWidth * OUTPUT_SCALE + padding * 2;

  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${formatNumber(viewBoxPadding + (idx % perLine) * iconStep)},${formatNumber(viewBoxPadding + Math.floor(idx / perLine) * iconStep)})">${i}</g>`,
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
