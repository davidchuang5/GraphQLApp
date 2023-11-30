// components/BookList.tsx

type Book = {
  name: string;
  genre: string;
  author: string;
};

type Props = {
  books: Book[];
};

export default function BookList({ books }: Props) {
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
