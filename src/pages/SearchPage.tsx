import { useSearch } from '../hooks/useSearch';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { EmptyState } from '../components/EmptyState';
import { Sparkles } from 'lucide-react';

export const SearchPage = () => {
  const { data, isLoading, error, currentQuery, performSearch, changePage, retry } =
    useSearch();

  const handleSearch = (query: string) => {
    performSearch(query, 1);
  };

  const handlePageChange = (page: number) => {
    changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-8 h-8 text-pink-600 fill-pink-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              GirlsBeyond
            </h1>
            <Sparkles className="w-8 h-8 text-pink-600 fill-pink-600" />
          </div>
          <SearchBar
            onSearch={handleSearch}
            initialQuery={currentQuery}
            isLoading={isLoading}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {data && data.results.length > 0 && (
          <>
            <div className="mb-8 bg-gradient-to-r from-pink-100/50 to-rose-100/50 rounded-2xl p-6 border border-pink-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-700 font-medium">
                    Showing{' '}
                    <span className="font-bold text-pink-600">
                      {data.pagination.begin} - {data.pagination.end}
                    </span>{' '}
                    of{' '}
                    <span className="font-bold text-pink-600">
                      {data.pagination.totalResults}
                    </span>{' '}
                    items for{' '}
                    <span className="font-bold text-rose-600 italic">
                      "{currentQuery}"
                    </span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <Pagination
                    currentPage={data.pagination.currentPage}
                    totalPages={data.pagination.totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {data.results.map((product) => (
                <ProductCard key={product.uid} product={product} />
              ))}
            </div>

            <div className="flex justify-center">
              <Pagination
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          </>
        )}

        {isLoading && <LoadingSpinner />}

        {error && !isLoading && <ErrorMessage message={error} onRetry={retry} />}

        {!data && !isLoading && !error && <EmptyState query={currentQuery} />}
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 font-medium mb-2">GirlsBeyond - Find your Universe</p>
          <p className="text-gray-400 text-sm">Powered by SearchSpring - Athos</p>
        </div>
      </footer>
    </div>
  );
};
