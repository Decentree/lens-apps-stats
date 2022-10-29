import NextDocument, { Html, Head, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/react";

import theme from "../../config/theme";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
