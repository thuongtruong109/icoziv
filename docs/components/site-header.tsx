'use client';

import { GitFork, Info, Moon, Settings2, Sun, Users } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { REPOSITORY_URL, withBasePath } from '@/lib/constants';
import type { IconTheme, ThemePreference } from '@/types/icon';

interface SiteHeaderProps {
  iconCount: number;
  onOpenSettings: () => void;
  preference: ThemePreference;
  resolvedTheme: IconTheme;
  setPreference: (preference: ThemePreference) => void;
}

export function SiteHeader({
  iconCount,
  onOpenSettings,
  preference,
  resolvedTheme,
  setPreference,
}: SiteHeaderProps) {
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

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
          <Link className="header-link" href="/about">
            <Info aria-hidden="true" size={15} />
            <span>About</span>
          </Link>
          <Link className="header-link" href="/contributors">
            <Users aria-hidden="true" size={15} />
            <span>People</span>
          </Link>
        </div>
        <div className="header-tool-group">
          <a
            aria-label="Open Icoziv on GitHub"
            className="header-tool-button"
            href={REPOSITORY_URL}
            rel="noreferrer"
            target="_blank"
            title="GitHub"
          >
            <GitFork aria-hidden="true" size={17} />
          </a>
          <Button
            aria-label={`Use ${nextTheme} theme. Current preference: ${preference}`}
            className="header-tool-button"
            onClick={() => setPreference(nextTheme)}
            size="icon"
            title={`Use ${nextTheme} theme`}
            variant="ghost"
          >
            {resolvedTheme === 'dark' ? (
              <Sun aria-hidden="true" size={17} />
            ) : (
              <Moon aria-hidden="true" size={17} />
            )}
          </Button>
          <Button
            aria-label="Open website preferences"
            className="header-tool-button"
            onClick={onOpenSettings}
            size="icon"
            title="Website preferences"
            variant="ghost"
          >
            <Settings2 aria-hidden="true" size={17} />
          </Button>
        </div>
      </nav>
    </header>
  );
}
