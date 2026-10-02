import { describe, expect, it } from 'vitest';

import { buildBadgeUrl, normalizeBadgeSettings } from '../docs/lib/badge';

describe('demo badge customization', () => {
  it('normalizes icon filenames and emits every API option', () => {
    const url = buildBadgeUrl(['JavaScript.svg', 'typescript-light.svg'], {
      theme: 'light',
      perLine: 2,
      gap: 'lg',
      background: '#0f172a',
      padding: 12,
    });

    expect(url).toBe(
      'https://i.icoziv.workers.dev/icons?i=javascript%2Ctypescript&t=light&perline=2&gap=lg&bg=%230f172a&padding=12',
    );
  });

  it('rejects unsafe backgrounds and empty icon selections', () => {
    const build = (background: string, icons = ['react']) =>
      buildBadgeUrl(icons, {
        theme: 'dark',
        perLine: 15,
        gap: 'sm',
        background,
        padding: 0,
      });

    expect(build('http://example.com/background.png')).toBe('');
    expect(build('https://user:pass@example.com/background.png')).toBe('');
    expect(build('', [])).toBe('');
  });

  it('clamps invalid persisted settings to API defaults', () => {
    expect(
      normalizeBadgeSettings({
        theme: 'auto',
        perLine: '99',
        gap: 'huge',
        background: ' #abc ',
        padding: '-1',
      }),
    ).toEqual({
      theme: 'dark',
      perLine: 15,
      gap: 'sm',
      background: '#abc',
      padding: 0,
    });
  });
});
