'use client';

import { Laptop, Moon, Sun } from 'lucide-react';

import { Dialog } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { DisplayNameMode, ThemePreference } from '@/types/icon';

interface SiteSettingsDialogProps {
  displayMode: DisplayNameMode;
  onClose: () => void;
  onDisplayModeChange: (mode: DisplayNameMode) => void;
  onThemeChange: (theme: ThemePreference) => void;
  open: boolean;
  themePreference: ThemePreference;
}

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
] as const;

export function SiteSettingsDialog({
  displayMode,
  onClose,
  onDisplayModeChange,
  onThemeChange,
  open,
  themePreference,
}: SiteSettingsDialogProps) {
  return (
    <Dialog onClose={onClose} open={open} title="Website preferences">
      <div className="settings-form">
        <section className="setting-section">
          <div className="setting-heading">
            <h3>Interface theme</h3>
            <p>Choose how the website looks on this device.</p>
          </div>
          <div className="choice-grid choice-grid--three">
            {themeOptions.map(option => {
              const Icon = option.icon;
              return (
                <button
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
            <p>Show icon names inside cards or only while hovering.</p>
          </div>
          <div className="choice-grid">
            <button
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
    </Dialog>
  );
}
