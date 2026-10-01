import type { BackgroundParam } from '../types/index.js';

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
