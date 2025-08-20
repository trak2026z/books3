import api from '../../lib/axios';
import type { Book, CreateBookDto } from '../../types/book';

export async function addBook(payload: CreateBookDto): Promise<Book> {
  const { data } = await api.post<Book>('/books', payload);
  return data;
}
