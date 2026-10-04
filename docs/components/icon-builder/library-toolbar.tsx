import { GitBranch, Grid3X3, LayoutGrid, Search, X } from 'lucide-react';

import { CategorySelect } from '@/components/icon-builder/category-select';
import { Button } from '@/components/ui/button';
import type { IconCategory, ViewMode } from '@/types/icon';

interface LibraryToolbarProps {
  category: IconCategory | 'all';
  iconCount: number;
  onCategoryChange: (category: IconCategory | 'all') => void;
  onOpenGitHubImport: () => void;
  onQueryChange: (query: string) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
  query: string;
  viewMode: ViewMode;
}

export function LibraryToolbar({
  category,
  iconCount,
  onCategoryChange,
  onOpenGitHubImport,
  onQueryChange,
  onViewModeChange,
  query,
  viewMode,
}: LibraryToolbarProps) {
  return (
    <div className="library-toolbar">
      <Button
        aria-haspopup="dialog"
        className="toolbar-github"
        onClick={onOpenGitHubImport}
      >
        <GitBranch aria-hidden="true" size={16} />
        Detect from GitHub
      </Button>
      <label className="search-field">
        <Search aria-hidden="true" size={17} />
        <span className="sr-only">Search icons</span>
        <input
          autoComplete="off"
          onChange={event => onQueryChange(event.target.value)}
          placeholder={
            iconCount
              ? `Search ${iconCount.toLocaleString('en-US')} icons…`
              : 'Search icons…'
          }
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
