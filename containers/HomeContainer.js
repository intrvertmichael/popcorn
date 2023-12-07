import { useMemo } from "react"
import { isEmpty } from "lodash"

import { useUserContext } from "context"
import { LIKED_MOVIES_LIMIT } from "constants/general"

import MovieCollection from "components/MovieCollection"
import Intro from "components/Intro"
import FavoriteGenreMovies from "components/FavoriteGenreMovies"

export default function Home({ best, genres }) {
  const { likedMovies } = useUserContext()

  const favoriteGenres = useMemo(() => {
    if (!likedMovies) return {}

    return likedMovies
      .map(movie => {
        if (movie.genres) return movie.genres.map(g => g.id)
        if (movie.genre_ids) return movie.genre_ids
      })
      .flat(Infinity)
      .reduce((acc, curr) => {
        if (!curr) return acc
        if (acc[curr]) return { ...acc, [curr]: acc[curr] + 1 }
        return { ...acc, [curr]: 1 }
      }, {})
  }, [likedMovies])

  const sortedFavoriteGenres =
    !isEmpty(favoriteGenres) &&
    Object.entries(favoriteGenres)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)

  const showFavorites = Boolean(likedMovies?.length >= LIKED_MOVIES_LIMIT)

  return (
    <div className='flex flex-col h-full'>
      {showFavorites ? (
        <>
          <h2 className='py-32 text-2xl text-center'>
            Based on your Liked Movies:
          </h2>

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
              title: "Best of the Year",
              movies: best?.results,
            }}
          />
        </>
      )}
    </div>
  )
}
