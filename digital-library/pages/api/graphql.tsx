import { useQuery } from '@apollo/client';
import client from '../apolloClient';
import { gql } from '@apollo/client';

interface DataType {
  name: string;
}

interface QueryResponse {
  data: DataType[];
}

const getData = gql`
  query getBooks {
    books {
      name
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery<QueryResponse>(getData, { client });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <main>
      <div id="main">
        <h1>List of Available Books</h1>
      </div>
      {data?.data.map((item: DataType) => (
        <div key={item.name}>
          <p>{item.name}</p>
        </div>
      ))}
    </main>
  );
}
