import CryptoJS from 'crypto-js';

import { CATEGORY_KEYWORDS } from '@/lib/constants';
import type { IconCategory, IconGroup, IconVariants } from '@/types/icon';

type CatalogPayload = string[] | Record<string, string>;

function inferCategory(name: string): IconCategory {
  const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const categories = Object.entries(CATEGORY_KEYWORDS) as Array<
    [IconCategory, string[]]
  >;

  for (const [category, keywords] of categories) {
    if (
      category !== 'other' &&
      keywords.some(keyword => normalized.includes(keyword))
    ) {
      return category;
    }
  }
  return 'other';
}

export function decryptCatalog(payload: CatalogPayload): string[] {
  if (Array.isArray(payload)) return payload;

  const decrypted: string[] = [];
  for (const [keyHex, cipherBase64] of Object.entries(payload)) {
    const result = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(cipherBase64),
      } as CryptoJS.lib.CipherParams,
      CryptoJS.enc.Hex.parse(keyHex),
      {
        iv: CryptoJS.enc.Hex.parse('00000000000000000000000000000000'),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    const plaintext = result.toString(CryptoJS.enc.Utf8);
    if (!plaintext) continue;

    const parsed = JSON.parse(plaintext) as string[];
    decrypted.push(...parsed);
  }
  return decrypted;
}

export function createIconCatalog(names: string[]): IconGroup[] {
  const groups = new Map<string, IconGroup>();

  for (const rawName of names) {
    const name = rawName.replace(/\.svg$/i, '');
    const variantMatch = name.match(/-(dark|light)$/i);
    const variant = (variantMatch?.[1]?.toLowerCase() ??
      'common') as keyof IconVariants;
    const displayName = name.replace(/-(dark|light)$/i, '');
    const key = displayName.toLowerCase();
    const existing = groups.get(key);

    if (existing) {
      existing.variants[variant] = `${name}.svg`;
      continue;
    }

    groups.set(key, {
      key,
      displayName,
      category: inferCategory(displayName),
      variants: { [variant]: `${name}.svg` },
    });
  }

  return [...groups.values()].sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );
}
