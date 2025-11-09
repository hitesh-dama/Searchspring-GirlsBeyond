import { useState, useCallback, useEffect } from 'react';
import { searchProducts, SearchApiError } from '../services/searchApi';
import { SearchResponse } from '../types/product';
import { API_CONFIG, ERROR_MESSAGES } from '../constants/api';

interface UseSearchState {
  data: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
  currentQuery: string;
}

export const useSearch = (initialQuery: string = API_CONFIG.DEFAULT_QUERY) => {
  const [state, setState] = useState<UseSearchState>({
    data: null,
    isLoading: false,
    error: null,
    currentQuery: '',
  });

  const performSearch = useCallback(
    async (query: string, page: number = API_CONFIG.DEFAULT_PAGE, isUserInitiated: boolean = false) => {
      if (isUserInitiated && !query.trim()) {
        setState({
          data: null,
          isLoading: false,
          error: ERROR_MESSAGES.EMPTY_QUERY,
          currentQuery: '',
        });
        return;
      }

      setState((prev: any) => ({
        ...prev,
        isLoading: true,
        error: null,
        currentQuery: query,
      }));

      try {
        const response = await searchProducts({ query, page });

        if (!response.results || response.results.length === 0) {
          setState({
            data: null,
            isLoading: false,
            error: ERROR_MESSAGES.NO_RESULTS,
            currentQuery: query,
          });
          return;
        }

        setState({
          data: response,
          isLoading: false,
          error: null,
          currentQuery: query,
        });
      } catch (error) {
        let errorMessage: string = ERROR_MESSAGES.GENERIC_ERROR;

        if (error instanceof SearchApiError) {
          if (error.message.includes('Network')) {
            errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
          } else {
            errorMessage = error.message;
          }
        }

        setState({
          data: null,
          isLoading: false,
          error: errorMessage,
          currentQuery: query,
        });
      }
    },
    []
  );

  useEffect(() => {
    performSearch(initialQuery, API_CONFIG.DEFAULT_PAGE, false);
  }, [initialQuery, performSearch]);

  const changePage = useCallback(
    (page: number) => {
      performSearch(state.currentQuery, page, false);
    },
    [state.currentQuery, performSearch]
  );

  const retry = useCallback(() => {
    performSearch(
      state.currentQuery,
      state.data?.pagination.currentPage ?? API_CONFIG.DEFAULT_PAGE,
      false
    );
  }, [state.currentQuery, state.data?.pagination.currentPage, performSearch]);

  const performUserSearch = (query: string, page: number = API_CONFIG.DEFAULT_PAGE) => {
    performSearch(query, page, true);
  };

  const resetSearch = (page: number = API_CONFIG.DEFAULT_PAGE) => {
    performSearch('', page, false);
  };

  return {
    ...state,
    performSearch: performUserSearch,
    changePage,
    retry,
    resetSearch,
  };
};
