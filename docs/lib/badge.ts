import { BADGE_BASE_URL } from './constants';
import type {
  BadgeSettings,
  BadgeSnippets,
  IconGroup,
  IconTheme,
} from '../types/icon';

export const DEFAULT_BADGE_SETTINGS: BadgeSettings = {
  theme: 'dark',
  perLine: 15,
  background: '',
  padding: 0,
};

type BadgeSettingsInput = Partial<Record<keyof BadgeSettings, unknown>>;

function parseInteger(
  value: unknown,
  minimum: number,
  maximum: number,
  fallback: number,
): number {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum
    ? parsed
    : fallback;
}

export function normalizeBadgeSettings(
  settings: BadgeSettingsInput = {},
): BadgeSettings {
  return {
    theme: settings.theme === 'light' ? 'light' : 'dark',
    perLine: parseInteger(
      settings.perLine,
      1,
      50,
      DEFAULT_BADGE_SETTINGS.perLine,
    ),
    background: String(settings.background ?? '').trim(),
    padding: parseInteger(
      settings.padding,
      0,
      200,
      DEFAULT_BADGE_SETTINGS.padding,
    ),
  };
}

export function normalizeIconName(value: string): string {
  return value
    .trim()
    .replace(/\.svg$/i, '')
    .replace(/-(light|dark)$/i, '')
    .toLowerCase();
}

export function isValidBackground(value: string): boolean {
  const background = value.trim();
  if (!background) return true;
  if (
    /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(background)
  ) {
    return true;
  }
  if (background.length > 2048) return false;

  try {
    const parsed = new URL(background);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}

export function buildBadgeUrl(
  icons: string[],
  settings: BadgeSettings,
): string {
  const normalizedIcons = icons.map(normalizeIconName).filter(Boolean);
  const normalizedSettings = normalizeBadgeSettings(settings);
  if (
    !normalizedIcons.length ||
    !isValidBackground(normalizedSettings.background)
  ) {
    return '';
  }

  const params = new URLSearchParams({
    i: normalizedIcons.join(','),
    t: normalizedSettings.theme,
    perline: String(normalizedSettings.perLine),
  });

  if (normalizedSettings.background) {
    params.set('bg', normalizedSettings.background);
  }
  if (normalizedSettings.padding > 0) {
    params.set('padding', String(normalizedSettings.padding));
  }

  return `${BADGE_BASE_URL}/icons?${params.toString()}`;
}

export function buildBadgeSnippets(imageUrl: string): BadgeSnippets {
  if (!imageUrl) return { image: '', markdown: '', html: '' };
  return {
    image: imageUrl,
    markdown: `[![Icoziv icons](${imageUrl})](${BADGE_BASE_URL})`,
    html: `<a href="${BADGE_BASE_URL}" title="Open Icoziv"><img src="${imageUrl}" alt="Icoziv icons"></a>`,
  };
}

export function resolveIconFilename(icon: IconGroup, theme: IconTheme): string {
  return (
    icon.variants[theme] ??
    icon.variants.common ??
    icon.variants.dark ??
    icon.variants.light ??
    ''
  );
}

export function selectedIconNames(icons: IconGroup[]): string[] {
  return icons.map(icon => normalizeIconName(icon.displayName));
}
