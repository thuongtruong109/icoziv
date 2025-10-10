import {
  readdirSync,
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';
import { encrypt } from '../utils/encrypt.js';
import { hashPublicData } from './hash.js';

const ICONS_DIR_PATH = 'icons';
const DIST_DIR_PATH = 'dist';
const OUTPUT_BIN_FILE = `${DIST_DIR_PATH}/icons.bin`;

async function buildAssets(): Promise<void> {
  const iconsDir = readdirSync(ICONS_DIR_PATH);
  const icons: Record<string, string> = {};
  const publicIcons: Record<string, string> = {};

  for (const fileName of iconsDir) {
    if (!fileName.endsWith('.svg')) continue;
    const svg = readFileSync(`${ICONS_DIR_PATH}/${fileName}`, 'utf8');
    const iconKey = fileName.replace('.svg', '');

    const name1 = iconKey;
    publicIcons[name1] = svg;

    const iconName = iconKey.toLowerCase();
    icons[iconName] = svg;
  }

  const encrypted = await encrypt(JSON.stringify(icons));
  if (!existsSync(DIST_DIR_PATH)) mkdirSync(DIST_DIR_PATH, { recursive: true });
  writeFileSync(OUTPUT_BIN_FILE, encrypted, 'utf8');

  hashPublicData(JSON.stringify(publicIcons));
}

buildAssets().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
