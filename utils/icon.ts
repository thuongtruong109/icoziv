import encryptedFileContent from '../dist/icons.bin' with { type: 'text' };
import { decrypt } from './encrypt.js';

export type IconsMap = Record<string, string>;
let _iconsCache: IconsMap | null = null;

function normalizeData(data: unknown): string {
  if (typeof data === 'string') return data;
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data))
    return data.toString('utf8');
  throw new Error('❌ Unsupported data type for icons binary.');
}

export async function loadIcons(): Promise<void> {
  if (_iconsCache) return;

  const encryptedString = normalizeData(encryptedFileContent);
  const decryptedJsonString = await decrypt(encryptedString);
  _iconsCache = JSON.parse(decryptedJsonString);
}

export function getIcons(): IconsMap {
  if (!_iconsCache)
    throw new Error('⚠️ Icons not loaded. Call await loadIcons() first.');
  return _iconsCache;
}

export function getIconNameList(): string[] {
  const icons = getIcons();
  const names = new Set<string>();
  for (const key of Object.keys(icons)) {
    const base = key.replace(/-(light|dark)$/, '');
    names.add(base);
  }
  return [...names];
}

export function getThemedIcons(): Set<string> {
  const icons = getIcons();
  const themed = new Set<string>();
  for (const key of Object.keys(icons)) {
    if (key.includes('-light') || key.includes('-dark')) {
      themed.add(key.replace(/-(light|dark)$/, ''));
    }
  }
  return themed;
}
