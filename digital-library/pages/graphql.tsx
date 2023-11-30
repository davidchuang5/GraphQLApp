import { useQuery, gql } from '@apollo/client';
import client from '../config/apollo_config/apolloClient';
import BookList from '../components/BookList';
import AddBook from '../components/AddBook';

const GET_BOOKS = gql`
  query GetBooks {
    getBooks {
      name
      genre
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $author: String!) {
    addBook(bookInput: { name: $name, genre: $genre, author: $author }) {
      name
      genre
      author
    }
  }
`;
export default function GraphQLPage() {
  const { data, loading, error } = useQuery(GET_BOOKS, { client });

  if (loading) return <p>Loading...</p>;
  console.log('data.getBooks', data.getBooks);

  if (error) return <p>Error :</p>;

  return (
    <div>
      <BookList books={data.getBooks} />
      <AddBook mutation={ADD_BOOK} />
    </div>
  );
}
