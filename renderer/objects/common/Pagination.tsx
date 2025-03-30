export interface Pagination<T> {
  page: number;
  perPage: number;
  totalPage: number;
  totalItems: number;
  items: T[];
}
