import { describe, it, expect, beforeAll } from 'vitest';
import {
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
  getIconNameList,
  getIcons,
  getThemedIcons,
  loadIcons,
} from '../utils/index.js';
import { shortNames, THEMES } from '../shared/index.js';

import { vi } from 'vitest';
vi.mock('../utils/encrypt.js', () => ({
  decrypt: async () =>
    JSON.stringify({
      javascript: '<path id="js"/>',
      typescript: '<path id="ts"/>',
      golang: '<path id="go"/>',
      nestjs: '<path id="nest"/>',
      'javascript-dark': '<path id="js-dark"/>',
      'nestjs-light': '<path id="nest-light"/>',
    }),
}));

describe('utils', () => {
  let icons: Record<string, string>;
  let iconNameList: string[];
  let themedIcons: Set<string>;

  beforeAll(async () => {
    await loadIcons();
    icons = getIcons();
    iconNameList = getIconNameList();
    themedIcons = getThemedIcons();
  });

  it('should validate theme', () => {
    expect(isValidTheme('light', THEMES)).toBe(true);
    expect(isValidTheme('dark', THEMES)).toBe(true);
    expect(isValidTheme('other', THEMES)).toBe(false);
  });

  it('should normalize path', () => {
    expect(normalizePath('/icons')).toBe('icons');
    expect(normalizePath('icons')).toBe('icons');
    expect(normalizePath('/api/icons')).toBe('api/icons');
    expect(normalizePath('')).toBe('');
  });

  it('should parse icons param', () => {
    const result = parseIconsParam(
      'js,ts',
      'dark',
      iconNameList,
      shortNames,
      themedIcons,
    );
    expect(result).toContain('javascript-dark');
    expect(result).toContain('typescript');
  });

  it('should generate svg with correct structure', () => {
    const svg = generateSvg(['javascript', 'typescript'], icons, 2).trim();

    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('viewBox');
    expect(svg).toContain('<path id="js"/>');
    expect(svg).toContain('<path id="ts"/>');
  });

  it('should list and return icons properly', () => {
    expect(Object.keys(icons)).toContain('javascript');
    expect(iconNameList.length).toBeGreaterThan(0);
    expect(themedIcons.has('nestjs')).toBe(true);
  });
});
