import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "https://api.lens.dev/",
  cache: new InMemoryCache(),
});

export default apolloClient;
