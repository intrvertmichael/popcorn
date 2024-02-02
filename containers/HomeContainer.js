import Head from "next/head"
import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"

import { useUserContext } from "context"
import { LIKED_MOVIES_LIMIT } from "constants/general"
import {
  getFavoriteGenresFromLikedMovies,
  sortFavoriteGenres,
} from "utils/general"
import { getBestOf2023, getGenres } from "utils/movie.api"

import MovieCollection from "components/MovieCollection"
import Intro from "components/Intro"
import FavoriteGenreMovies from "components/FavoriteGenreMovies"
import Ai from "components/Ai"

export default function Home() {
  const { likedMovies } = useUserContext()

  const { data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  })

  const { data: best } = useQuery({
    queryKey: ["best2023"],
    queryFn: getBestOf2023,
  })

  const favoriteGenres = useMemo(
    () => getFavoriteGenresFromLikedMovies(likedMovies),
    [likedMovies],
  )

  const sortedFavoriteGenres = sortFavoriteGenres(favoriteGenres)
  const showFavorites = Boolean(likedMovies?.length >= LIKED_MOVIES_LIMIT)

  return (
    <>
      <Head>
        <meta property='og:title' content='Popcorn' />

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

      <div className='flex flex-col h-full'>
        {genres && showFavorites ? (
          <>
            <h2 className='py-32 text-2xl text-center'>
              Based on your Liked Movies:
            </h2>

            <Ai likedMovies={likedMovies} />

            {sortedFavoriteGenres.map(favoriteGenre => (
              <FavoriteGenreMovies
                key={favoriteGenre[0]}
                allGenres={genres}
                favoriteGenre={favoriteGenre}
              />
            ))}
          </>
        ) : (
          <>
            <Intro />

            <MovieCollection
              view='bar'
              movieList={{
                title: "Best of 2023",
                movies: best?.results,
              }}
            />
          </>
        )}
      </div>
    </>
  )
}
