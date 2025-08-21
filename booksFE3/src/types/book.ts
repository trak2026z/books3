export type Author = {
  id: number;
  name: string;
  email: string;
};

export type Book = {
  id: number;
  title: string;
  genre?: string | null;
  authorId: number;
  // w BE w /books GET zwykle include: { author: true }
  author?: Author;
};

export type CreateBookDto = {
  title: string;
  genre?: string | null;
  authorId: number;
};

/** --- Paginacja --- */
export type BooksMeta = {
  total: number;
  page: number;
  limit: number;
  pageCount: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedBooks = {
  data: Book[];
  meta: BooksMeta;
};

export type GetBooksParams = {
  page?: number;          // domyślnie 1
  limit?: number;         // domyślnie 10
  sortBy?: 'id' | 'title';
  order?: 'asc' | 'desc';
  // (opcjonalne, jeśli BE ma filtry)
  authorId?: number;
  genre?: string;
  q?: string;
};
