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
