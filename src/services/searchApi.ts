import { API_CONFIG } from '../constants/api';
import { SearchResponse, SearchParams } from '../types/product';

export class SearchApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'SearchApiError';
  }
}

export const searchProducts = async ({
  query,
  page,
}: SearchParams): Promise<SearchResponse> => {
  if (!query.trim()) {
    throw new SearchApiError('Search query cannot be empty');
  }

  const params = new URLSearchParams({
    siteId: API_CONFIG.SITE_ID,
    q: query.trim(),
    resultsFormat: API_CONFIG.RESULTS_FORMAT,
    page: page.toString(),
  });

  const url = `${API_CONFIG.BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new SearchApiError(
        `API request failed with status ${response.status}`,
        response.status
      );
    }

    const data: SearchResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof SearchApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new SearchApiError('Network error. Please check your connection.');
    }

    throw new SearchApiError('An unexpected error occurred');
  }
};
