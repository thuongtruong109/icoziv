import { Check, Palette } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ColorPickerFieldProps {
  ariaLabel: string;
  errorMessage: string;
  inputLabel: string;
  isValid: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

const COLOR_PRESETS = [
  { label: 'Transparent', value: '' },
  { label: 'White', value: '#ffffff' },
  { label: 'Slate', value: '#0f172a' },
  { label: 'Indigo', value: '#312e81' },
  { label: 'Violet', value: '#581c87' },
  { label: 'Teal', value: '#115e59' },
  { label: 'Rose', value: '#881337' },
] as const;

export function ColorPickerField({
  ariaLabel,
  errorMessage,
  inputLabel,
  isValid,
  onChange,
  placeholder,
  value,
}: ColorPickerFieldProps) {
  const pickerColor = /^#[0-9a-f]{6}$/i.test(value) ? value : '#0f172a';

  return (
    <div className="color-picker">
      <div
        aria-label={`${ariaLabel} presets`}
        className="color-presets"
        role="group"
      >
        {COLOR_PRESETS.map(preset => {
          const normalizedValue = value.trim().toLowerCase();
          const selected = preset.value
            ? normalizedValue === preset.value
            : !normalizedValue || normalizedValue === 'transparent';
          return (
            <button
              aria-label={preset.label}
              aria-pressed={selected}
              className={cn(
                'color-swatch',
                !preset.value && 'color-swatch--transparent',
                preset.value === '#ffffff' && 'is-light',
                selected && 'is-selected',
              )}
              key={preset.label}
              onClick={() => onChange(preset.value)}
              style={
                preset.value ? { backgroundColor: preset.value } : undefined
              }
              title={preset.label}
              type="button"
            >
              {selected ? <Check aria-hidden="true" size={14} /> : null}
            </button>
          );
        })}
        <label className="color-picker-button" title="Choose any color">
          <input
            aria-label={`Choose custom ${ariaLabel.toLowerCase()}`}
            onChange={event => onChange(event.target.value)}
            type="color"
            value={pickerColor}
          />
          <span style={{ backgroundColor: pickerColor }} />
          <Palette aria-hidden="true" size={14} />
          Custom
        </label>
      </div>

      <label className="text-field color-value-field">
        <span>{inputLabel}</span>
        <input
          aria-invalid={!isValid}
          onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          spellCheck="false"
          type="text"
          value={value}
        />
        {!isValid ? <small>{errorMessage}</small> : null}
      </label>
    </div>
  );
}
