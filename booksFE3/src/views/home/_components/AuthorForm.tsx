import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../app/components/inputs/TextInput';
import { useAuthorCommands } from '../../../lib/hooks/useAuthorCommands';

const schema = z.object({
  name: z.string().min(2, 'Min 2 znaki'),
  email: z.string().email('Nieprawidłowy email'),
});

type FormValues = z.infer<typeof schema>;

export default function AuthorForm() {
  const { createAuthor } = useAuthorCommands();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (values: FormValues) => {
    createAuthor.mutate(values, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput label="Imię i nazwisko" {...register('name')} error={errors.name} />
      <TextInput label="Email" {...register('email')} error={errors.email} />
      <button type="submit" disabled={createAuthor.isPending}>Dodaj autora</button>
      {createAuthor.isError && <div style={{ color: 'crimson' }}>Błąd dodawania</div>}
    </form>
  );
}
