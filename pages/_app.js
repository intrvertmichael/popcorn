import Head from "next/head"
import { useRouter } from "next/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { UserProvider } from "context"

import Header from "components/Header"
import Trending from "components/Trending"

import "styles/globals.css"

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const queryClient = new QueryClient()

  const isIndex = router.pathname === "/"

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no'
        />

        <meta name='author' content='Michael Paguay' />

        <meta
          property='og:url'
          content='https://popcorn-intrvertmichael.vercel.app'
        />
      </Head>

      <UserProvider>
        <div className={isIndex ? "flex flex-col h-full" : ""}>
          {isIndex && <Trending />}
          <Header />
          <Component {...pageProps} />
        </div>
      </UserProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
