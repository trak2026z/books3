import api from '../../lib/axios';
import type { Author } from '../../types/author';

export async function getAuthors(): Promise<Author[]> {
  const { data } = await api.get<Author[]>('/authors');
  return data;
}
