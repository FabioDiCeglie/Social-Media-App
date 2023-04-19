import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Rubik } from "next/font/google";
import { useSelector } from "react-redux";
import { wrapper } from "../../state";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../theme";
import NavBar from "../../components/NavBar";

const rubik = Rubik({ weight: ["400", "500", "700"], subsets: ["cyrillic"] });

function App({ Component, pageProps }: AppProps) {
  const mode = useSelector((state: { mode: string }) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
            <main className={rubik.className}>
                <NavBar />
                <Component {...pageProps} />
            </main>
      </ThemeProvider>
  );
}

export default wrapper.withRedux(App);