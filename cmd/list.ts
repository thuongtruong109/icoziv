import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const iconsDir = path.join(__dirname, '..', 'icons');
const files: string[] = fs
  .readdirSync(iconsDir)
  .filter(f => f.endsWith('.svg'));

const baseToFiles: Record<string, string[]> = {};

files.forEach((file: string) => {
  const base = file
    .replace('.svg', '')
    .replace('-Dark', '')
    .replace('-Light', '')
    .toLowerCase();
  if (!baseToFiles[base]) baseToFiles[base] = [];
  baseToFiles[base].push(file);
});

const baseToChosen: Record<string, string> = {};

Object.keys(baseToFiles).forEach((base: string) => {
  const groupFiles = baseToFiles[base];
  let chosen: string;
  if (groupFiles.some(f => f.includes('-Dark'))) {
    chosen = groupFiles.find(f => f.includes('-Dark')) as string;
  } else if (groupFiles.some(f => f.includes('-Light'))) {
    chosen = groupFiles.find(f => f.includes('-Light')) as string;
  } else {
    chosen = groupFiles[0];
  }
  baseToChosen[base] = chosen;
});

const sortedBases: string[] = Object.keys(baseToChosen).sort();

let table =
  '| Name | Icon | | Name | Icon | | Name | Icon |\n| :---: | :--: | :-: | :---: | :--: | :-: | :---: | :--: |\n';

for (let i = 0; i < sortedBases.length; i += 3) {
  const base1 = sortedBases[i];
  const chosen1 = baseToChosen[base1];
  const col1 = `\`${base1}\` | <img src="./icons/${chosen1}" width="48">`;

  let col2: string;
  let col3: string;

  if (i + 1 < sortedBases.length) {
    const base2 = sortedBases[i + 1];
    const chosen2 = baseToChosen[base2];
    col2 = `| | \`${base2}\` | <img src="./icons/${chosen2}" width="48">`;
  } else {
    col2 = `| | | `;
  }

  if (i + 2 < sortedBases.length) {
    const base3 = sortedBases[i + 2];
    const chosen3 = baseToChosen[base3];
    col3 = `| | \`${base3}\` | <img src="./icons/${chosen3}" width="48">`;
  } else {
    col3 = `| | | `;
  }

  table += `| ${col1} ${col2} ${col3} |\n`;
}

console.log(table);

const publicDir = path.join(__dirname, '..', 'public');

const listData = JSON.parse(JSON.stringify(sortedBases, null, 2)) as string[];
const count = Array.isArray(listData) ? listData.length : 0;

const label = `${count}+ icons`;
const padding = 12;
const textWidth = label.length * 6.2 + padding;
const width = Math.round(textWidth);
const totalWidth = width + 24;
const leftIcon = `data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPlNWRzwvdGl0bGU+PHBhdGggZD0iTTEyIDBjLTEuNDk3IDAtMi43NDkuOTY1LTMuMjQ4IDIuMTdhMy40NSAzLjQ1IDAgMDAtLjIzOCAxLjQxNiAzLjQ1OSAzLjQ1OSAwIDAwLTEuMTY4LS44MzQgMy41MDggMy41MDggMCAwMC0xLjQ2My0uMjU2IDMuNTEzIDMuNTEzIDAgMDAtMi4zNjcgMS4wMmMtMS4wNiAxLjA1OC0xLjI2MyAyLjYyNS0uNzY0IDMuODMuMTc5LjQzMi40Ny44Mi44MiAxLjE1NGEzLjQ5IDMuNDkgMCAwMC0xLjQwMi4yNTJDLjk2NSA5LjI1MSAwIDEwLjUwMiAwIDEyYzAgMS40OTcuOTY1IDIuNzQ5IDIuMTcgMy4yNDguNDM3LjE4MS45MjQuMjUgMS40MTQuMjM2LS4zNTcuMzM4LS42NS43MzItLjgzMiAxLjE3LS40OTkgMS4yMDUtLjI5NSAyLjc3Mi43NjQgMy44MyAxLjA1OCAxLjA2IDIuNjI1IDEuMjYzIDMuODMuNzY0LjQzNy0uMTgxLjgzLS40NzYgMS4xNjgtLjgzMi0uMDE0LjQ5LjA1Ny45NzcuMjM4IDEuNDE0QzkuMjUxIDIzLjAzNSAxMC41MDIgMjQgMTIgMjRjMS40OTcgMCAyLjc0OS0uOTY1IDMuMjQ4LTIuMTdhMy40NSAzLjQ1IDAgMDAuMjM4LTEuNDE2Yy4zMzguMzU2LjczLjY1MyAxLjE2OC44MzQgMS4yMDUuNDk5IDIuNzcyLjI5NSAzLjgzLS43NjQgMS4wNi0xLjA1OCAxLjI2My0yLjYyNS43NjQtMy44M2EzLjQ1OSAzLjQ1OSAwIDAwLS44MzQtMS4xNjggMy40NSAzLjQ1IDAgMDAxLjQxNi0uMjM4QzIzLjAzNSAxNC43NDkgMjQgMTMuNDk4IDI0IDEyYzAtMS40OTctLjk2NS0yLjc0OS0yLjE3LTMuMjQ4YTMuNDU1IDMuNDU1IDAgMDAtMS40MTQtLjIzNmMuMzU3LS4zMzguNjUtLjczMi44MzItMS4xNy40OTktMS4yMDUuMjk1LTIuNzcyLS43NjQtMy44M2EzLjUxMyAzLjUxMyAwIDAwLTIuMzY3LTEuMDIgMy41MDggMy41MDggMCAwMC0xLjQ2My4yNTZjLS40MzcuMTgxLS44My40NzUtMS4xNjguODMyYTMuNDUgMy40NSAwIDAwLS4yMzgtMS40MTRDMTQuNzQ5Ljk2NSAxMy40OTggMCAxMiAwem0tLjA0MSAxLjYxM2ExLjkwMiAxLjkwMiAwIDAxMS4zODcgMy4yNDZ2My44OTNMMTYuMDk4IDZBMS45MDIgMS45MDIgMCAxMTE4IDcuOTAybC0yLjc1MiAyLjc1MmgzLjg5M2ExLjkwMiAxLjkwMiAwIDExMCAyLjY5MmgtMy44OTNMMTggMTYuMDk4QTEuOTAyIDEuOTAyIDAgMTExNi4wOTggMThsLTIuNzUyLTIuNzUydjMuODkzYTEuOTAyIDEuOTAyIDAgMTEtMi42OTIgMHYtMy44OTNMNy45MDIgMThBMS45MDIgMS45MDIgMCAxMTYgMTYuMDk4bDIuNzUyLTIuNzUySDQuODU5YTEuOTAyIDEuOTAyIDAgMTEwLTIuNjkyaDMuODkzTDYgNy45MDJBMS45MDIgMS45MDIgMCAxMTcuOTAyIDZsMi43NTIgMi43NTJWNC44NTlhMS45MDIgMS45MDIgMCAwMTEuMzA1LTMuMjQ2eiIvPjwvc3ZnPg==`;

const badgeSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20" role="img" aria-label="${label}">
  <title>${label}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r"><rect width="${totalWidth}" height="20" rx="3" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="24" height="20" fill="#2b9348"/>
    <image href="${leftIcon}" x="4" y="3" height="14" width="14"/>
    <rect x="24" width="${width}" height="20" fill="#2b9348"/>
    <rect x="24" width="${width}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif"
     text-rendering="geometricPrecision" font-size="110">
    <text x="${(width + 40) * 5.1}" y="140" transform="scale(.1)">${label}</text>
  </g>
</svg>
`;

const badgePath = path.join(publicDir, 'count.svg');
fs.writeFileSync(badgePath, badgeSvg.trim(), 'utf8');
