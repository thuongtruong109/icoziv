'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef } from 'react';

import { Button } from '@/components/ui/button';

interface DialogProps {
  children: ReactNode;
  description?: string;
  open: boolean;
  onClose: () => void;
  title: string;
  width?: 'default' | 'wide';
}

export function Dialog({
  children,
  description,
  open,
  onClose,
  title,
  width = 'default',
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={`dialog-panel dialog-panel--${width}`}
        onMouseDown={event => event.stopPropagation()}
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="dialog-header">
          <div>
            <h2 id={titleId}>{title}</h2>
            {description ? <p id={descriptionId}>{description}</p> : null}
          </div>
          <Button
            aria-label="Close dialog"
            onClick={onClose}
            size="icon"
            variant="ghost"
          >
            <X aria-hidden="true" size={18} />
          </Button>
        </header>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
}
