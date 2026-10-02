'use client';

import { Check, ChevronDown, Shapes } from 'lucide-react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { CATEGORY_OPTIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { IconCategory } from '@/types/icon';

type CategoryValue = IconCategory | 'all';

interface CategorySelectProps {
  onChange: (category: CategoryValue) => void;
  value: CategoryValue;
}

export function CategorySelect({ onChange, value }: CategorySelectProps) {
  const selectedIndex = Math.max(
    0,
    CATEGORY_OPTIONS.findIndex(option => option.value === value),
  );
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedOption = CATEGORY_OPTIONS[selectedIndex];

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  function openMenu(index = selectedIndex) {
    setActiveIndex(index);
    setOpen(true);
    window.requestAnimationFrame(() => listRef.current?.focus());
  }

  function closeMenu(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }

  function selectOption(index: number) {
    const option = CATEGORY_OPTIONS[index];
    if (!option) return;
    onChange(option.value);
    closeMenu(true);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
      closeMenu();
    }
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(selectedIndex);
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (event.key === 'Tab') {
      closeMenu();
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectOption(activeIndex);
      return;
    }

    let nextIndex = activeIndex;
    if (event.key === 'ArrowDown') nextIndex = activeIndex + 1;
    if (event.key === 'ArrowUp') nextIndex = activeIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = CATEGORY_OPTIONS.length - 1;
    if (nextIndex === activeIndex) return;

    event.preventDefault();
    setActiveIndex(
      Math.min(CATEGORY_OPTIONS.length - 1, Math.max(0, nextIndex)),
    );
  }

  return (
    <div className="category-select" onBlur={handleBlur} ref={rootRef}>
      <button
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="category-select__trigger"
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
        type="button"
      >
        <Shapes aria-hidden="true" size={15} />
        <span>{selectedOption.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(open && 'is-open')}
          size={15}
        />
      </button>

      {open ? (
        <div
          aria-activedescendant={`${listboxId}-option-${activeIndex}`}
          aria-label="Filter by category"
          className="category-select__menu"
          id={listboxId}
          onKeyDown={handleMenuKeyDown}
          ref={listRef}
          role="listbox"
          tabIndex={-1}
        >
          <div className="category-select__menu-label">Categories</div>
          {CATEGORY_OPTIONS.map((option, index) => (
            <button
              aria-selected={value === option.value}
              className={cn(
                'category-select__option',
                activeIndex === index && 'is-active',
                value === option.value && 'is-selected',
              )}
              id={`${listboxId}-option-${index}`}
              key={option.value}
              onClick={() => selectOption(index)}
              onMouseEnter={() => setActiveIndex(index)}
              role="option"
              type="button"
            >
              <span>{option.label}</span>
              {value === option.value ? (
                <Check aria-hidden="true" size={14} />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
