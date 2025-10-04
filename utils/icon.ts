import iconsJson from '../dist/icons.json' with { type: 'json' };

type IconsMap = Record<string, string>;
export const icons: IconsMap = iconsJson as IconsMap;

export const iconNameList: string[] = [
  ...new Set(Object.keys(icons).map(i => i.split('-')[0])),
];

export const themedIcons: Set<string> = new Set(
  Object.keys(icons)
    .filter(i => i.includes('-light') || i.includes('-dark'))
    .map(i => i.split('-')[0]),
);
