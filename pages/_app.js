import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"

import { getTrending } from "utils/movie.api"
import { UserProvider } from "context"

import Header from "components/Header"
import Trending from "components/Trending"

import "styles/globals.css"

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const [trending, setTrending] = useState([])
  const [genres, setGenres] = useState([])

  const isIndex = router.pathname === "/"

  // TEST
  console.log("router.pathname", router.pathname)
  console.log({ isIndex })

  useEffect(() => {
    const fetchTrending = async () => {
      const trendingRes = await getTrending()
      if (trendingRes) setTrending(trendingRes)
    }

    if (isIndex) fetchTrending()
  }, [isIndex])

  useEffect(() => {
    const getGenres = async () => {
      const genres_res = await fetch("/api/genres", { method: "GET" })
      const genres_data = await genres_res.json()
      const genres = Object.entries(genres_data)?.map(data => data[1])
      setGenres(genres)
    }

    getGenres()
  }, [])

  return (
    <UserProvider>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no'
        />

        <meta property='og:title' content='Popcorn' />
        <meta name='author' content='Michael Paguay' />
        <meta
          property='og:url'
          content='https://popcorn-intrvertmichael.vercel.app'
        />
        <meta
          name='image'
          property='og:image'
          content='https://i.imgur.com/ZNdeYuX.jpg'
        />
        <meta
          name='description'
          property='og:description'
          content='Created a movie app to discover new and old movies. You can like, save, and dislike movies to organize them. Tags allow you to find the movies you want faster.'
        />
      </Head>

      <div className={isIndex ? "flex flex-col h-full" : ""}>
        {isIndex && <Trending movies={trending} />}
        <Header genres={genres} />
        <Component {...pageProps} />
      </div>
    </UserProvider>
  )
}

export default MyApp
