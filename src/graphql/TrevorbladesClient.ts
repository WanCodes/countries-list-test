import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';

const URI = 'https://countries.trevorblades.com/';

const trevorbladesClient = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache(),
});

export default trevorbladesClient;
