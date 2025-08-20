import AuthorForm from './_components/AuthorForm';
import AuthorList from './_components/AuthorList';
import BookForm from './_components/BookForm';
import BookList from './_components/BookList';

export default function ViewHome() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16, display: 'grid', gap: 24 }}>
      <section>
        <h2>Autorzy</h2>
        <AuthorForm />
        <hr />
        <AuthorList />
      </section>
      <section>
        <h2>Książki</h2>
        <BookForm />
        <hr />
        <BookList />
      </section>
    </div>
  );
}
