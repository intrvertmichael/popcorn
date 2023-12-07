import { ERROR_MESSAGES } from "constants/general"
import { isEmpty } from "lodash"

const getURL = (type, id, page) => {
  const baseURL = "https://api.themoviedb.org/3"
  const key = process.env.MOVIE_KEY || process.env.NEXT_PUBLIC_MOVIE_KEY
  const keyPath = "?api_key=" + key

  if (isEmpty(key)) throw new Error(ERROR_MESSAGES.NO_API_KEY)

  const year = new Date().getFullYear()

  switch (type) {
    case "trending":
      return baseURL + "/trending/movie/week" + keyPath

    case "genres":
      return baseURL + "/genre/movie/list" + keyPath

    case "moviesFromGenre":
      return baseURL + "/discover/movie" + keyPath + "&with_genres=" + id

    case "moviesFromGenre&page":
      return (
        baseURL +
        "/discover/movie" +
        keyPath +
        "&with_genres=" +
        id +
        "&page=" +
        page
      )

    case "singleMovie":
      return baseURL + "/movie/" + id + keyPath

    case "imageList":
      return baseURL + "/movie/" + id + "/images" + keyPath

    case "recommendedMovies":
      return baseURL + "/movie/" + id + "/recommendations" + keyPath

    case "bestThisYear":
      return (
        baseURL +
        "/discover/movie" +
        keyPath +
        "&primary_release_year=" +
        year +
        "&certification_country=US&certification=R&vote_count.gte=500&sort_by=vote_average.desc"
      )
  }
}

export const createMovieImageURL = path =>
  "https://image.tmdb.org/t/p/original/" + path

export const getTrending = async () => {
  const url = getURL("trending")
  const res = await fetch(url)
  const data = await res.json()

  const movies = []

  for (let i = 0; i < 10; i++) {
    let movie = data.results[i]
    const imagePath = createMovieImageURL(movie.poster_path)
    movies.push({
      id: movie.id,
      title: movie.original_title,
      image: imagePath,
    })
  }

  return movies
}

export const getGenres = async () => {
  const url = getURL("genres")
  const res = await fetch(url)
  const data = await res.json()
  return data.genres
}

export const getGenreLabel = async id => {
  const url = getURL("genres")
  const res = await fetch(url)
  const data = await res.json()
  const genreLabel = data.genres?.find(
    genre => genre.id.toString() === id.toString(),
  )
  return genreLabel
}

export const getMoviesFromGenre = async (genreID, page) => {
  let url
  if (page) url = getURL("moviesFromGenre&page", genreID, page)
  else url = getURL("moviesFromGenre", genreID)

  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getSingleMovie = async id => {
  const url = getURL("singleMovie", id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getImageList = async id => {
  const url = getURL("imageList", id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getRecommendedMovies = async id => {
  const url = getURL("recommendedMovies", id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getBestThisYear = async () => {
  const url = getURL("bestThisYear")
  const res = await fetch(url)
  const data = await res.json()
  return data
}
