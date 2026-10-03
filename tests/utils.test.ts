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
  parseBorderColorParam,
  parseBorderRadiusParam,
  parseBorderStyleParam,
  parseBorderWidthParam,
  parseGapParam,
  parseIconsParam,
  parsePaddingParam,
  parseShadowParam,
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

  it('should parse semantic border widths with none as the default', () => {
    expect(parseBorderWidthParam(null)).toBe('none');
    expect(parseBorderWidthParam('')).toBe('none');
    expect(parseBorderWidthParam('BOLD')).toBe('bold');
    expect(parseBorderWidthParam('wide')).toBeNull();
  });

  it('should normalize border colors with transparent as the default', () => {
    expect(parseBorderColorParam(null)).toBe('transparent');
    expect(parseBorderColorParam('transparent')).toBe('transparent');
    expect(parseBorderColorParam('#ABC')).toBe('#abc');
    expect(parseBorderColorParam('red')).toBeNull();
    expect(parseBorderColorParam('https://example.com')).toBeNull();
  });

  it('should parse CSS-like border styles with solid as the default', () => {
    expect(parseBorderStyleParam(null)).toBe('solid');
    expect(parseBorderStyleParam('')).toBe('solid');
    expect(parseBorderStyleParam('DASHED')).toBe('dashed');
    expect(parseBorderStyleParam('dotted')).toBe('dotted');
    expect(parseBorderStyleParam('double')).toBeNull();
  });

  it('should parse semantic corner radii with none as the default', () => {
    expect(parseBorderRadiusParam(null)).toBe('none');
    expect(parseBorderRadiusParam('')).toBe('none');
    expect(parseBorderRadiusParam('XL')).toBe('xl');
    expect(parseBorderRadiusParam('round')).toBeNull();
  });

  it('should parse semantic icon shadows with none as the default', () => {
    expect(parseShadowParam(null)).toBe('none');
    expect(parseShadowParam('')).toBe('none');
    expect(parseShadowParam('XL')).toBe('xl');
    expect(parseShadowParam('heavy')).toBeNull();
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
    ['none', '48'],
    ['thin', '50'],
    ['medium', '52'],
    ['bold', '54'],
  ] as const)('renders the %s border width', (borderWidth, expectedSize) => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      { borderColor: '#ef4444', borderWidth },
    );

    expect(svg).toContain(`width="${expectedSize}" height="${expectedSize}"`);
  });

  it('renders the border outside padding without shrinking content', () => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      {
        background: { type: 'color', value: '#abc' },
        borderColor: '#ef4444',
        borderWidth: 'medium',
        padding: 10,
      },
    );

    expect(svg).toContain('width="72" height="72"');
    expect(svg).toContain('viewBox="0 0 384 384"');
    expect(svg).toContain('<rect width="384" height="384" fill="#abc"/>');
    expect(svg).toContain('transform="translate(64,64)"');
    expect(svg).toContain(
      '<rect x="5.3333" y="5.3333" width="373.3333" height="373.3333" fill="none" stroke="#ef4444" stroke-width="10.6667"/>',
    );
  });

  it.each([
    ['solid', 'stroke-width="10.6667"/>'],
    ['dashed', 'stroke-dasharray="42.6667 21.3333"'],
    ['dotted', 'stroke-dasharray="0 26.6667" stroke-linecap="round"'],
  ] as const)('renders the %s border style', (borderStyle, expectedMarkup) => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      {
        borderColor: '#ef4444',
        borderStyle,
        borderWidth: 'medium',
      },
    );

    expect(svg).toContain(expectedMarkup);
  });

  it.each([
    ['xs', '10.6667'],
    ['sm', '21.3333'],
    ['md', '42.6667'],
    ['lg', '64'],
    ['xl', '85.3333'],
  ] as const)('clips content with the %s corner radius', (borderRadius, rx) => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      {
        background: { type: 'image', value: 'https://example.com/bg.png' },
        borderRadius,
      },
    );

    expect(svg).toContain(
      `<clipPath id="badge-rounded-clip"><rect width="256" height="256" rx="${rx}"/></clipPath>`,
    );
    expect(svg).toContain('<g clip-path="url(#badge-rounded-clip)">');
  });

  it('matches the outer corner radius when a border is present', () => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
      {
        borderColor: '#ef4444',
        borderRadius: 'md',
        borderWidth: 'medium',
      },
    );

    expect(svg).toContain(
      '<rect x="5.3333" y="5.3333" width="266.6667" height="266.6667" rx="37.3333" fill="none"',
    );
  });

  it('does not emit rounded markup by default', () => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
    );

    expect(svg).not.toContain('badge-rounded-clip');
    expect(svg).not.toContain(' rx=');
  });

  it.each([
    ['xs', '5.3333', '2.6667', '0.18'],
    ['sm', '5.3333', '5.3333', '0.2'],
    ['md', '10.6667', '10.6667', '0.22'],
    ['lg', '21.3333', '21.3333', '0.24'],
    ['xl', '42.6667', '42.6667', '0.28'],
  ] as const)(
    'renders the %s shadow on every icon group',
    (shadow, offsetY, blur, opacity) => {
      const svg = generateSvg(
        ['javascript', 'typescript'],
        {
          javascript: '<path id="js"/>',
          typescript: '<path id="ts"/>',
        },
        2,
        {
          background: { type: 'color', value: '#abc' },
          shadow,
        },
      );

      expect(svg).toContain(
        `<filter id="icon-shadow-${shadow}" x="-256" y="-256" width="768" height="768" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feDropShadow dx="0" dy="${offsetY}" stdDeviation="${blur}" flood-color="#000000" flood-opacity="${opacity}"/></filter>`,
      );
      expect(
        svg.match(new RegExp(`filter="url\\(#icon-shadow-${shadow}\\)"`, 'g')),
      ).toHaveLength(2);
      expect(svg).toContain(
        '<rect width="556" height="256" fill="#abc"/><g filter=',
      );
    },
  );

  it('does not emit icon shadow markup by default', () => {
    const svg = generateSvg(
      ['javascript'],
      { javascript: '<path id="js"/>' },
      1,
    );

    expect(svg).not.toContain('icon-shadow-');
    expect(svg).not.toContain('<feDropShadow');
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
