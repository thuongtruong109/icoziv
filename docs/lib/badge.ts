import {
  BADGE_BASE_URL,
  BADGE_BORDER_RADIUS_OPTIONS,
  BADGE_BORDER_STYLE_OPTIONS,
  BADGE_BORDER_WIDTH_OPTIONS,
  BADGE_GAP_OPTIONS,
  BADGE_GROUP_STYLE_OPTIONS,
  BADGE_SHADOW_OPTIONS,
} from './constants';
import type {
  BadgeBorderRadius,
  BadgeBorderStyle,
  BadgeBorderWidth,
  BadgeGap,
  BadgeGroupStyle,
  BadgeIconGroup,
  BadgeSettings,
  BadgeShadow,
  BadgeSnippets,
  IconGroup,
  IconTheme,
} from '../types/icon';

export const DEFAULT_BADGE_SETTINGS: BadgeSettings = {
  theme: 'dark',
  perLine: 15,
  gap: 'sm',
  borderWidth: 'none',
  borderColor: '',
  borderStyle: 'solid',
  borderRadius: 'none',
  shadow: 'none',
  groupStyle: 'none',
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

function parseGap(value: unknown): BadgeGap {
  const gap = String(value ?? '').toLowerCase() as BadgeGap;
  return BADGE_GAP_OPTIONS.includes(gap) ? gap : DEFAULT_BADGE_SETTINGS.gap;
}

function parseBorderWidth(value: unknown): BadgeBorderWidth {
  const borderWidth = String(value ?? '').toLowerCase() as BadgeBorderWidth;
  return BADGE_BORDER_WIDTH_OPTIONS.some(option => option.value === borderWidth)
    ? borderWidth
    : DEFAULT_BADGE_SETTINGS.borderWidth;
}

function parseBorderStyle(value: unknown): BadgeBorderStyle {
  const borderStyle = String(value ?? '').toLowerCase() as BadgeBorderStyle;
  return BADGE_BORDER_STYLE_OPTIONS.some(option => option.value === borderStyle)
    ? borderStyle
    : DEFAULT_BADGE_SETTINGS.borderStyle;
}

function parseBorderRadius(value: unknown): BadgeBorderRadius {
  const borderRadius = String(value ?? '').toLowerCase() as BadgeBorderRadius;
  return BADGE_BORDER_RADIUS_OPTIONS.some(
    option => option.value === borderRadius,
  )
    ? borderRadius
    : DEFAULT_BADGE_SETTINGS.borderRadius;
}

function parseShadow(value: unknown): BadgeShadow {
  const shadow = String(value ?? '').toLowerCase() as BadgeShadow;
  return BADGE_SHADOW_OPTIONS.some(option => option.value === shadow)
    ? shadow
    : DEFAULT_BADGE_SETTINGS.shadow;
}

function parseGroupStyle(value: unknown): BadgeGroupStyle {
  const groupStyle = String(value ?? '').toLowerCase() as BadgeGroupStyle;
  return BADGE_GROUP_STYLE_OPTIONS.some(option => option.value === groupStyle)
    ? groupStyle
    : DEFAULT_BADGE_SETTINGS.groupStyle;
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
    gap: parseGap(settings.gap),
    borderWidth: parseBorderWidth(settings.borderWidth),
    borderColor: String(settings.borderColor ?? '').trim(),
    borderStyle: parseBorderStyle(settings.borderStyle),
    borderRadius: parseBorderRadius(settings.borderRadius),
    shadow: parseShadow(settings.shadow),
    groupStyle: parseGroupStyle(settings.groupStyle),
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

export function isValidBorderColor(value: string): boolean {
  const color = value.trim();
  return (
    !color ||
    color.toLowerCase() === 'transparent' ||
    /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(color)
  );
}

function isValidGroupLabel(label: string): boolean {
  return (
    label.length > 0 &&
    label.length <= 40 &&
    !Array.from(label).some(character => {
      const code = character.charCodeAt(0);
      return (
        code <= 31 || code === 127 || character === '|' || character === ':'
      );
    })
  );
}

export function buildBadgeUrl(
  icons: string[],
  settings: BadgeSettings,
  groups: BadgeIconGroup[] = [],
): string {
  const normalizedIcons = icons.map(normalizeIconName).filter(Boolean);
  const normalizedSettings = normalizeBadgeSettings(settings);
  const normalizedGroups = groups
    .map(group => ({
      label: group.label.trim().replace(/\s+/g, ' '),
      icons: group.icons.map(normalizeIconName).filter(Boolean),
    }))
    .filter(group => group.icons.length);
  const validGroups = normalizedGroups.every(group =>
    isValidGroupLabel(group.label),
  );
  const grouped =
    normalizedSettings.groupStyle !== 'none' && normalizedGroups.length > 0;
  if (
    !normalizedIcons.length ||
    (grouped && !validGroups) ||
    !isValidBackground(normalizedSettings.background) ||
    !isValidBorderColor(normalizedSettings.borderColor)
  ) {
    return '';
  }

  const params = new URLSearchParams({
    i: grouped
      ? normalizedGroups
          .map(group => `${group.label}:${group.icons.join(',')}`)
          .join('|')
      : normalizedIcons.join(','),
    t: normalizedSettings.theme,
    perline: String(normalizedSettings.perLine),
    gap: normalizedSettings.gap,
  });

  if (normalizedSettings.background) {
    params.set('bg', normalizedSettings.background);
  }
  if (normalizedSettings.padding > 0) {
    params.set('padding', String(normalizedSettings.padding));
  }
  if (normalizedSettings.borderRadius !== 'none') {
    params.set('rounded', normalizedSettings.borderRadius);
  }
  if (normalizedSettings.shadow !== 'none') {
    params.set('shadow', normalizedSettings.shadow);
  }
  if (grouped && normalizedSettings.groupStyle !== 'card') {
    params.set('groupstyle', normalizedSettings.groupStyle);
  }
  if (normalizedSettings.borderWidth !== 'none') {
    params.set('border', normalizedSettings.borderWidth);
    if (normalizedSettings.borderStyle !== 'solid') {
      params.set('borderstyle', normalizedSettings.borderStyle);
    }
    if (
      normalizedSettings.borderColor &&
      normalizedSettings.borderColor.toLowerCase() !== 'transparent'
    ) {
      params.set('bordercolor', normalizedSettings.borderColor);
    }
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
