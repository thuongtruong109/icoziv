'use client';

import { Moon, RotateCcw, Sun } from 'lucide-react';

import { ColorPickerField } from '@/components/icon-builder/color-picker-field';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { isValidBackground, isValidBorderColor } from '@/lib/badge';
import {
  BADGE_BORDER_RADIUS_OPTIONS,
  BADGE_BORDER_STYLE_OPTIONS,
  BADGE_BORDER_WIDTH_OPTIONS,
  BADGE_GAP_OPTIONS,
  BADGE_GROUP_STYLE_OPTIONS,
  BADGE_SHADOW_OPTIONS,
} from '@/lib/constants';
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
  const validBorderColor = isValidBorderColor(badgeSettings.borderColor);

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
            <div className="range-field">
              <span>
                Icon shadow
                <strong>{badgeSettings.shadow.toUpperCase()}</strong>
              </span>
              <div
                aria-label="Icon shadow"
                className="choice-grid choice-grid--three"
                role="group"
              >
                {BADGE_SHADOW_OPTIONS.map(option => (
                  <button
                    aria-pressed={badgeSettings.shadow === option.value}
                    className={cn(
                      'choice-card',
                      badgeSettings.shadow === option.value && 'is-active',
                    )}
                    key={option.value}
                    onClick={() => patchSettings({ shadow: option.value })}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="setting-section">
            <div className="setting-heading">
              <h3>Groups</h3>
              <p>
                Arrange selected icons by catalog category. Custom labels are
                also supported through the API.
              </p>
            </div>
            <div
              aria-label="Group presentation"
              className="choice-grid"
              role="group"
            >
              {BADGE_GROUP_STYLE_OPTIONS.map(option => (
                <button
                  aria-pressed={badgeSettings.groupStyle === option.value}
                  className={cn(
                    'choice-card choice-card--stacked',
                    badgeSettings.groupStyle === option.value && 'is-active',
                  )}
                  key={option.value}
                  onClick={() => patchSettings({ groupStyle: option.value })}
                  title={option.description}
                  type="button"
                >
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
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
              <div className="range-field">
                <span>
                  Icon gap <strong>{badgeSettings.gap.toUpperCase()}</strong>
                </span>
                <div
                  aria-label="Icon gap"
                  className="choice-grid choice-grid--five"
                  role="group"
                >
                  {BADGE_GAP_OPTIONS.map(gap => (
                    <button
                      aria-pressed={badgeSettings.gap === gap}
                      className={cn(
                        'choice-card',
                        badgeSettings.gap === gap && 'is-active',
                      )}
                      key={gap}
                      onClick={() => patchSettings({ gap })}
                      type="button"
                    >
                      {gap.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="setting-section">
            <div className="setting-heading">
              <h3>Border</h3>
              <p>Draw an optional border outside the badge content.</p>
            </div>
            <div className="range-stack">
              <div className="range-field">
                <span>
                  Border width
                  <strong>
                    {
                      BADGE_BORDER_WIDTH_OPTIONS.find(
                        option => option.value === badgeSettings.borderWidth,
                      )?.pixels
                    }
                    px
                  </strong>
                </span>
                <div
                  aria-label="Border width"
                  className="choice-grid choice-grid--four"
                  role="group"
                >
                  {BADGE_BORDER_WIDTH_OPTIONS.map(option => (
                    <button
                      aria-pressed={badgeSettings.borderWidth === option.value}
                      className={cn(
                        'choice-card',
                        badgeSettings.borderWidth === option.value &&
                          'is-active',
                      )}
                      key={option.value}
                      onClick={() =>
                        patchSettings({ borderWidth: option.value })
                      }
                      type="button"
                    >
                      {option.label} · {option.pixels}px
                    </button>
                  ))}
                </div>
              </div>
              <div className="range-field">
                <span>
                  Border style
                  <strong>{badgeSettings.borderStyle}</strong>
                </span>
                <div
                  aria-label="Border style"
                  className="choice-grid choice-grid--three"
                  role="group"
                >
                  {BADGE_BORDER_STYLE_OPTIONS.map(option => (
                    <button
                      aria-pressed={badgeSettings.borderStyle === option.value}
                      className={cn(
                        'choice-card',
                        `border-style-preview border-style-preview--${option.value}`,
                        badgeSettings.borderStyle === option.value &&
                          'is-active',
                      )}
                      key={option.value}
                      onClick={() =>
                        patchSettings({ borderStyle: option.value })
                      }
                      type="button"
                    >
                      <i aria-hidden="true" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="range-field">
                <span>
                  Corner radius
                  <strong>
                    {
                      BADGE_BORDER_RADIUS_OPTIONS.find(
                        option => option.value === badgeSettings.borderRadius,
                      )?.pixels
                    }
                    px
                  </strong>
                </span>
                <div
                  aria-label="Corner radius"
                  className="choice-grid choice-grid--three"
                  role="group"
                >
                  {BADGE_BORDER_RADIUS_OPTIONS.map(option => (
                    <button
                      aria-pressed={badgeSettings.borderRadius === option.value}
                      className={cn(
                        'choice-card',
                        badgeSettings.borderRadius === option.value &&
                          'is-active',
                      )}
                      key={option.value}
                      onClick={() =>
                        patchSettings({ borderRadius: option.value })
                      }
                      type="button"
                    >
                      {option.label} · {option.pixels}px
                    </button>
                  ))}
                </div>
              </div>
              <ColorPickerField
                ariaLabel="Border color"
                errorMessage="Please use transparent or a valid hex color."
                inputLabel="Border color"
                isValid={validBorderColor}
                onChange={borderColor => patchSettings({ borderColor })}
                placeholder="#0f172a or transparent"
                value={badgeSettings.borderColor}
              />
            </div>
          </section>

          <section className="setting-section">
            <div className="setting-heading">
              <h3>Background</h3>
            </div>
            <ColorPickerField
              ariaLabel="Background"
              errorMessage="Please use a hex color or a secure HTTPS image URL."
              inputLabel="Hex color or HTTPS image URL"
              isValid={validBackground}
              onChange={background => patchSettings({ background })}
              placeholder="#0f172a or https://..."
              value={badgeSettings.background}
            />
          </section>
        </div>

        <aside className="settings-preview">
          <div className="checkerboard">
            {previewUrl ? (
              <img alt="Customized badge preview" src={previewUrl} />
            ) : (
              <p>
                {selectedCount
                  ? 'Use valid background and border colors to restore the preview.'
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
