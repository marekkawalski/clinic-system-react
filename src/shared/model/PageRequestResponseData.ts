export interface PageRequestResponseData<T> {
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: unknown;
  size: number;
  sort: unknown;
  totalElements: number;
  totalPages: number;
  content: T[];
}
