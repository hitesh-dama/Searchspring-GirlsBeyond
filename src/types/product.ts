export interface Product {
  uid: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
  url?: string;
  sku?: string;
  brand?: string;
}

export interface SearchResponse {
  results: Product[];
  pagination: {
    totalResults: number;
    begin: number;
    end: number;
    currentPage: number;
    totalPages: number;
    previousPage: number | null;
    nextPage: number | null;
    perPage: number;
  };
  merchandising?: {
    redirect?: string;
    content?: {
      inline?: Array<{
        value: string;
      }>;
    };
  };
}

export interface SearchParams {
  query: string;
  page: number;
}
