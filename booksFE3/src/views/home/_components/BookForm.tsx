import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/components/inputs/TextInput';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthors } from '../../../api/authors/getAuthors';
import { addBook } from '../../../api/books/addBook';

const schema = z.object({
  title: z.string().min(2, 'Min 2 znaki'),
  genre: z.string().optional(),
  authorId: z.coerce.number().int().positive('Wybierz autora'),
});

type FormValues = z.infer<typeof schema>;

export default function BookForm() {
  const { data: authors = [] } = useQuery({ queryKey: ['authors'], queryFn: getAuthors });
  const qc = useQueryClient();
  const createBook = useMutation({
    mutationFn: addBook,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['books'] }),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    createBook.mutate(values, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput label="Tytuł" {...register('title')} error={errors.title} />
      <TextInput label="Gatunek" {...register('genre')} error={errors.genre as any} />
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 600 }}>Autor</label>
        <select {...register('authorId')}>
          <option value="">-- wybierz autora --</option>
          {authors.map(a => <option key={a.id} value={a.id}>{a.name} ({a.email})</option>)}
        </select>
        {errors.authorId && <div style={{ color: 'crimson', fontSize: 12 }}>{errors.authorId.message}</div>}
      </div>
      <button type="submit" disabled={createBook.isPending}>Dodaj książkę</button>
      {createBook.isError && <div style={{ color: 'crimson' }}>Błąd dodawania</div>}
    </form>
  );
}
