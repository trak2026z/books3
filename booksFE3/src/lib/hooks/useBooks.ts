import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/books/getBooks';
import type { GetBooksParams, PaginatedBooks } from '@/types/book';

export function useBooks(params: GetBooksParams) {
  return useQuery<PaginatedBooks>({
    queryKey: ['books', params],
    queryFn: () => getBooks(params),
    keepPreviousData: true,
  });
}
