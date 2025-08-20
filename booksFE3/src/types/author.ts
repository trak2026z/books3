export type Author = {
  id: number;
  name: string;
  email: string;
  books?: { id: number; title: string; genre?: string | null; authorId: number }[];
};

export type CreateAuthorDto = {
  name: string;
  email: string;
};
