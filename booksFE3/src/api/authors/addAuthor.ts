import api from '../../lib/axios';
import type { Author, CreateAuthorDto } from '../../types/author';

export async function addAuthor(payload: CreateAuthorDto): Promise<Author> {
  const { data } = await api.post<Author>('/authors', payload);
  return data;
}
