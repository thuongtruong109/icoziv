export type IconTheme = 'light' | 'dark';
export type BadgeGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeBorderWidth = 'none' | 'thin' | 'medium' | 'bold';
export type BadgeBorderStyle = 'solid' | 'dashed' | 'dotted';
export type BadgeBorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BadgeShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
  gap: BadgeGap;
  borderWidth: BadgeBorderWidth;
  borderColor: string;
  borderStyle: BadgeBorderStyle;
  borderRadius: BadgeBorderRadius;
  shadow: BadgeShadow;
  background: string;
  padding: number;
}

export interface BadgeSnippets {
  image: string;
  markdown: string;
  html: string;
}
