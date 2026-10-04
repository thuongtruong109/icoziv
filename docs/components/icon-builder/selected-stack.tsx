import { Copy, Palette, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { IconGroup } from '@/types/icon';

interface SelectedIcon extends IconGroup {
  imageUrl: string;
}

interface SelectedStackProps {
  imageUrl: string;
  icons: SelectedIcon[];
  onClear: () => void;
  onCopy: () => void;
  onCustomize: () => void;
  onRemove: (icon: IconGroup) => void;
}

export function SelectedStack({
  imageUrl,
  icons,
  onClear,
  onCopy,
  onCustomize,
  onRemove,
}: SelectedStackProps) {
  return (
    <aside className="stack-panel">
      {icons.length ? (
        <>
          <div className="stack-mini-preview">
            {imageUrl ? (
              <img alt="Current generated badge" src={imageUrl} />
            ) : null}
          </div>
          <div className="stack-actions">
            <Button onClick={onCopy} variant="primary" size="sm">
              <Copy aria-hidden="true" size={15} />
              Copy &amp; embed
            </Button>
            <Button onClick={onCustomize} variant="secondary" size="sm">
              <Palette aria-hidden="true" size={15} />
              Customize badge
            </Button>
          </div>

          <div className="stack-selection-heading">
            <span className="stack-selection-title">
              Selected icons <strong>{icons.length}</strong>
            </span>
            <button onClick={onClear} type="button">
              <Trash2 aria-hidden="true" size={13} />
              Clear all
            </button>
          </div>
          <div className="stack-icons" aria-label="Selected icons">
            {icons.map(icon => (
              <button
                aria-label={`Remove ${icon.displayName}`}
                className="stack-icon"
                key={icon.key}
                onClick={() => onRemove(icon)}
                title={`Remove ${icon.displayName}`}
                type="button"
              >
                <img alt="" src={icon.imageUrl} />
                <span>
                  <X size={10} />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="stack-empty">
          <span>
            <PlusIllustration />
          </span>
          <h3>Build your stack</h3>
          <p>
            Select icons from the library. Your live badge will appear here.
          </p>
        </div>
      )}
    </aside>
  );
}

function PlusIllustration() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="34"
      viewBox="0 0 34 34"
      width="34"
    >
      <path
        d="M17 8v18M8 17h18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle
        cx="17"
        cy="17"
        r="15"
        stroke="currentColor"
        strokeDasharray="3 4"
      />
    </svg>
  );
}
