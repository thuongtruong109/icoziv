import { beforeAll, describe, expect, it, vi } from 'vitest';

// ✅ Mock decrypt() để không cần icons.bin thật
vi.mock('../utils/encrypt.js', () => ({
  decrypt: async (_data: string) => {
    return JSON.stringify({
      javascript: '<svg id="js"/>',
      typescript: '<svg id="ts"/>',
      golang: '<svg id="go"/>',
      nestjs: '<svg id="nest"/>',
      'javascript-dark': '<svg id="js-dark"/>',
      'nestjs-light': '<svg id="nest-light"/>',
    });
  },
}));

const mockKV = {
  get: vi.fn(async (_key: string) => {
    return 'FAKE_ENCRYPTED_DATA';
  }),
};

const mockEnv = {
  ICONS_KV: mockKV,
};

import type { Theme } from '../types/index.js';
import {
  generateSvg,
  getIconNameList,
  getIcons,
  getThemedIcons,
  isValidTheme,
  loadIcons,
  normalizePath,
  parseBackgroundParam,
  parseGapParam,
  parseIconsParam,
  parsePaddingParam,
  requestMatchesEtag,
} from '../utils/index.js';

describe('utils', () => {
  beforeAll(async () => {
    await loadIcons(mockEnv);
  });

  it('should validate themes correctly', () => {
    const themes: Theme[] = ['light', 'dark'];
    expect(isValidTheme('light', themes)).toBe(true);
    expect(isValidTheme('dark', themes)).toBe(true);
    expect(isValidTheme('blue', themes)).toBe(false);
  });

  it('should normalize paths', () => {
    expect(normalizePath('/api/icons/')).toBe('api/icons');
    expect(normalizePath('///icons///')).toBe('//icons//');
    expect(normalizePath('')).toBe('');
  });

  it('should parse icon params with short names', () => {
    const iconNameList = ['javascript', 'typescript', 'golang', 'nestjs'];
    const themedIcons = new Set(['javascript', 'nestjs']);
    const shortNamesMock = { js: 'javascript', ts: 'typescript', go: 'golang' };

    const result = parseIconsParam(
      'js,ts,go',
      'dark',
      iconNameList,
      shortNamesMock,
      themedIcons,
    );

    expect(result).toEqual(['javascript-dark', 'typescript', 'golang']);
  });

  it('should return themed icons if available', () => {
    const iconNameList = ['javascript', 'typescript', 'golang', 'nestjs'];
    const themedIcons = new Set(['javascript', 'nestjs']);
    const shortNamesMock = { js: 'javascript', ts: 'typescript', go: 'golang' };

    const result = parseIconsParam(
      'nestjs',
      'light',
      iconNameList,
      shortNamesMock,
      themedIcons,
    );

    expect(result).toEqual(['nestjs-light']);
  });

  it('should handle "all" keyword', () => {
    const iconNameList = ['javascript', 'typescript', 'golang', 'nestjs'];
    const themedIcons = new Set(['javascript', 'nestjs']);
    const shortNamesMock = { js: 'javascript', ts: 'typescript', go: 'golang' };

    const result = parseIconsParam(
      'all',
      'dark',
      iconNameList,
      shortNamesMock,
      themedIcons,
    );

    expect(result.length).toBe(iconNameList.length);
  });

  it('should return empty array for null param', () => {
    const iconNameList = ['javascript', 'typescript', 'golang', 'nestjs'];
    const themedIcons = new Set(['javascript', 'nestjs']);
    const shortNamesMock = { js: 'javascript', ts: 'typescript', go: 'golang' };

    const result = parseIconsParam(
      null,
      'dark',
      iconNameList,
      shortNamesMock,
      themedIcons,
    );

    expect(result).toEqual([]);
  });

  it('should parse background color and image', () => {
    const hex = parseBackgroundParam('#A1B2C3');
    expect(hex).toEqual({ type: 'color', value: '#a1b2c3' });

    const img = parseBackgroundParam('https://example.com/bg.png');
    expect(img).toEqual({ type: 'image', value: 'https://example.com/bg.png' });
  });

  it('should reject invalid background values', () => {
    expect(parseBackgroundParam('javascript:alert(1)')).toBeNull();
    expect(parseBackgroundParam('http://example.com/bg.png')).toBeNull();
    expect(parseBackgroundParam('data:image/png;base64,abc')).toBeNull();
    expect(parseBackgroundParam('https://user:pass@example.com/bg')).toBeNull();
  });

  it('should parse padding as whole output pixels', () => {
    expect(parsePaddingParam(null)).toBe(0);
    expect(parsePaddingParam('0')).toBe(0);
    expect(parsePaddingParam('200')).toBe(200);
    expect(parsePaddingParam('1.5')).toBeNull();
    expect(parsePaddingParam('1e2')).toBeNull();
    expect(parsePaddingParam('-1')).toBeNull();
    expect(parsePaddingParam('201')).toBeNull();
  });

  it('should parse semantic icon gaps with sm as the default', () => {
    expect(parseGapParam(null)).toBe('sm');
    expect(parseGapParam('')).toBe('sm');
    expect(parseGapParam('XL')).toBe('xl');
    expect(parseGapParam('wide')).toBeNull();
  });

  it('should generate valid svg output', () => {
    const icons = {
      javascript: '<path id="js"/>',
      typescript: '<path id="ts"/>',
    };

    const svg = generateSvg(['javascript', 'typescript'], icons, 2).trim();

    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox=');
    expect(svg).toContain('<path id="js"/>');
    expect(svg).toContain('<path id="ts"/>');
  });

  it('should render background and padding in output pixels', () => {
    const icons = { javascript: '<path id="js"/>' };
    const svg = generateSvg(['javascript'], icons, 1, {
      background: { type: 'color', value: '#abc' },
      padding: 10,
    });

    expect(svg).toContain('width="68" height="68"');
    expect(svg).toContain('viewBox="0 0 362.6667 362.6667"');
    expect(svg).toContain(
      '<rect width="362.6667" height="362.6667" fill="#abc"/>',
    );
    expect(svg).toContain('transform="translate(53.3333,53.3333)"');
  });

  it.each([
    ['xs', '100.125', '278'],
    ['sm', '104.25', '300'],
    ['md', '108.375', '322'],
    ['lg', '112.5', '344'],
    ['xl', '120.75', '388'],
  ] as const)(
    'renders the %s semantic gap level',
    (gap, expectedWidth, expectedStep) => {
      const icons = {
        javascript: '<path id="js"/>',
        typescript: '<path id="ts"/>',
      };

      const svg = generateSvg(['javascript', 'typescript'], icons, 2, {
        gap,
      });

      expect(svg).toContain(`width="${expectedWidth}"`);
      expect(svg).toContain(`translate(${expectedStep},0)`);
    },
  );

  it('preserves sm as the default gap', () => {
    const svg = generateSvg(
      ['javascript', 'typescript'],
      {
        javascript: '<path id="js"/>',
        typescript: '<path id="ts"/>',
      },
      2,
    );

    expect(svg).toContain('width="104.25"');
    expect(svg).toContain('translate(300,0)');
  });

  it('should escape image URL attributes', () => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      {
        background: {
          type: 'image',
          value: 'https://example.com/bg.png?x=1&y=2',
        },
      },
    );

    expect(svg).toContain('href="https://example.com/bg.png?x=1&amp;y=2"');
  });

  it('should match strong and weak conditional ETags', () => {
    const etag = '"sha256-test"';
    expect(
      requestMatchesEtag(
        new Request('https://example.com', {
          headers: { 'If-None-Match': `"other", W/${etag}` },
        }),
        etag,
      ),
    ).toBe(true);
    expect(requestMatchesEtag(new Request('https://example.com'), etag)).toBe(
      false,
    );
  });

  it('should load and return icons from cache', async () => {
    const icons = getIcons();
    const nameList = getIconNameList();
    const themedIcons = getThemedIcons();

    expect(Object.keys(icons).length).toBeGreaterThan(0);
    expect(nameList).toContain('javascript');
    expect(themedIcons.has('nestjs')).toBe(true);
  });
});
