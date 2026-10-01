type BadgeTheme = 'light' | 'dark';

type BadgeSettings = {
  theme: BadgeTheme;
  perLine: number;
  background: string;
  padding: number;
};

type BadgeCustomizationApi = {
  DEFAULTS: Readonly<BadgeSettings>;
  STORAGE_KEYS: Readonly<Record<keyof BadgeSettings, string>>;
  buildBadgeUrl(
    options: BadgeSettings & {
      baseUrl: string;
      icons: string[];
    },
  ): string;
  buildSnippets(
    imageUrl: string,
    homepageUrl: string,
  ): { image: string; markdown: string; html: string };
  isValidBackground(value: unknown): boolean;
  loadSettings(storage: Storage): BadgeSettings;
  normalizeIconName(icon: unknown): string;
  normalizeSettings(settings?: Partial<BadgeSettings>): BadgeSettings;
  saveSettings(storage: Storage, settings: BadgeSettings): BadgeSettings;
};

declare global {
  var IcozivBadgeCustomization: BadgeCustomizationApi;
}

export {};
