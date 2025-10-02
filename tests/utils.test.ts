import { describe, it, expect } from 'vitest';
import {
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
} from '../utils/index.js';
import type { Theme } from '../types/index.js';

describe('utils', () => {
  const THEMES: Theme[] = ['light', 'dark'];
  const iconNameList = ['javascript', 'typescript', 'golang', 'nestjs'];
  const shortNames = { js: 'javascript', ts: 'typescript', go: 'golang' };
  const themedIcons = new Set(['javascript', 'nestjs']);

  it('should validate themes correctly', () => {
    expect(isValidTheme('light', THEMES)).toBe(true);
    expect(isValidTheme('dark', THEMES)).toBe(true);
    expect(isValidTheme('blue', THEMES)).toBe(false);
  });

  it('should normalize paths', () => {
    expect(normalizePath('/api/icons/')).toBe('api/icons');
    expect(normalizePath('///icons///')).toBe('//icons//');
    expect(normalizePath('')).toBe('');
  });

  it('should parse icon params with short names', () => {
    const result = parseIconsParam(
      'js,ts,go',
      'dark',
      iconNameList,
      shortNames,
      themedIcons
    );
    expect(result).toEqual(['javascript-dark', 'typescript', 'golang']);
  });

  it('should return themed icons if available', () => {
    const result = parseIconsParam(
      'nestjs',
      'light',
      iconNameList,
      shortNames,
      themedIcons
    );
    expect(result).toEqual(['nestjs-light']);
  });

  it('should handle "all" keyword', () => {
    const result = parseIconsParam(
      'all',
      'dark',
      iconNameList,
      shortNames,
      themedIcons
    );
    expect(result.length).toBe(iconNameList.length);
  });

  it('should return empty array for null param', () => {
    expect(
      parseIconsParam(null, 'dark', iconNameList, shortNames, themedIcons)
    ).toEqual([]);
  });

  it('should return existing svg element', () => {
    const icons = {
      javascript: '<path id="js"/>',
      typescript: '<path id="ts"/>',
    };
    const svg = generateSvg(['javascript', 'typescript'], icons, 2).trim();
    expect(svg).toContain('<svg');
  });
});
