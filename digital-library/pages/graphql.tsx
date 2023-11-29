import { useQuery, useMutation, gql } from '@apollo/client';
import client from '../config/apollo_config/apolloClient';
import { BookList } from '../components/BookList';
import { AddBook } from '../components/AddBook';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      genre
      author {
        name
      }
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $author: String!) {
    addbook(name: $name, genre: $genre, author: $author) {
      name
      genre
      author {
        name
      }
    }
  }
`;
export default function GraphQLPage() {
  const { data, loading, error } = useQuery(GET_BOOKS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <BookList books={data.books} />
      <AddBook mutation={ADD_BOOK} />
    </div>
  );
}
