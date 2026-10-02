'use client';

import { Check, Moon, Palette, RotateCcw, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { isValidBackground } from '@/lib/badge';
import { cn } from '@/lib/utils';
import type { BadgeSettings } from '@/types/icon';

interface BadgeSettingsDialogProps {
  badgeSettings: BadgeSettings;
  onBadgeSettingsChange: (settings: BadgeSettings) => void;
  onClose: () => void;
  onReset: () => void;
  open: boolean;
  previewUrl: string;
  selectedCount: number;
}

const BACKGROUND_PRESETS = [
  { label: 'Transparent', value: '' },
  { label: 'White', value: '#ffffff' },
  { label: 'Slate', value: '#0f172a' },
  { label: 'Indigo', value: '#312e81' },
  { label: 'Violet', value: '#581c87' },
  { label: 'Teal', value: '#115e59' },
  { label: 'Rose', value: '#881337' },
] as const;

export function BadgeSettingsDialog({
  badgeSettings,
  onBadgeSettingsChange,
  onClose,
  onReset,
  open,
  previewUrl,
  selectedCount,
}: BadgeSettingsDialogProps) {
  const validBackground = isValidBackground(badgeSettings.background);
  const pickerColor = /^#[0-9a-f]{6}$/i.test(badgeSettings.background)
    ? badgeSettings.background
    : '#0f172a';

  function patchSettings(patch: Partial<BadgeSettings>) {
    onBadgeSettingsChange({ ...badgeSettings, ...patch });
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      title="Customize selected badge"
      width="wide"
    >
      <div className="settings-grid">
        <div className="settings-form">
          <section className="setting-section">
            <div className="setting-heading">
              <h3>Icon style</h3>
            </div>
            <div className="choice-grid">
              {(['light', 'dark'] as const).map(theme => (
                <button
                  className={cn(
                    'choice-card',
                    badgeSettings.theme === theme && 'is-active',
                  )}
                  key={theme}
                  onClick={() => patchSettings({ theme })}
                  type="button"
                >
                  {theme === 'light' ? (
                    <Sun aria-hidden="true" size={17} />
                  ) : (
                    <Moon aria-hidden="true" size={17} />
                  )}
                  {theme === 'light' ? 'Light icons' : 'Dark icons'}
                </button>
              ))}
            </div>
          </section>

          <section className="setting-section">
            <div className="setting-heading">
              <h3>Layout</h3>
            </div>
            <div className="range-stack">
              <label className="range-field">
                <span>
                  Icons per line <strong>{badgeSettings.perLine}</strong>
                </span>
                <input
                  max="30"
                  min="3"
                  onChange={event =>
                    patchSettings({ perLine: Number(event.target.value) })
                  }
                  type="range"
                  value={badgeSettings.perLine}
                />
              </label>
              <label className="range-field">
                <span>
                  Outer padding <strong>{badgeSettings.padding}px</strong>
                </span>
                <input
                  max="64"
                  min="0"
                  onChange={event =>
                    patchSettings({ padding: Number(event.target.value) })
                  }
                  type="range"
                  value={badgeSettings.padding}
                />
              </label>
            </div>
          </section>

          <section className="setting-section">
            <div className="setting-heading">
              <h3>Background</h3>
            </div>
            <div className="background-picker">
              <div
                aria-label="Background presets"
                className="background-presets"
                role="group"
              >
                {BACKGROUND_PRESETS.map(preset => {
                  const selected =
                    badgeSettings.background.toLowerCase() ===
                    preset.value.toLowerCase();
                  return (
                    <button
                      aria-label={preset.label}
                      aria-pressed={selected}
                      className={cn(
                        'background-swatch',
                        !preset.value && 'background-swatch--transparent',
                        preset.value === '#ffffff' && 'is-light',
                        selected && 'is-selected',
                      )}
                      key={preset.label}
                      onClick={() =>
                        patchSettings({ background: preset.value })
                      }
                      style={
                        preset.value
                          ? { backgroundColor: preset.value }
                          : undefined
                      }
                      title={preset.label}
                      type="button"
                    >
                      {selected ? (
                        <Check aria-hidden="true" size={14} />
                      ) : null}
                    </button>
                  );
                })}
                <label className="color-picker-button" title="Choose any color">
                  <input
                    aria-label="Choose custom background color"
                    onChange={event =>
                      patchSettings({ background: event.target.value })
                    }
                    type="color"
                    value={pickerColor}
                  />
                  <span style={{ backgroundColor: pickerColor }} />
                  <Palette aria-hidden="true" size={14} />
                  Custom
                </label>
              </div>

              <label className="text-field background-value-field">
                <span>Hex color or HTTPS image URL</span>
                <input
                  aria-invalid={!validBackground}
                  onChange={event =>
                    patchSettings({ background: event.target.value })
                  }
                  placeholder="#0f172a or https://..."
                  spellCheck="false"
                  type="text"
                  value={badgeSettings.background}
                />
                {!validBackground ? (
                  <small>
                    Please use a hex color or a secure HTTPS image URL.
                  </small>
                ) : null}
              </label>
            </div>
          </section>
        </div>

        <aside className="settings-preview">
          <div className="checkerboard">
            {previewUrl ? (
              <img alt="Customized badge preview" src={previewUrl} />
            ) : (
              <p>
                {selectedCount
                  ? 'Use a valid background to restore the preview.'
                  : 'Select an icon to preview your badge.'}
              </p>
            )}
          </div>
          <Button onClick={onReset} variant="ghost">
            <RotateCcw aria-hidden="true" size={15} />
            Restore defaults
          </Button>
        </aside>
      </div>
    </Dialog>
  );
}
