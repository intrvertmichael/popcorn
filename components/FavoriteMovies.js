import MovieCollection from "components/MovieCollection"

export default function FavoriteMovies({ favGenreMovies, genres }) {
  const fav_genre_movies = Object.entries(favGenreMovies)
  const sorted_genre_movies = fav_genre_movies.sort(
    (a, b) => a[1].count < b[1].count,
  )

  return sorted_genre_movies.map(movieList => {
    const genre_info = genres?.find(genre => String(genre.id) === movieList[0])

    return (
      <MovieCollection
        key={movieList[0]}
        view='bar'
        movieList={{
          genreID: genre_info.id,
          title: `${genre_info.name} Movies`,
          movies: movieList[1].movies.results,
        }}
      />
    )
  })
}
