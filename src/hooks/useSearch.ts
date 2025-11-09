import { useState, useCallback } from 'react';
import { searchProducts, SearchApiError } from '../services/searchApi';
import { SearchResponse } from '../types/product';
import { API_CONFIG, ERROR_MESSAGES } from '../constants/api';

interface UseSearchState {
  data: SearchResponse | null;
  isLoading: boolean;
  error: string | null;
  currentQuery: string;
}

export const useSearch = () => {
  const [state, setState] = useState<UseSearchState>({
    data: null,
    isLoading: false,
    error: null,
    currentQuery: '',
  });

  const performSearch = useCallback(
    async (query: string, page: number = API_CONFIG.DEFAULT_PAGE) => {
      if (!query.trim()) {
        setState({
          data: null,
          isLoading: false,
          error: ERROR_MESSAGES.EMPTY_QUERY,
          currentQuery: '',
        });
        return;
      }

      setState((prev) => ({
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

  const changePage = useCallback(
    (page: number) => {
      if (state.currentQuery) {
        performSearch(state.currentQuery, page);
      }
    },
    [state.currentQuery, performSearch]
  );

  const retry = useCallback(() => {
    if (state.currentQuery) {
      performSearch(
        state.currentQuery,
        state.data?.pagination.currentPage ?? API_CONFIG.DEFAULT_PAGE
      );
    }
  }, [state.currentQuery, state.data?.pagination.currentPage, performSearch]);

  return {
    ...state,
    performSearch,
    changePage,
    retry,
  };
};
