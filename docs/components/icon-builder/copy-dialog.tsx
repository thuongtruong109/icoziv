'use client';

import { Check, Code2, Copy, ExternalLink, ImageIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import type { BadgeSnippets } from '@/types/icon';

type SnippetKey = keyof BadgeSnippets;

interface CopyDialogProps {
  onClose: () => void;
  onCopy: (value: string, label: string) => Promise<void>;
  open: boolean;
  previewUrl: string;
  snippets: BadgeSnippets;
}

const snippetOptions: Array<{
  key: SnippetKey;
  label: string;
  description: string;
  icon: typeof ImageIcon;
}> = [
  {
    key: 'markdown',
    label: 'Markdown',
    description: 'Best for GitHub READMEs',
    icon: Code2,
  },
  {
    key: 'html',
    label: 'HTML',
    description: 'Use on any website',
    icon: ExternalLink,
  },
  {
    key: 'image',
    label: 'Image URL',
    description: 'Direct SVG endpoint',
    icon: ImageIcon,
  },
];

export function CopyDialog({
  onClose,
  onCopy,
  open,
  previewUrl,
  snippets,
}: CopyDialogProps) {
  const [active, setActive] = useState<SnippetKey>('markdown');
  const [copied, setCopied] = useState(false);

  async function copyActive() {
    await onCopy(
      snippets[active],
      snippetOptions.find(item => item.key === active)?.label ?? 'Snippet',
    );
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function closeDialog() {
    setCopied(false);
    onClose();
  }

  return (
    <Dialog
      description="Choose the format that fits where you want to show your stack."
      onClose={closeDialog}
      open={open}
      title="Copy your stack"
    >
      <div className="copy-preview checkerboard">
        {previewUrl ? <img alt="Badge ready to copy" src={previewUrl} /> : null}
      </div>
      <div className="snippet-tabs" role="tablist" aria-label="Embed format">
        {snippetOptions.map(option => {
          const Icon = option.icon;
          return (
            <button
              aria-selected={active === option.key}
              className={active === option.key ? 'is-active' : ''}
              key={option.key}
              onClick={() => {
                setActive(option.key);
                setCopied(false);
              }}
              role="tab"
              type="button"
            >
              <Icon size={16} />
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
            </button>
          );
        })}
      </div>
      <div className="snippet-box">
        <code>{snippets[active]}</code>
      </div>
      <div className="dialog-actions">
        <Button onClick={closeDialog} variant="ghost">
          Cancel
        </Button>
        <Button
          disabled={!snippets[active]}
          onClick={copyActive}
          variant="primary"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied
            ? 'Copied'
            : `Copy ${snippetOptions.find(item => item.key === active)?.label}`}
        </Button>
      </div>
    </Dialog>
  );
}
