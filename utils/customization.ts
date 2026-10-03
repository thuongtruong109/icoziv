import {
  BORDER_RADIUS_LEVELS,
  BORDER_STYLES,
  BORDER_WIDTH_LEVELS,
  DEFAULT_BORDER_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_BORDER_STYLE,
  DEFAULT_BORDER_WIDTH,
  DEFAULT_GAP,
  DEFAULT_SHADOW,
  GAP_LEVELS,
  SHADOW_LEVELS,
} from '../shared/index.js';
import type {
  BackgroundParam,
  BorderRadiusLevel,
  BorderStyle,
  BorderWidthLevel,
  GapLevel,
  ShadowLevel,
} from '../types/index.js';

export const MAX_PADDING = 200;
export const MAX_BACKGROUND_URL_LENGTH = 2048;

function normalizeHexColor(raw: string): string | null {
  const match = raw.match(
    /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  );
  if (!match) return null;
  return `#${match[1].toLowerCase()}`;
}

function normalizeImageUrl(raw: string): string | null {
  if (raw.length > MAX_BACKGROUND_URL_LENGTH) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export function parseBackgroundParam(
  param: string | null,
): BackgroundParam | null {
  if (!param) return null;
  const trimmed = param.trim();
  if (!trimmed) return null;

  const hex = normalizeHexColor(trimmed);
  if (hex) return { type: 'color', value: hex };

  const imageUrl = normalizeImageUrl(trimmed);
  return imageUrl ? { type: 'image', value: imageUrl } : null;
}

export function parsePaddingParam(param: string | null): number | null {
  if (param === null || param === '') return 0;
  if (!/^\d+$/.test(param)) return null;

  const padding = Number(param);
  return Number.isSafeInteger(padding) && padding <= MAX_PADDING
    ? padding
    : null;
}

export function parseGapParam(param: string | null): GapLevel | null {
  if (param === null || param.trim() === '') return DEFAULT_GAP;

  const normalized = param.trim().toLowerCase() as GapLevel;
  return GAP_LEVELS.includes(normalized) ? normalized : null;
}

export function parseBorderWidthParam(
  param: string | null,
): BorderWidthLevel | null {
  if (param === null || param.trim() === '') return DEFAULT_BORDER_WIDTH;

  const normalized = param.trim().toLowerCase() as BorderWidthLevel;
  return BORDER_WIDTH_LEVELS.includes(normalized) ? normalized : null;
}

export function parseBorderColorParam(param: string | null): string | null {
  if (param === null || param.trim() === '') return DEFAULT_BORDER_COLOR;

  const normalized = param.trim().toLowerCase();
  if (normalized === DEFAULT_BORDER_COLOR) return DEFAULT_BORDER_COLOR;

  return normalizeHexColor(normalized);
}

export function parseBorderStyleParam(
  param: string | null,
): BorderStyle | null {
  if (param === null || param.trim() === '') return DEFAULT_BORDER_STYLE;

  const normalized = param.trim().toLowerCase() as BorderStyle;
  return BORDER_STYLES.includes(normalized) ? normalized : null;
}

export function parseBorderRadiusParam(
  param: string | null,
): BorderRadiusLevel | null {
  if (param === null || param.trim() === '') return DEFAULT_BORDER_RADIUS;

  const normalized = param.trim().toLowerCase() as BorderRadiusLevel;
  return BORDER_RADIUS_LEVELS.includes(normalized) ? normalized : null;
}

export function parseShadowParam(param: string | null): ShadowLevel | null {
  if (param === null || param.trim() === '') return DEFAULT_SHADOW;

  const normalized = param.trim().toLowerCase() as ShadowLevel;
  return SHADOW_LEVELS.includes(normalized) ? normalized : null;
}
