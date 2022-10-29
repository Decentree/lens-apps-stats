import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        padding: 0,
        margin: 0,
        fontFamily: "-apple-system",
      },
      a: {
        color: "inherit",
        textDecoration: "none",
        underline: "none",
      },
      "*": {
        boxSizing: "border-box",
      },
      "@media (prefers-color-scheme: dark)": {
        html: {
          colorScheme: "dark",
        },
        body: {
          color: "white",
          background: "black",
        },
      },
    },
  },
};

const theme = extendTheme({ config });

export default theme;
