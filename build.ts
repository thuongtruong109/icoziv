import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';

const iconsDir = readdirSync('./public/icons');
const icons1: Record<string, string> = {};
const icons2: Record<string, string> = {};

for (const icon of iconsDir) {
  const name1 = icon.replace('.svg', '').toLowerCase();
  // const name = icon.replace('.svg', '');

  icons1[name1] = String(readFileSync(`./public/icons/${icon}`));
  icons2[name1] = String(readFileSync(`./public/icons/${icon}`));
}

if (!existsSync('./dist')) mkdirSync('./dist');
writeFileSync('./dist/icons.json', JSON.stringify(icons1));
writeFileSync('./public/icons.json', JSON.stringify(icons2));
