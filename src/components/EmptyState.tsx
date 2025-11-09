import { Search, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  query?: string;
}


export const EmptyState = ({ query }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <Search className="w-12 h-12 text-pink-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {query ? 'No matches found' : 'Start Your Style Journey'}
      </h3>
      <p className="text-gray-600 text-center max-w-md mb-8">
        {query
          ? `Sorry, we couldn't find anything for "${query}". Try searching with different keywords.`
          : 'Explore our amazing collection of dresses, accessories, and more!'}
      </p>
      {!query && (
        <div className="flex items-center gap-2 text-pink-600 font-semibold animate-pulse">
          <Sparkles size={18} />
          Browse now to discover trends
        </div>
      )}
    </div>
  );
};
