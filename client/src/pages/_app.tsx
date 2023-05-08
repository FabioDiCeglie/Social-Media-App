import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { useSelector } from "react-redux";
import { persistor, store } from "@/state";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import NavBar from "@/components/NavBar";
import { PersistGate } from "redux-persist/integration/react";
import withRedux from "next-redux-wrapper";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const rubik = Rubik({ weight: ["400", "500", "700"], subsets: ["cyrillic"] });

function App({ Component, pageProps }: AppProps) {
  const mode = useSelector((state: { mode: string }) => state.mode);
  const token = useSelector((state: { token: string }) => state.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const client = new ApolloClient({
    uri: "http://localhost:4020/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return (
    <ApolloProvider client={client}>
      <PersistGate loading={<h1>Loading..</h1>} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main className={rubik.className}>
            <NavBar />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </PersistGate>
    </ApolloProvider>
  );
}

const makeStore = () => store;
export default withRedux(makeStore)(App);
