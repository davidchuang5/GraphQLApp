import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // replace with your server's URL
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query getBooks {
        books {
          name
        }
      }
    `,
  })
  .then((result) => console.log('result', result));
export default client;
