export type IconTheme = 'light' | 'dark';
export type ThemePreference = IconTheme | 'system';
export type DisplayNameMode = 'tooltip' | 'inside';
export type ViewMode = 'pagination' | 'infinite';

export type IconCategory =
  | 'frameworks'
  | 'languages'
  | 'tools'
  | 'databases'
  | 'cloud'
  | 'mobile'
  | 'design'
  | 'testing'
  | 'ai'
  | 'other';

export interface IconVariants {
  common?: string;
  light?: string;
  dark?: string;
}

export interface IconGroup {
  key: string;
  displayName: string;
  category: IconCategory;
  variants: IconVariants;
}

export interface BadgeSettings {
  theme: IconTheme;
  perLine: number;
  background: string;
  padding: number;
}

export interface BadgeSnippets {
  image: string;
  markdown: string;
  html: string;
}
