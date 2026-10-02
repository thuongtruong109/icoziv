'use client';

import { useEffect, useState } from 'react';

import type { IconTheme, ThemePreference } from '@/types/icon';

const STORAGE_KEY = 'icoziv-theme-preference';

function systemTheme(): IconTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function storedPreference(): ThemePreference {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

export function useTheme() {
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [systemPreference, setSystemPreference] = useState<IconTheme>('dark');
  const resolvedTheme = preference === 'system' ? systemPreference : preference;

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setSystemPreference(systemTheme());
    const frame = window.requestAnimationFrame(() => {
      setPreferenceState(storedPreference());
      setSystemPreference(systemTheme());
    });
    media.addEventListener('change', handleChange);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  function setPreference(nextPreference: ThemePreference) {
    setPreferenceState(nextPreference);
    window.localStorage.setItem(STORAGE_KEY, nextPreference);
  }

  return { preference, resolvedTheme, setPreference };
}
