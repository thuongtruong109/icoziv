(function attachBadgeCustomization(global) {
  const DEFAULTS = Object.freeze({
    theme: 'dark',
    perLine: 15,
    background: '',
    padding: 0,
  });

  const STORAGE_KEYS = Object.freeze({
    theme: 'icoziv-badge-theme',
    perLine: 'icoziv-badge-per-line',
    background: 'icoziv-custom-background',
    padding: 'icoziv-custom-padding',
  });

  function parseInteger(value, minimum, maximum, fallback) {
    const parsed = Number.parseInt(String(value ?? ''), 10);
    return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum
      ? parsed
      : fallback;
  }

  function isValidBackground(value) {
    const trimmed = String(value ?? '').trim();
    if (!trimmed) return true;
    if (
      /^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)
    ) {
      return true;
    }
    if (trimmed.length > 2048) return false;

    try {
      const url = new global.URL(trimmed);
      return url.protocol === 'https:' && !url.username && !url.password;
    } catch {
      return false;
    }
  }

  function normalizeIconName(icon) {
    return String(icon ?? '')
      .trim()
      .replace(/\.svg$/i, '')
      .replace(/-(light|dark)$/i, '')
      .toLowerCase();
  }

  function normalizeSettings(settings = {}) {
    return {
      theme: settings.theme === 'light' ? 'light' : 'dark',
      perLine: parseInteger(settings.perLine, 1, 50, DEFAULTS.perLine),
      background: String(settings.background ?? '').trim(),
      padding: parseInteger(settings.padding, 0, 200, DEFAULTS.padding),
    };
  }

  function loadSettings(storage) {
    return normalizeSettings({
      theme: storage.getItem(STORAGE_KEYS.theme),
      perLine: storage.getItem(STORAGE_KEYS.perLine),
      background: storage.getItem(STORAGE_KEYS.background),
      padding: storage.getItem(STORAGE_KEYS.padding),
    });
  }

  function saveSettings(storage, settings) {
    const normalized = normalizeSettings(settings);
    storage.setItem(STORAGE_KEYS.theme, normalized.theme);
    storage.setItem(STORAGE_KEYS.perLine, String(normalized.perLine));
    storage.setItem(STORAGE_KEYS.background, normalized.background);
    storage.setItem(STORAGE_KEYS.padding, String(normalized.padding));
    return normalized;
  }

  function buildBadgeUrl({ baseUrl, icons, ...settings }) {
    const normalizedIcons = icons.map(normalizeIconName).filter(Boolean);
    if (!normalizedIcons.length || !isValidBackground(settings.background)) {
      return '';
    }

    const normalized = normalizeSettings(settings);
    const params = new global.URLSearchParams({
      i: normalizedIcons.join(','),
      t: normalized.theme,
      perline: String(normalized.perLine),
    });

    if (normalized.background) params.set('bg', normalized.background);
    if (normalized.padding > 0) {
      params.set('padding', String(normalized.padding));
    }

    return `${String(baseUrl).replace(/\/$/, '')}/icons?${params.toString()}`;
  }

  function buildSnippets(imageUrl, homepageUrl) {
    if (!imageUrl) return { image: '', markdown: '', html: '' };
    const homepage = String(homepageUrl).replace(/\/$/, '');
    return {
      image: imageUrl,
      markdown: `[![Icoziv icons](${imageUrl})](${homepage})`,
      html: `<a href="${homepage}" title="Open Icoziv"><img src="${imageUrl}" alt="Icoziv icons"></a>`,
    };
  }

  global.IcozivBadgeCustomization = Object.freeze({
    DEFAULTS,
    STORAGE_KEYS,
    buildBadgeUrl,
    buildSnippets,
    isValidBackground,
    loadSettings,
    normalizeIconName,
    normalizeSettings,
    saveSettings,
  });
})(globalThis);
