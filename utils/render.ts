import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_GAP,
} from '../shared/index.js';
import type {
  BackgroundParam,
  BorderRadiusLevel,
  BorderStyle,
  BorderWidthLevel,
  GapLevel,
} from '../types/index.js';

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

const BORDER_WIDTH_PIXELS: Record<BorderWidthLevel, number> = {
  none: 0,
  thin: 1,
  medium: 2,
  bold: 3,
};

const BORDER_RADIUS_PIXELS: Record<BorderRadiusLevel, number> = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export interface SvgRenderOptions {
  background?: BackgroundParam | null;
  borderColor?: string;
  borderRadius?: BorderRadiusLevel;
  borderStyle?: BorderStyle;
  borderWidth?: BorderWidthLevel;
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

function buildBorderStyleAttributes(
  borderStyle: BorderStyle,
  borderUnits: number,
): string {
  if (borderStyle === 'dashed') {
    return ` stroke-dasharray="${formatNumber(borderUnits * 4)} ${formatNumber(borderUnits * 2)}"`;
  }
  if (borderStyle === 'dotted') {
    return ` stroke-dasharray="0 ${formatNumber(borderUnits * 2.5)}" stroke-linecap="round"`;
  }
  return '';
}

function buildRoundedContentMarkup(
  content: string,
  canvasWidth: number,
  canvasHeight: number,
  radiusUnits: number,
): string {
  if (!radiusUnits) return content;

  const radius = formatNumber(radiusUnits);
  return `<defs><clipPath id="badge-rounded-clip"><rect width="${formatNumber(canvasWidth)}" height="${formatNumber(canvasHeight)}" rx="${radius}"/></clipPath></defs><g clip-path="url(#badge-rounded-clip)">${content}</g>`;
}

export function generateSvg(
  iconNames: string[],
  icons: Record<string, string>,
  perLine: number,
  options: SvgRenderOptions = {},
): string {
  const {
    background = null,
    borderColor = DEFAULT_BORDER_COLOR,
    borderRadius = DEFAULT_BORDER_RADIUS,
    borderStyle = DEFAULT_BORDER_STYLE,
    borderWidth = DEFAULT_BORDER_WIDTH,
    gap = DEFAULT_GAP,
    padding = 0,
  } = options;
  const gapUnits = GAP_VIEWBOX_UNITS[gap];
  const iconStep = ICON_VIEWBOX_SIZE + gapUnits;
  const borderPixels = BORDER_WIDTH_PIXELS[borderWidth];
  const borderUnits = borderPixels / OUTPUT_SCALE;
  const radiusPixels = BORDER_RADIUS_PIXELS[borderRadius];
  const radiusUnits = radiusPixels / OUTPUT_SCALE;
  const cacheKey = `${iconNames.join(',')}-${perLine}-${background?.type || 'none'}-${background?.value || 'none'}-${gap}-${padding}-${borderWidth}-${borderColor}-${borderStyle}-${borderRadius}`;

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
  const canvasWidth = contentWidth + (viewBoxPadding + borderUnits) * 2;
  const canvasHeight = contentHeight + (viewBoxPadding + borderUnits) * 2;
  const renderedHeight =
    contentHeight * OUTPUT_SCALE + (padding + borderPixels) * 2;
  const renderedWidth =
    contentWidth * OUTPUT_SCALE + (padding + borderPixels) * 2;
  const contentOffset = viewBoxPadding + borderUnits;

  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${formatNumber(contentOffset + (idx % perLine) * iconStep)},${formatNumber(contentOffset + Math.floor(idx / perLine) * iconStep)})">${i}</g>`,
    )
    .join('');

  let backgroundMarkup = '';
  if (background?.type === 'color') {
    backgroundMarkup = `<rect width="${formatNumber(canvasWidth)}" height="${formatNumber(canvasHeight)}" fill="${escapeAttr(background.value)}"/>`;
  } else if (background?.type === 'image') {
    const href = escapeAttr(background.value);
    backgroundMarkup = `<image href="${href}" x="0" y="0" width="${formatNumber(canvasWidth)}" height="${formatNumber(canvasHeight)}" preserveAspectRatio="xMidYMid slice"/>`;
  }

  const borderStyleAttributes = buildBorderStyleAttributes(
    borderStyle,
    borderUnits,
  );
  const borderRadiusUnits = Math.max(radiusUnits - borderUnits / 2, 0);
  const borderRadiusAttribute = radiusPixels
    ? ` rx="${formatNumber(borderRadiusUnits)}"`
    : '';
  const borderMarkup = borderPixels
    ? `<rect x="${formatNumber(borderUnits / 2)}" y="${formatNumber(borderUnits / 2)}" width="${formatNumber(canvasWidth - borderUnits)}" height="${formatNumber(canvasHeight - borderUnits)}"${borderRadiusAttribute} fill="none" stroke="${escapeAttr(borderColor)}" stroke-width="${formatNumber(borderUnits)}"${borderStyleAttributes}/>`
    : '';

  const contentMarkup = buildRoundedContentMarkup(
    `${backgroundMarkup}${groups}`,
    canvasWidth,
    canvasHeight,
    radiusUnits,
  );

  const svg = `<svg width="${formatNumber(renderedWidth)}" height="${formatNumber(renderedHeight)}" viewBox="0 0 ${formatNumber(canvasWidth)} ${formatNumber(canvasHeight)}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${contentMarkup}${borderMarkup}</svg>`;

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
