import type { BadgeIconGroup, IconCategory, IconGroup } from '@/types/icon';

const GROUP_LABELS: Record<IconCategory, string> = {
  frameworks: 'Frameworks',
  languages: 'Languages',
  tools: 'Tools',
  databases: 'Databases',
  cloud: 'Cloud & DevOps',
  mobile: 'Mobile',
  design: 'Design',
  testing: 'Testing',
  ai: 'AI & Data',
  other: 'Others',
};

export function groupSelectedIcons(icons: IconGroup[]): BadgeIconGroup[] {
  const groups = new Map<IconCategory, BadgeIconGroup>();

  for (const icon of icons) {
    const existing = groups.get(icon.category);
    if (existing) {
      existing.icons.push(icon.displayName);
      continue;
    }

    groups.set(icon.category, {
      label: GROUP_LABELS[icon.category],
      icons: [icon.displayName],
    });
  }

  return [...groups.values()];
}
