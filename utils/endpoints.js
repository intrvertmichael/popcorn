export const fetch_movie = async movie_id => {
  const res = await fetch("/api/movie", {
    method: "GET",
    headers: { movie_id },
  })

  const data = await res.json()

  return data
}

export const fetchGenreMovies = async genre_id => {
  const res = await fetch("/api/genre", {
    method: "GET",
    headers: { genre_id },
  })

  const data = await res.json()
  return data?.results
}

export const fetchGenres = async () => {
  const res = await fetch("/api/genres")
  const data = await res.json()
  return data
}

export const getRecommendedMovieData = async recommended => {
  return await Promise.all(
    recommended.map(async movie => {
      const res = await fetch("api/search", { headers: { movie } })
      const data = await res.json()
      const result = data.results[0]

      return result
    }),
  )
}
