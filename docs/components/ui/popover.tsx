'use client';

import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

import styles from './popover.module.css';

interface PopoverProps {
  children: ReactNode;
  title: string;
  trigger: ReactNode;
  triggerClassName?: string;
  triggerLabel: string;
}

export function Popover({
  children,
  title,
  trigger,
  triggerClassName,
  triggerLabel,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();

    function closeFromOutside(event: PointerEvent | FocusEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }

    document.addEventListener('pointerdown', closeFromOutside);
    document.addEventListener('focusin', closeFromOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside);
      document.removeEventListener('focusin', closeFromOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function closeAndRestoreFocus() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        aria-controls={open ? panelId : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={triggerLabel}
        className={triggerClassName}
        onClick={() => setOpen(current => !current)}
        ref={triggerRef}
        title={title}
        type="button"
      >
        {trigger}
      </button>
      {open ? (
        <div
          aria-labelledby={titleId}
          className={styles.panel}
          id={panelId}
          ref={panelRef}
          role="dialog"
          tabIndex={-1}
        >
          <header className={styles.header}>
            <h2 id={titleId}>{title}</h2>
            <Button
              aria-label={`Close ${title.toLowerCase()}`}
              onClick={closeAndRestoreFocus}
              size="icon"
              variant="ghost"
            >
              <X aria-hidden="true" size={16} />
            </Button>
          </header>
          {children}
        </div>
      ) : null}
    </div>
  );
}
