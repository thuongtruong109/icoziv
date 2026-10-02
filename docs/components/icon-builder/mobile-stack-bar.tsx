import { ArrowUpRight, Layers3 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface MobileStackBarProps {
  onOpen: () => void;
  selectedCount: number;
}

export function MobileStackBar({ onOpen, selectedCount }: MobileStackBarProps) {
  if (!selectedCount) return null;

  return (
    <div className="mobile-stack-bar" role="region" aria-label="Badge summary">
      <span className="mobile-stack-bar__icon">
        <Layers3 aria-hidden="true" size={17} />
      </span>
      <div>
        <strong>{selectedCount} icons selected</strong>
        <span>Your badge is ready</span>
      </div>
      <Button onClick={onOpen} size="sm" variant="primary">
        Preview &amp; copy
        <ArrowUpRight aria-hidden="true" size={14} />
      </Button>
    </div>
  );
}
