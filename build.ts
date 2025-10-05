import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';

const iconsDir = readdirSync('./icons');
const icons1: Record<string, string> = {};
const icons2: Record<string, string> = {};

for (const icon of iconsDir) {
  const tmp = icon.replace('.svg', '');
  const name2 = tmp;
  const name1 = tmp.toLowerCase();

  icons1[name1] = String(readFileSync(`./icons/${icon}`));
  icons2[name2] = String(readFileSync(`./icons/${icon}`));
}

if (!existsSync('./dist')) mkdirSync('./dist');
writeFileSync('./dist/icons.json', JSON.stringify(icons1));
writeFileSync('./public/icons.json', JSON.stringify(icons2));
