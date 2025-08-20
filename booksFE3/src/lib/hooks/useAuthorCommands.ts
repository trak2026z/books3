import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAuthor } from '../../api/authors/addAuthor';
import type { CreateAuthorDto } from '../../types/author';

export function useAuthorCommands() {
  const qc = useQueryClient();

  const createAuthor = useMutation({
    mutationFn: (dto: CreateAuthorDto) => addAuthor(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['authors'] });
    },
  });

  return { createAuthor };
}
