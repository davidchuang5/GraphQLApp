import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { cache } from './cache';
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/graphql', // replace with your server's URL
});

// client
//   .query({
//     query: gql`
//       query getBooks {
//         getBooks {
//           name
//           genre
//           author
//         }
//       }
//     `,
//   })
//   .then((result) => console.log('result', result));
export default client;
