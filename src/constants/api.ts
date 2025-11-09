export const API_CONFIG = {
  BASE_URL: 'https://api.searchspring.net/api/search/search.json',
  SITE_ID: 'scmq7n',
  RESULTS_FORMAT: 'native',
  DEFAULT_PAGE: 1,
  DEFAULT_QUERY: '',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect. Please check your internet connection.',
  NO_RESULTS: 'No products found matching your search.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  EMPTY_QUERY: 'Please enter a search term.',
} as const;
