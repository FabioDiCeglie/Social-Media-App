import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Rubik } from 'next/font/google'
import { Provider } from "react-redux";
import store from "../../state";
import { useMemo} from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "../../theme";
import { createWrapper } from "next-redux-wrapper";

const rubik = Rubik({ weight: ['400', '500', '700'] , subsets: ['cyrillic'] })
const wrapper = createWrapper(() => store);

function App({ Component, pageProps }: AppProps) {
  const mode = useSelector((state: {mode: string}) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <CssBaseline />
                <main className={rubik.className}>
                    <Component {...pageProps} />
                </main>
          </ThemeProvider>
      </Provider>
  )
}

export default wrapper.withRedux(App);