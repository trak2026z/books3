import api from '../../lib/axios';
import type { Book } from '../../types/book';

export async function getBooks(): Promise<Book[]> {
  const { data } = await api.get<Book[]>('/books');
  return data;
}
