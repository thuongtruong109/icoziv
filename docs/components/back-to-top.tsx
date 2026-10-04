'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

const VISIBILITY_OFFSET = 300;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > VISIBILITY_OFFSET);
    }

    const frame = window.requestAnimationFrame(updateVisibility);
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  if (!visible) return null;

  return (
    <Button
      aria-label="Back to top"
      className="back-to-top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 'auto'
            : 'smooth',
        })
      }
      size="icon"
    >
      <ArrowUp aria-hidden="true" size={17} />
    </Button>
  );
}
