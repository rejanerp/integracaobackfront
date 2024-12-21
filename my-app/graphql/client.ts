import { ApolloClient, InMemoryCache } from '@apollo/client';
import uri_url from '@/constants/env';

export const client = new ApolloClient({
  uri: 'http://192.168.56.1:4000/',
  cache: new InMemoryCache(),
});
