import { describe, it, expect, vi, beforeAll } from 'vitest';

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

import {
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
  loadIcons,
  getIcons,
  getIconNameList,
  getThemedIcons,
} from '../utils/index.js';
import type { Theme } from '../types/index.js';

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

  it('should load and return icons from cache', async () => {
    const icons = getIcons();
    const nameList = getIconNameList();
    const themedIcons = getThemedIcons();

    expect(Object.keys(icons).length).toBeGreaterThan(0);
    expect(nameList).toContain('javascript');
    expect(themedIcons.has('nestjs')).toBe(true);
  });
});
