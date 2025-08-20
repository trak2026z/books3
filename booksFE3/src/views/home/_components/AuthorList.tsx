import { useQuery } from '@tanstack/react-query';
import { getAuthors } from '../../../api/authors/getAuthors';

export default function AuthorList() {
  const { data = [], isLoading } = useQuery({ queryKey: ['authors'], queryFn: getAuthors });

  if (isLoading) return <div>Ładowanie autorów…</div>;

  return (
    <ul>
      {data.map(a => (
        <li key={a.id}>
          <strong>{a.name}</strong> — {a.email} {a.books && a.books.length ? `(${a.books.length} książek)` : ''}
        </li>
      ))}
    </ul>
  );
}
