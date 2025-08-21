import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/books/getBooks';
import type { PaginatedBooks } from '@/types/book';

export default function BookList() {
  // lokalny stan paginacji (możesz potem przenieść do URL/searchParams)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState<'id' | 'title'>('id');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const params = useMemo(() => ({ page, limit, sortBy, order }), [page, limit, sortBy, order]);

  const { data, isLoading, isError, error, isFetching } = useQuery<PaginatedBooks>({
    queryKey: ['books', params],
    queryFn: () => getBooks(params),
    keepPreviousData: true, // płynne przejście między stronami
  });

  if (isLoading) return <div>Ładowanie książek…</div>;
  if (isError) return <div>Błąd: {(error as any)?.message ?? 'nie udało się pobrać danych'}</div>;

  const rows = data?.data ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-3">
      {/* Pasek sterujący */}
      <div className="flex items-center gap-3 text-sm">
        <label>
          Limit:&nbsp;
          <select
            value={limit}
            onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}
          >
            {[3,5,10,20,50].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>

        <label>
          Sortuj po:&nbsp;
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'id' | 'title')}>
            <option value="id">id</option>
            <option value="title">title</option>
          </select>
        </label>

        <label>
          Kierunek:&nbsp;
          <select value={order} onChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}>
            <option value="asc">asc</option>
            <option value="desc">desc</option>
          </select>
        </label>

        {isFetching && <span>(odświeżanie…)</span>}
      </div>

      {/* Lista */}
      <ul className="list-disc pl-6">
        {rows.map((b) => (
          <li key={b.id}>
            <strong>{b.title}</strong>{b.genre ? ` — ${b.genre}` : ''} &nbsp;|&nbsp; Autor: {b.author?.name}
          </li>
        ))}
        {rows.length === 0 && <li>Brak książek.</li>}
      </ul>

      {/* Pager */}
      {meta && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!meta.hasPrev}
          >
            ← Poprzednia
          </button>
          <span>Strona {meta.page} / {meta.pageCount}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!meta.hasNext}
          >
            Następna →
          </button>
          <span className="text-sm text-gray-500 ml-2">Łącznie: {meta.total}</span>
        </div>
      )}
    </div>
  );
}
