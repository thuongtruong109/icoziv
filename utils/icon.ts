import { decrypt } from './encrypt.js';

export type IconsMap = Record<string, string>;

let _iconsCache: IconsMap | null = null;
let _iconNameListCache: string[] | null = null;
let _themedIconsCache: Set<string> | null = null;
let _loadingPromise: Promise<void> | null = null;

export async function loadIcons(env: Env): Promise<void> {
  if (_iconsCache) return;
  if (_loadingPromise) return _loadingPromise;

  _loadingPromise = (async () => {
    try {
      const encryptedString = await env.ICONS_KV.get('icons');
      if (!encryptedString)
        throw new Error('icons payload missing in KV (key: "icons")');

      const decryptedJsonString = await decrypt(encryptedString);
      const icons: IconsMap = JSON.parse(decryptedJsonString);
      _iconsCache = icons;

      const names = new Set<string>();
      const themed = new Set<string>();

      for (const key in icons) {
        const i = key.lastIndexOf('-');
        if (i > 0) {
          const suf = key.slice(i + 1);
          if (suf === 'light' || suf === 'dark') {
            const base = key.slice(0, i);
            names.add(base);
            themed.add(base);
            continue;
          }
        }
        names.add(key);
      }

      _iconNameListCache = [...names];
      _themedIconsCache = themed;
    } catch (e) {
      _iconsCache = null;
      _iconNameListCache = null;
      _themedIconsCache = null;
      _loadingPromise = null;
      throw e;
    }
  })();

  return _loadingPromise;
}

export function getIcons(): IconsMap {
  if (!_iconsCache)
    throw new Error('⚠️ Icons not loaded. Call await loadIcons(env) first.');
  return _iconsCache;
}

export function getIconNameList(): string[] {
  if (!_iconNameListCache)
    throw new Error('⚠️ Icons not loaded. Call await loadIcons(env) first.');
  return _iconNameListCache;
}

export function getThemedIcons(): Set<string> {
  if (!_themedIconsCache)
    throw new Error('⚠️ Icons not loaded. Call await loadIcons(env) first.');
  return _themedIconsCache;
}
