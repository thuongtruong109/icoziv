import type { GroupStyle, IconRenderGroup, Theme } from '../types/index.js';

const OUTPUT_SCALE = 48 / 256;
const GROUP_GAP_PIXELS = 6;
const GROUP_PADDING_PIXELS = 4;
const LABEL_ZONE_PIXELS = 18;
const LABEL_HEIGHT_PIXELS = 12;
const LABEL_FONT_PIXELS = 9;

interface GroupPalette {
  border: string;
  label: string;
  labelBorder: string;
  surface: string;
  text: string;
}

interface GroupLayoutOptions {
  gapUnits: number;
  groupStyle: GroupStyle;
  iconFilterAttribute: string;
  perLine: number;
  theme: Theme;
}

export interface GroupedIconLayout {
  height: number;
  markup: string;
  width: number;
}

function formatNumber(value: number): string {
  return Number(value.toFixed(4)).toString();
}

function outputPixelsToUnits(value: number): number {
  return value / OUTPUT_SCALE;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getGroupPalette(theme: Theme): GroupPalette {
  return theme === 'light'
    ? {
        border: '#cbd5e1',
        label: '#ffffff',
        labelBorder: '#dbe3ec',
        surface: '#f8fafc',
        text: '#334155',
      }
    : {
        border: '#334155',
        label: '#0f172a',
        labelBorder: '#475569',
        surface: '#111827',
        text: '#e2e8f0',
      };
}

function estimateLabelWidth(label: string): number {
  const glyphCount = Array.from(label).length;
  return outputPixelsToUnits(Math.max(36, glyphCount * 5.6 + 14));
}

function buildGroupChrome(
  label: string,
  width: number,
  height: number,
  style: GroupStyle,
  palette: GroupPalette,
  showDivider: boolean,
): string {
  const borderWidth = outputPixelsToUnits(1);
  const labelHeight = outputPixelsToUnits(LABEL_HEIGHT_PIXELS);
  const labelTop = outputPixelsToUnits(3);
  const labelWidth = Math.min(
    estimateLabelWidth(label),
    width - borderWidth * 2,
  );
  const labelX = (width - labelWidth) / 2;
  const textY = outputPixelsToUnits(12);
  const text = `<text x="${formatNumber(width / 2)}" y="${formatNumber(textY)}" fill="${palette.text}" font-family="Arial,Helvetica,sans-serif" font-size="${formatNumber(outputPixelsToUnits(LABEL_FONT_PIXELS))}" font-weight="600" text-anchor="middle">${escapeXml(label)}</text>`;

  if (style === 'card') {
    return `<rect width="${formatNumber(width)}" height="${formatNumber(height)}" rx="${formatNumber(outputPixelsToUnits(7))}" fill="${palette.surface}" stroke="${palette.border}" stroke-width="${formatNumber(borderWidth)}"/><rect x="${formatNumber(labelX)}" y="${formatNumber(labelTop)}" width="${formatNumber(labelWidth)}" height="${formatNumber(labelHeight)}" rx="${formatNumber(outputPixelsToUnits(3))}" fill="${palette.label}" stroke="${palette.labelBorder}" stroke-width="${formatNumber(borderWidth)}"/>${text}`;
  }

  if (style === 'label') {
    const lineY = outputPixelsToUnits(16);
    return `${text}<line x1="${formatNumber(outputPixelsToUnits(4))}" y1="${formatNumber(lineY)}" x2="${formatNumber(width - outputPixelsToUnits(4))}" y2="${formatNumber(lineY)}" stroke="${palette.border}" stroke-width="${formatNumber(borderWidth)}"/>`;
  }

  const divider = showDivider
    ? `<line x1="${formatNumber(width)}" y1="${formatNumber(outputPixelsToUnits(4))}" x2="${formatNumber(width)}" y2="${formatNumber(height - outputPixelsToUnits(4))}" stroke="${palette.border}" stroke-width="${formatNumber(borderWidth)}"/>`
    : '';
  return `${text}${divider}`;
}

export function buildGroupedIconLayout(
  groups: IconRenderGroup[],
  icons: Record<string, string>,
  options: GroupLayoutOptions,
): GroupedIconLayout {
  const paddingUnits = outputPixelsToUnits(GROUP_PADDING_PIXELS);
  const labelZoneUnits = outputPixelsToUnits(LABEL_ZONE_PIXELS);
  const groupGapUnits = outputPixelsToUnits(GROUP_GAP_PIXELS);
  const palette = getGroupPalette(options.theme);
  const layouts = groups
    .map(group => ({
      iconSvgs: group.iconNames.map(name => icons[name]).filter(Boolean),
      label: group.label,
    }))
    .filter(group => group.iconSvgs.length)
    .map(group => {
      const columns = Math.min(options.perLine, group.iconSvgs.length);
      const rows = Math.ceil(group.iconSvgs.length / options.perLine);
      const iconGridWidth =
        columns * 256 + Math.max(0, columns - 1) * options.gapUnits;
      const iconGridHeight =
        rows * 256 + Math.max(0, rows - 1) * options.gapUnits;
      return {
        ...group,
        columns,
        height: labelZoneUnits + iconGridHeight + paddingUnits,
        width: Math.max(
          iconGridWidth + paddingUnits * 2,
          estimateLabelWidth(group.label) + paddingUnits * 2,
        ),
      };
    });

  const width =
    layouts.reduce((total, group) => total + group.width, 0) +
    Math.max(0, layouts.length - 1) * groupGapUnits;
  const height = Math.max(0, ...layouts.map(group => group.height));
  let offsetX = 0;

  const markup = layouts
    .map((group, groupIndex) => {
      const chrome = buildGroupChrome(
        group.label,
        group.width,
        height,
        options.groupStyle,
        palette,
        groupIndex < layouts.length - 1,
      );
      const iconGridWidth =
        group.columns * 256 + Math.max(0, group.columns - 1) * options.gapUnits;
      const iconOffsetX = (group.width - iconGridWidth) / 2;
      const iconMarkup = group.iconSvgs
        .map(
          (icon, iconIndex) =>
            `<g${options.iconFilterAttribute} transform="translate(${formatNumber(iconOffsetX + (iconIndex % options.perLine) * (256 + options.gapUnits))},${formatNumber(labelZoneUnits + Math.floor(iconIndex / options.perLine) * (256 + options.gapUnits))})">${icon}</g>`,
        )
        .join('');
      const groupMarkup = `<g transform="translate(${formatNumber(offsetX)},0)">${chrome}${iconMarkup}</g>`;
      offsetX += group.width + groupGapUnits;
      return groupMarkup;
    })
    .join('');

  return { height, markup, width };
}
