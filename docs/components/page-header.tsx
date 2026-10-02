'use client';

import { ArrowLeft, GitFork, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { REPOSITORY_URL } from '@/lib/constants';

export function PageHeader() {
  const { resolvedTheme, setPreference } = useTheme();

  return (
    <header className="page-header">
      <Link className="back-link" href="/">
        <ArrowLeft aria-hidden="true" size={16} />
        Back to builder
      </Link>
      <div className="header-actions">
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
            aria-label="Toggle color theme"
            className="header-tool-button"
            onClick={() =>
              setPreference(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            size="icon"
            variant="ghost"
          >
            {resolvedTheme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
