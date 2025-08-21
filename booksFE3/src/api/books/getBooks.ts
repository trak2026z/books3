import api from '@/lib/axios';
import type { GetBooksParams, PaginatedBooks } from '@/types/book';

export async function getBooks(params: GetBooksParams = {}): Promise<PaginatedBooks> {
  const res = await api.get<PaginatedBooks>('/books', { params });
  return res.data;
}

