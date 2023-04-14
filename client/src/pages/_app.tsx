import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Rubik } from 'next/font/google'
import { Provider } from "react-redux";
import store from "../../state";

const rubik = Rubik({ weight: ['400', '500', '700'] , subsets: ['cyrillic'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <main className={rubik.className}>
            <Component {...pageProps} />
        </main>
      </Provider>
  )
}