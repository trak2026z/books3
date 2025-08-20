export type Book = {
  id: number;
  title: string;
  genre?: string | null;
  authorId: number;
  author?: { id: number; name: string; email: string };
};

export type CreateBookDto = {
  title: string;
  genre?: string | null;
  authorId: number;
};
