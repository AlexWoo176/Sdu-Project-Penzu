import {Diary} from './diary';

export interface Pagination {
  content: Diary[];
  empty;
  first;
  last;
  number;
  numberOfElements;
  size;
  sort;
  totalElements;
  totalPages;
}
