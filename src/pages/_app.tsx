import { AppProps } from "next/app";
import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import apolloClient from "../services/client";
import theme from "../../config/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Lens Apps Stats (🌿, 📈)</title>
        <meta name="description" content="Lens Apps Stats (🌿, 📈)" />
        <meta name="viewport" content="width=device-width initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#fff" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://localhost:3000/" />
        <meta property="og:title" content="Lens Apps Stats" />
        <meta property="og:description" content="Statistics for apps on Lens Protocol. Let the race begin!" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="http://localhost:3000/" />
        <meta property="twitter:title" content="Lens Apps Stats" />
        <meta property="twitter:description" content="Statistics for apps on Lens Protocol. Let the race begin!" />
      </Head>
      <ChakraProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
