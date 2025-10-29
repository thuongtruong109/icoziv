// Optimized SVG generation with minimal whitespace
export function generateSvg(
  iconNames: string[],
  icons: Record<string, string>,
  perLine: number,
  baseSize = 300,
  margin = 44,
  scale = 48 / (300 - 44),
): string {
  const iconSvgList = iconNames.map(i => icons[i]).filter(Boolean);
  const length =
    Math.min(perLine * baseSize, iconNames.length * baseSize) - margin;
  const height = Math.ceil(iconSvgList.length / perLine) * baseSize - margin;
  const scaledHeight = height * scale;
  const scaledWidth = length * scale;

  // Build SVG with minimal whitespace for faster transmission
  const groups = iconSvgList
    .map(
      (i, idx) =>
        `<g transform="translate(${(idx % perLine) * baseSize},${Math.floor(idx / perLine) * baseSize})">${i}</g>`,
    )
    .join('');

  return `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" version="1.1">${groups}</svg>`;
}
