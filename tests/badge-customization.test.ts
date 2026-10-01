import { beforeAll, describe, expect, it } from 'vitest';

beforeAll(async () => {
  await import('../docs/badge-customization.js');
});

describe('demo badge customization', () => {
  it('normalizes icon filenames and emits every API option', () => {
    const url = globalThis.IcozivBadgeCustomization.buildBadgeUrl({
      baseUrl: 'https://i.icoziv.workers.dev/',
      icons: ['JavaScript.svg', 'typescript-light.svg'],
      theme: 'light',
      perLine: 2,
      background: '#0f172a',
      padding: 12,
    });

    expect(url).toBe(
      'https://i.icoziv.workers.dev/icons?i=javascript%2Ctypescript&t=light&perline=2&bg=%230f172a&padding=12',
    );
  });

  it('rejects unsafe backgrounds and empty icon selections', () => {
    const build = (background: string, icons = ['react']) =>
      globalThis.IcozivBadgeCustomization.buildBadgeUrl({
        baseUrl: 'https://i.icoziv.workers.dev',
        icons,
        theme: 'dark',
        perLine: 15,
        background,
        padding: 0,
      });

    expect(build('http://example.com/background.png')).toBe('');
    expect(build('https://user:pass@example.com/background.png')).toBe('');
    expect(build('', [])).toBe('');
  });

  it('clamps invalid persisted settings to API defaults', () => {
    const storage = {
      getItem(key: string) {
        return (
          {
            'icoziv-badge-theme': 'auto',
            'icoziv-badge-per-line': '99',
            'icoziv-custom-background': ' #abc ',
            'icoziv-custom-padding': '-1',
          }[key] ?? null
        );
      },
    } as Storage;

    expect(globalThis.IcozivBadgeCustomization.loadSettings(storage)).toEqual({
      theme: 'dark',
      perLine: 15,
      background: '#abc',
      padding: 0,
    });
  });
});
