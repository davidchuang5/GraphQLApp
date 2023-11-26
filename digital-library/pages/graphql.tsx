// pages/graphql.tsx

import { useQuery, gql } from '@apollo/client';
import client from '../config/apollo_config/apolloClient';
import { BookList } from '../components/BookList';

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

export default function GraphQLPage() {
  const { data, loading, error } = useQuery(GET_BOOKS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <div>
      <BookList books={data.books} />
    </div>
  );
}
