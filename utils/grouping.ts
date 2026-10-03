import type { IconRenderGroup, Theme } from '../types/index.js';
import { parseIconsParam } from './validation.js';

export const MAX_ICON_GROUPS = 12;
export const MAX_GROUP_LABEL_LENGTH = 40;

function hasForbiddenLabelCharacter(value: string): boolean {
  return Array.from(value).some(character => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127 || character === '|' || character === ':';
  });
}

function normalizeGroupLabel(value: string): string | null {
  const label = value.trim().replace(/\s+/g, ' ');
  if (
    !label ||
    label.length > MAX_GROUP_LABEL_LENGTH ||
    hasForbiddenLabelCharacter(label)
  ) {
    return null;
  }
  return label;
}

export function parseIconGroupsParam(
  param: string | null,
  theme: Theme,
  iconNameList: string[],
  shortNames: Record<string, string>,
  themedIcons: Set<string>,
): IconRenderGroup[] | null {
  if (!param || (!param.includes(':') && !param.includes('|'))) return [];

  const segments = param.split('|');
  if (!segments.length || segments.length > MAX_ICON_GROUPS) return null;

  const groups: IconRenderGroup[] = [];
  for (const segment of segments) {
    const separatorIndex = segment.indexOf(':');
    if (separatorIndex <= 0 || separatorIndex !== segment.lastIndexOf(':')) {
      return null;
    }

    const label = normalizeGroupLabel(segment.slice(0, separatorIndex));
    const iconParam = segment.slice(separatorIndex + 1).trim();
    if (!label || !iconParam) return null;

    const iconNames = parseIconsParam(
      iconParam,
      theme,
      iconNameList,
      shortNames,
      themedIcons,
    );
    if (iconNames.length) groups.push({ label, iconNames });
  }

  return groups;
}
