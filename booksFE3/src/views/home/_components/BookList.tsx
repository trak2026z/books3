import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../../api/books/getBooks';

export default function BookList() {
  const { data = [], isLoading } = useQuery({ queryKey: ['books'], queryFn: getBooks });

  if (isLoading) return <div>Ładowanie książek…</div>;

  return (
    <ul>
      {data.map(b => (
        <li key={b.id}>
          <strong>{b.title}</strong> {b.genre ? `— ${b.genre}` : ''} | Autor: {b.author?.name ?? b.authorId}
        </li>
      ))}
    </ul>
  );
}
