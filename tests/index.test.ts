import { describe, it, expect } from 'vitest';
import {
  isValidTheme,
  normalizePath,
  parseIconsParam,
  generateSvg,
  iconNameList,
  icons,
  themedIcons,
} from '../utils/index.js';
import { shortNames, THEMES } from '../shared/index.js';

describe('utils', () => {
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
    expect(result).toContain('javascript');
    expect(result).toContain('typescript');
  });

  it('should generate svg with correct structure', () => {
    const svg = generateSvg(['javascript', 'typescript'], icons, 2).trim();
    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0');
    expect(svg).toContain(
      '<svg width="104.25" height="-8.25" viewBox="0 0 556 -44"',
    );
    expect(svg).toContain(
      '<svg width="104.25" height="-8.25" viewBox="0 0 556 -44"',
    );
  });
});
