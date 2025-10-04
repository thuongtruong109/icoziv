import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';

const iconsDir = readdirSync('./public/icons');
const icons: Record<string, string> = {};
for (const icon of iconsDir) {
  // const name = icon.replace('.svg', '').toLowerCase();
  const name = icon.replace('.svg', '');

  icons[name] = String(readFileSync(`./public/icons/${icon}`));
}

if (!existsSync('./dist')) mkdirSync('./dist');
writeFileSync('./dist/icons.json', JSON.stringify(icons));
