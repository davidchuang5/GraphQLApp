// components/BookList.tsx

interface Book {
  name: string;
  genre: string;
  author: string;
}

interface Props {
  books: Book[];
}

export function BookList({ books }: Props) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.name}>
          {book.name} is a {book.genre} book written by {book.author}
        </div>
      ))}
    </div>
  );
}
