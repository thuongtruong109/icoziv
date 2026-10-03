import {
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_GAP,
  DEFAULT_GROUP_STYLE,
  DEFAULT_SHADOW,
} from '../shared/index.js';
import type {
  BackgroundParam,
  BorderRadiusLevel,
  BorderStyle,
  BorderWidthLevel,
  GapLevel,
  GroupStyle,
  IconRenderGroup,
  ShadowLevel,
  Theme,
} from '../types/index.js';
import { buildGroupedIconLayout } from './group-layout.js';

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

interface IconShadowPreset {
  blur: number;
  offsetY: number;
  opacity: number;
}

const ICON_SHADOW_PRESETS: Record<ShadowLevel, IconShadowPreset> = {
  none: { blur: 0, offsetY: 0, opacity: 0 },
  xs: { blur: 0.5, offsetY: 1, opacity: 0.18 },
  sm: { blur: 1, offsetY: 1, opacity: 0.2 },
  md: { blur: 2, offsetY: 2, opacity: 0.22 },
  lg: { blur: 4, offsetY: 4, opacity: 0.24 },
  xl: { blur: 8, offsetY: 8, opacity: 0.28 },
};

export interface SvgRenderOptions {
  background?: BackgroundParam | null;
  borderColor?: string;
  borderRadius?: BorderRadiusLevel;
  borderStyle?: BorderStyle;
  borderWidth?: BorderWidthLevel;
  gap?: GapLevel;
  groupStyle?: GroupStyle;
  iconGroups?: IconRenderGroup[];
  padding?: number;
  shadow?: ShadowLevel;
  theme?: Theme;
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

function buildIconShadowFilter(shadow: ShadowLevel): string {
  if (shadow === 'none') return '';

  const preset = ICON_SHADOW_PRESETS[shadow];
  return `<defs><filter id="icon-shadow-${shadow}" x="-256" y="-256" width="768" height="768" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="${formatNumber(preset.offsetY / OUTPUT_SCALE)}" stdDeviation="${formatNumber(preset.blur / OUTPUT_SCALE)}" flood-color="#000000" flood-opacity="${preset.opacity}"/></filter></defs>`;
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
    groupStyle = DEFAULT_GROUP_STYLE,
    iconGroups = [],
    padding = 0,
    shadow = DEFAULT_SHADOW,
    theme = 'dark',
  } = options;
  const gapUnits = GAP_VIEWBOX_UNITS[gap];
  const iconStep = ICON_VIEWBOX_SIZE + gapUnits;
  const borderPixels = BORDER_WIDTH_PIXELS[borderWidth];
  const borderUnits = borderPixels / OUTPUT_SCALE;
  const radiusPixels = BORDER_RADIUS_PIXELS[borderRadius];
  const radiusUnits = radiusPixels / OUTPUT_SCALE;
  const groupingCacheKey = iconGroups.length
    ? `${groupStyle}-${theme}-${JSON.stringify(iconGroups)}`
    : 'flat';
  const cacheKey = `${iconNames.join(',')}-${perLine}-${background?.type || 'none'}-${background?.value || 'none'}-${gap}-${padding}-${borderWidth}-${borderColor}-${borderStyle}-${borderRadius}-${shadow}-${groupingCacheKey}`;

  if (_svgCache.has(cacheKey)) {
    return _svgCache.get(cacheKey)!;
  }
  const viewBoxPadding = padding / OUTPUT_SCALE;
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const iconShadowAttribute =
    shadow === 'none' ? '' : ` filter="url(#icon-shadow-${shadow})"`;
  const groupedLayout = iconGroups.length
    ? buildGroupedIconLayout(iconGroups, icons, {
        gapUnits,
        groupStyle,
        iconFilterAttribute: iconShadowAttribute,
        perLine,
        theme,
      })
    : null;
  const columns = Math.min(perLine, iconSvgList.length);
  const rows = Math.ceil(iconSvgList.length / perLine);
  const contentWidth = groupedLayout
    ? groupedLayout.width
    : columns * ICON_VIEWBOX_SIZE + Math.max(0, columns - 1) * gapUnits;
  const contentHeight = groupedLayout
    ? groupedLayout.height
    : rows * ICON_VIEWBOX_SIZE + Math.max(0, rows - 1) * gapUnits;
  const canvasWidth = contentWidth + (viewBoxPadding + borderUnits) * 2;
  const canvasHeight = contentHeight + (viewBoxPadding + borderUnits) * 2;
  const renderedHeight =
    contentHeight * OUTPUT_SCALE + (padding + borderPixels) * 2;
  const renderedWidth =
    contentWidth * OUTPUT_SCALE + (padding + borderPixels) * 2;
  const contentOffset = viewBoxPadding + borderUnits;
  const iconsMarkup = groupedLayout
    ? `<g transform="translate(${formatNumber(contentOffset)},${formatNumber(contentOffset)})">${groupedLayout.markup}</g>`
    : iconSvgList
        .map(
          (i, idx) =>
            `<g${iconShadowAttribute} transform="translate(${formatNumber(contentOffset + (idx % perLine) * iconStep)},${formatNumber(contentOffset + Math.floor(idx / perLine) * iconStep)})">${i}</g>`,
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
    `${backgroundMarkup}${iconsMarkup}`,
    canvasWidth,
    canvasHeight,
    radiusUnits,
  );
  const shadowMarkup = buildIconShadowFilter(shadow);

  const svg = `<svg width="${formatNumber(renderedWidth)}" height="${formatNumber(renderedHeight)}" viewBox="0 0 ${formatNumber(canvasWidth)} ${formatNumber(canvasHeight)}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${shadowMarkup}${contentMarkup}${borderMarkup}</svg>`;

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
