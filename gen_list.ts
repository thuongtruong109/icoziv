import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const iconsDir = path.join(__dirname, 'public', 'icons');
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
  '| Name | Icon |   | | Name | Icon |\n| :---: | :--: | :-: | :-: | :---: | :--: |\n';

for (let i = 0; i < sortedBases.length; i += 2) {
  const base1 = sortedBases[i];
  const chosen1 = baseToChosen[base1];

  const col1 = `\`${base1}\` | <img src="./public/icons/${chosen1}" width="48">`;

  let col2 = ' ';

  if (i + 1 < sortedBases.length) {
    const base2 = sortedBases[i + 1];
    const chosen2 = baseToChosen[base2];
    col2 = `|  | \`${base2}\` | <img src="./public/icons/${chosen2}" width="48">`;
  }

  table += `| ${col1} |  ${col2} |\n`;
}

console.log(table);
