import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (hasPrevious && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <button
        onClick={handlePrevious}
        disabled={!hasPrevious || isLoading}
        className="btn-secondary flex items-center gap-2 px-5 py-2.5 disabled:opacity-40
                   disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="px-4 py-2.5 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full border-2 border-pink-200">
        <span className="text-sm font-semibold text-gray-700">
          Page <span className="text-pink-600">{currentPage}</span> of <span className="text-pink-600">{totalPages}</span>
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={!hasNext || isLoading}
        className="btn-secondary flex items-center gap-2 px-5 py-2.5 disabled:opacity-40
                   disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
