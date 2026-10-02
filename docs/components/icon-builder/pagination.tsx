import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  totalItems: number;
}

export function Pagination({
  currentPage,
  onPageChange,
  pageSize,
  totalItems,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const candidates = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);
  const pages = [...candidates]
    .filter(page => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return (
    <nav aria-label="Icon pages" className="pagination">
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        size="sm"
        variant="ghost"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>
      <div className="pagination__pages">
        {pages.map((page, index) => {
          const previous = pages[index - 1];
          return (
            <span key={page}>
              {previous && page - previous > 1 ? <i>…</i> : null}
              <button
                aria-current={page === currentPage ? 'page' : undefined}
                className={page === currentPage ? 'is-active' : ''}
                onClick={() => onPageChange(page)}
                type="button"
              >
                {page}
              </button>
            </span>
          );
        })}
      </div>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        size="sm"
        variant="ghost"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </nav>
  );
}
