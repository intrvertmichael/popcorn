import { useEffect, useState } from "react"

import { fetchGenreMovies } from "utils/endpoints"

import MovieCollection from "components/MovieCollection"

export default function FavoriteGenreMovies({ favoriteGenre, allGenres }) {
  const [movies, setMovies] = useState()

  const genreID = favoriteGenre[0]
  const genreInfo = allGenres?.find(genre => String(genre.id) === genreID)

  useEffect(() => {
    fetchGenreMovies(genreID).then(result => setMovies(result))
  }, [genreID])

  return (
    <MovieCollection
      key={genreID}
      view='bar'
      movieList={{
        genreID,
        title: `${genreInfo.name} Movies`,
        movies,
      }}
    />
  )
}
