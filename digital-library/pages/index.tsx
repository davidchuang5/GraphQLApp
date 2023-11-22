import BookList from './api/graphql';

export default function Home() {
  return (
    <main>
      <h1>Digital Library</h1>
      <BookList />
    </main>
  );
}
