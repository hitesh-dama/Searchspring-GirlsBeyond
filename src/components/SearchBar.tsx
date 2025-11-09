import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onReset?: () => void;
  initialQuery?: string;
  isLoading?: boolean;
}

export const SearchBar = ({
  onSearch,
  onReset,
  initialQuery = '',
  isLoading = false,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery || '');
  }, [initialQuery]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'drop-shadow-lg' : 'drop-shadow-md'
      }`}>
        <div className="absolute left-4 text-pink-400">
          <Search size={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for dresses, shoes, accessories..."
          disabled={isLoading}
          className="w-full pl-12 pr-40 py-4 text-base bg-white border-2 border-pink-200 rounded-full
                     focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                     placeholder:text-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed
                     transition-all font-medium"
          aria-label="Search products"
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-1.5 btn-primary flex items-center gap-1.5 px-5 py-2.5 text-sm"
          aria-label="Submit search"
        >
          <Sparkles size={18} />
          Find
        </button>
        {query && (
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setQuery('');
              if (onReset) {
                onReset();
              } else {
                onSearch('');
              }
            }}
            className="absolute right-32 btn-secondary flex items-center gap-1.5 px-4 py-2 text-sm border border-pink-300 text-pink-600 hover:bg-pink-50 transition-all rounded-full"
            aria-label="Clear filter and show all products"
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
};
