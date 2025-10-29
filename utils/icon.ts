import encryptedFileContent from '../dist/icons.bin' with { type: 'text' };
import { decrypt } from './encrypt.js';

export type IconsMap = Record<string, string>;
let _iconsCache: IconsMap | null = null;
let _iconNameListCache: string[] | null = null;
let _themedIconsCache: Set<string> | null = null;
let _loadingPromise: Promise<void> | null = null;

function normalizeData(data: unknown): string {
  if (typeof data === 'string') return data;
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data))
    return data.toString('utf8');
  throw new Error('❌ Unsupported data type for icons binary.');
}

export async function loadIcons(): Promise<void> {
  if (_iconsCache) return;

  if (_loadingPromise) return _loadingPromise;

  _loadingPromise = (async () => {
    try {
      const encryptedString = normalizeData(encryptedFileContent);
      const decryptedJsonString = await decrypt(encryptedString);
      const icons: IconsMap = JSON.parse(decryptedJsonString);
      _iconsCache = icons;

      const names = new Set<string>();
      const themed = new Set<string>();

      for (const key of Object.keys(icons)) {
        const base = key.replace(/-(light|dark)$/, '');
        names.add(base);

        if (key.includes('-light') || key.includes('-dark')) {
          themed.add(base);
        }
      }

      _iconNameListCache = [...names];
      _themedIconsCache = themed;
    } catch (error) {
      _iconsCache = null;
      _iconNameListCache = null;
      _themedIconsCache = null;
      _loadingPromise = null;
      throw error;
    }
  })();

  return _loadingPromise;
}

export function getIcons(): IconsMap {
  if (!_iconsCache)
    throw new Error('⚠️ Icons not loaded. Call await loadIcons() first.');
  return _iconsCache;
}

export function getIconNameList(): string[] {
  if (!_iconNameListCache) {
    const icons = getIcons();
    const names = new Set<string>();
    for (const key of Object.keys(icons)) {
      const base = key.replace(/-(light|dark)$/, '');
      names.add(base);
    }
    _iconNameListCache = [...names];
  }
  return _iconNameListCache;
}

export function getThemedIcons(): Set<string> {
  if (!_themedIconsCache) {
    const icons = getIcons();
    const themed = new Set<string>();
    for (const key of Object.keys(icons)) {
      if (key.includes('-light') || key.includes('-dark')) {
        themed.add(key.replace(/-(light|dark)$/, ''));
      }
    }
    _themedIconsCache = themed;
  }
  return _themedIconsCache;
}
