import FirebaseContext from "context/FirebaseContext"
import "styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContext>
      <Component {...pageProps} />
    </FirebaseContext>
  )
}

export default MyApp
