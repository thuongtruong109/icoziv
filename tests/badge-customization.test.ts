import { describe, expect, it } from 'vitest';

import { buildBadgeUrl, normalizeBadgeSettings } from '../docs/lib/badge';

describe('demo badge customization', () => {
  it('normalizes icon filenames and emits every API option', () => {
    const url = buildBadgeUrl(['JavaScript.svg', 'typescript-light.svg'], {
      theme: 'light',
      perLine: 2,
      gap: 'lg',
      borderWidth: 'bold',
      borderColor: '#ef4444',
      borderStyle: 'dashed',
      borderRadius: 'lg',
      background: '#0f172a',
      padding: 12,
    });

    expect(url).toBe(
      'https://i.icoziv.workers.dev/icons?i=javascript%2Ctypescript&t=light&perline=2&gap=lg&bg=%230f172a&padding=12&rounded=lg&border=bold&borderstyle=dashed&bordercolor=%23ef4444',
    );
  });

  it('rejects unsafe backgrounds and empty icon selections', () => {
    const build = (background: string, icons = ['react']) =>
      buildBadgeUrl(icons, {
        theme: 'dark',
        perLine: 15,
        gap: 'sm',
        borderWidth: 'none',
        borderColor: '',
        borderStyle: 'solid',
        borderRadius: 'none',
        background,
        padding: 0,
      });

    expect(build('http://example.com/background.png')).toBe('');
    expect(build('https://user:pass@example.com/background.png')).toBe('');
    expect(build('', [])).toBe('');
  });

  it('rejects invalid border colors and omits default border options', () => {
    const settings = {
      theme: 'dark' as const,
      perLine: 15,
      gap: 'sm' as const,
      borderWidth: 'none' as const,
      borderColor: '',
      borderStyle: 'solid' as const,
      borderRadius: 'none' as const,
      background: '',
      padding: 0,
    };

    const defaultUrl = buildBadgeUrl(['react'], settings);
    expect(defaultUrl).not.toContain('border=');
    expect(defaultUrl).not.toContain('bordercolor=');
    expect(defaultUrl).not.toContain('borderstyle=');
    expect(defaultUrl).not.toContain('rounded=');
    expect(
      buildBadgeUrl(['react'], {
        ...settings,
        borderWidth: 'thin',
        borderColor: 'red',
      }),
    ).toBe('');
  });

  it('clamps invalid persisted settings to API defaults', () => {
    expect(
      normalizeBadgeSettings({
        theme: 'auto',
        perLine: '99',
        gap: 'huge',
        borderWidth: 'wide',
        borderColor: ' transparent ',
        borderStyle: 'double',
        borderRadius: 'huge',
        background: ' #abc ',
        padding: '-1',
      }),
    ).toEqual({
      theme: 'dark',
      perLine: 15,
      gap: 'sm',
      borderWidth: 'none',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderRadius: 'none',
      background: '#abc',
      padding: 0,
    });
  });
});
