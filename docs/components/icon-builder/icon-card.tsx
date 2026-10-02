import { Check, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { DisplayNameMode, IconGroup } from '@/types/icon';

interface IconCardProps {
  displayMode: DisplayNameMode;
  icon: IconGroup;
  imageUrl: string;
  isSelected: boolean;
  onToggle: (icon: IconGroup) => void;
}

export function IconCard({
  displayMode,
  icon,
  imageUrl,
  isSelected,
  onToggle,
}: IconCardProps) {
  return (
    <button
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${icon.displayName}`}
      aria-pressed={isSelected}
      className={cn(
        'icon-card',
        isSelected && 'is-selected',
        displayMode === 'inside' && 'icon-card--named',
      )}
      onClick={() => onToggle(icon)}
      type="button"
    >
      <span className="icon-card__image">
        <img alt="" loading="lazy" src={imageUrl} />
      </span>
      {displayMode === 'inside' ? (
        <span className="icon-card__name">{icon.displayName}</span>
      ) : (
        <span className="icon-tooltip" role="tooltip">
          {icon.displayName}
        </span>
      )}
      <span className="icon-card__action" aria-hidden="true">
        {isSelected ? <Check size={10} strokeWidth={3} /> : <Plus size={10} />}
      </span>
    </button>
  );
}
