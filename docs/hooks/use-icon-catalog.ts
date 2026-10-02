'use client';

import { useEffect, useState } from 'react';

import { ICON_DATA_PATH, withBasePath } from '@/lib/constants';
import { createIconCatalog, decryptCatalog } from '@/lib/icon-catalog';
import type { IconGroup } from '@/types/icon';

const CACHE_KEY = 'icoziv-next-icon-catalog';
const CACHE_TTL = 24 * 60 * 60 * 1000;

interface CachedCatalog {
  timestamp: number;
  names: string[];
}

export function useIconCatalog() {
  const [icons, setIcons] = useState<IconGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      try {
        try {
          const cachedValue = window.localStorage.getItem(CACHE_KEY);
          if (cachedValue) {
            const cached = JSON.parse(cachedValue) as CachedCatalog;
            if (Date.now() - cached.timestamp < CACHE_TTL) {
              setIcons(createIconCatalog(cached.names));
              setIsLoading(false);
              return;
            }
          }
        } catch {
          window.localStorage.removeItem(CACHE_KEY);
        }

        const response = await fetch(withBasePath(ICON_DATA_PATH), {
          signal: controller.signal,
          cache: 'no-store',
        });
        if (!response.ok)
          throw new Error(`Catalog request failed (${response.status})`);

        const payload = (await response.json()) as
          | string[]
          | Record<string, string>;
        const names = decryptCatalog(payload);
        window.localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            names,
          } satisfies CachedCatalog),
        );
        setIcons(createIconCatalog(names));
      } catch (reason) {
        if (controller.signal.aborted) return;
        setError(
          reason instanceof Error
            ? reason.message
            : 'Unable to load the icon catalog.',
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadCatalog();
    return () => controller.abort();
  }, []);

  return { icons, isLoading, error };
}
