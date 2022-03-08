import '../styles/globals.css'
import { init } from 'libs'
init()


function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
