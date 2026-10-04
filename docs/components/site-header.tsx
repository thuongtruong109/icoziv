'use client';

import { Info, Users } from 'lucide-react';
import Link from 'next/link';

import { SiteSettingsPopover } from '@/components/site-settings-popover';
import { withBasePath } from '@/lib/constants';
import type { DisplayNameMode, ThemePreference } from '@/types/icon';

interface SiteHeaderProps {
  iconCount: number;
  displayMode: DisplayNameMode;
  onDisplayModeChange: (mode: DisplayNameMode) => void;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

export function SiteHeader({
  iconCount,
  displayMode,
  onDisplayModeChange,
  preference,
  setPreference,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link aria-label="Icoziv home" className="brand" href="/">
        <span className="brand-mark">
          <img alt="" height="34" src={withBasePath('/logo.png')} width="34" />
        </span>
        <span className="brand-copy">
          <strong>Icoziv</strong>
          <small>Skills, beautifully packaged.</small>
        </span>
      </Link>

      <div className="header-meta" aria-label="Library status">
        <span className="status-dot" />
        {iconCount ? `${iconCount.toLocaleString()} icons` : 'Loading library'}
      </div>

      <nav aria-label="Primary navigation" className="header-actions">
        <div className="header-nav-group">
          <Link aria-label="About" className="header-link" href="/about">
            <Info aria-hidden="true" size={15} />
            <span>About</span>
          </Link>
          <Link
            aria-label="People"
            className="header-link"
            href="/contributors"
          >
            <Users aria-hidden="true" size={15} />
            <span>People</span>
          </Link>
          <SiteSettingsPopover
            displayMode={displayMode}
            onDisplayModeChange={onDisplayModeChange}
            onThemeChange={setPreference}
            themePreference={preference}
          />
        </div>
      </nav>
    </header>
  );
}
