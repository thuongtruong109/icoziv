'use client';

import { Laptop, Moon, Settings2, Sun } from 'lucide-react';

import { Popover } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import type { DisplayNameMode, ThemePreference } from '@/types/icon';

interface SiteSettingsPopoverProps {
  displayMode: DisplayNameMode;
  onDisplayModeChange: (mode: DisplayNameMode) => void;
  onThemeChange: (theme: ThemePreference) => void;
  themePreference: ThemePreference;
}

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
] as const;

export function SiteSettingsPopover({
  displayMode,
  onDisplayModeChange,
  onThemeChange,
  themePreference,
}: SiteSettingsPopoverProps) {
  return (
    <Popover
      title="Website preferences"
      trigger={<Settings2 aria-hidden="true" size={17} />}
      triggerClassName="header-tool-button"
      triggerLabel="Open website preferences"
    >
      <div className="site-preferences-form">
        <section className="setting-section">
          <div className="setting-heading">
            <h3>Interface theme</h3>
          </div>
          <div className="choice-grid choice-grid--three">
            {themeOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
                  aria-pressed={themePreference === option.value}
                  className={cn(
                    'choice-card',
                    themePreference === option.value && 'is-active',
                  )}
                  key={option.value}
                  onClick={() => onThemeChange(option.value)}
                  type="button"
                >
                  <Icon aria-hidden="true" size={17} />
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="setting-section">
          <div className="setting-heading">
            <h3>Icon labels</h3>
          </div>
          <div className="choice-grid">
            <button
              aria-pressed={displayMode === 'tooltip'}
              className={cn(
                'choice-card',
                displayMode === 'tooltip' && 'is-active',
              )}
              onClick={() => onDisplayModeChange('tooltip')}
              type="button"
            >
              Hover tooltip
            </button>
            <button
              aria-pressed={displayMode === 'inside'}
              className={cn(
                'choice-card',
                displayMode === 'inside' && 'is-active',
              )}
              onClick={() => onDisplayModeChange('inside')}
              type="button"
            >
              Always visible
            </button>
          </div>
        </section>
      </div>
    </Popover>
  );
}
