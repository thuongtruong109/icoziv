import { BADGE_BASE_URL } from '@/lib/constants';
import type {
  BadgeSettings,
  BadgeSnippets,
  IconGroup,
  IconTheme,
} from '@/types/icon';

export const DEFAULT_BADGE_SETTINGS: BadgeSettings = {
  theme: 'dark',
  perLine: 15,
  background: '',
  padding: 0,
};

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
  if (!normalizedIcons.length || !isValidBackground(settings.background)) {
    return '';
  }

  const params = new URLSearchParams({
    i: normalizedIcons.join(','),
    t: settings.theme,
    perline: String(Math.min(50, Math.max(1, settings.perLine))),
  });

  if (settings.background.trim()) {
    params.set('bg', settings.background.trim());
  }
  if (settings.padding > 0) {
    params.set('padding', String(Math.min(200, settings.padding)));
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
