// SVG cache for memoization
const _svgCache = new Map<string, string>();
const MAX_CACHE_SIZE = 100;

/**
 * Clear the SVG cache. Useful for testing or memory management.
 */
export function clearSvgCache(): void {
  _svgCache.clear();
}

// Optimized SVG generation with minimal whitespace and memoization
export function generateSvg(
  iconNames: string[],
  icons: Record<string, string>,
  perLine: number,
  baseSize = 300,
  margin = 44,
  scale = 48 / (300 - 44),
): string {
  // Create cache key from parameters
  const cacheKey = `${iconNames.join(',')}-${perLine}-${baseSize}-${margin}-${scale}`;

  if (_svgCache.has(cacheKey)) {
    return _svgCache.get(cacheKey)!;
  }
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const length =
    Math.min(perLine * baseSize, iconNames.length * baseSize) - margin;
  const height = Math.ceil(iconSvgList.length / perLine) * baseSize - margin;
  const scaledHeight = height * scale;
  const scaledWidth = length * scale;

  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${(idx % perLine) * baseSize},${Math.floor(idx / perLine) * baseSize})">${i}</g>`,
    )
    .join('');

  const svg = `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${groups}</svg>`;

  // Cache the result (with LRU-like behavior)
  if (_svgCache.size >= MAX_CACHE_SIZE) {
    const firstKey = _svgCache.keys().next().value;
    if (firstKey) {
      _svgCache.delete(firstKey);
    }
  }
  _svgCache.set(cacheKey, svg);

  return svg;
}
