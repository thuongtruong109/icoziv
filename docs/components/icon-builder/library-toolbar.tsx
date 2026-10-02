import { Grid3X3, LayoutGrid, Search, X } from 'lucide-react';

import { CategorySelect } from '@/components/icon-builder/category-select';
import { Button } from '@/components/ui/button';
import type { IconCategory, ViewMode } from '@/types/icon';

interface LibraryToolbarProps {
  category: IconCategory | 'all';
  onCategoryChange: (category: IconCategory | 'all') => void;
  onQueryChange: (query: string) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
  query: string;
  resultCount: number;
  viewMode: ViewMode;
}

export function LibraryToolbar({
  category,
  onCategoryChange,
  onQueryChange,
  onViewModeChange,
  query,
  resultCount,
  viewMode,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar">
      <label className="search-field">
        <Search aria-hidden="true" size={17} />
        <span className="sr-only">Search icons</span>
        <input
          autoComplete="off"
          onChange={event => onQueryChange(event.target.value)}
          placeholder="Search React, Docker, Figma..."
          type="search"
          value={query}
        />
        {query ? (
          <button
            aria-label="Clear search"
            onClick={() => onQueryChange('')}
            type="button"
          >
            <X size={15} />
          </button>
        ) : null}
        <kbd>⌘ K</kbd>
      </label>

      <CategorySelect onChange={onCategoryChange} value={category} />

      <div className="toolbar-count">
        <strong>{resultCount.toLocaleString()}</strong>
        <span>results</span>
      </div>

      <div className="segmented" aria-label="Icon loading mode">
        <Button
          aria-label="Paginated view"
          aria-pressed={viewMode === 'pagination'}
          className={viewMode === 'pagination' ? 'is-active' : ''}
          onClick={() => onViewModeChange('pagination')}
          size="icon"
          variant="ghost"
        >
          <Grid3X3 aria-hidden="true" size={17} />
        </Button>
        <Button
          aria-label="Continuous view"
          aria-pressed={viewMode === 'infinite'}
          className={viewMode === 'infinite' ? 'is-active' : ''}
          onClick={() => onViewModeChange('infinite')}
          size="icon"
          variant="ghost"
        >
          <LayoutGrid aria-hidden="true" size={17} />
        </Button>
      </div>
    </div>
  );
}
