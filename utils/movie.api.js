import { isEmpty } from "lodash"

import { ERROR_MESSAGES, MOVIE_DB_URL } from "constants/general"

const BASE_URL = "https://api.themoviedb.org/3"
const KEY = process.env.MOVIE_KEY || process.env.NEXT_PUBLIC_MOVIE_KEY

const GET_MOVIE_DB_URL = (type, id, page, movie) => {
  const KEY_PATH = "?api_key=" + KEY
  const YEAR = new Date().getFullYear()

  if (isEmpty(KEY)) throw new Error(ERROR_MESSAGES.NO_API_KEY)

  switch (type) {
    case MOVIE_DB_URL.TRENDING:
      return BASE_URL + "/trending/movie/week" + KEY_PATH

    case MOVIE_DB_URL.GENRES:
      return BASE_URL + "/genre/movie/list" + KEY_PATH

    case MOVIE_DB_URL.MOVIE_FROM_GENRE:
      return BASE_URL + "/discover/movie" + KEY_PATH + "&with_genres=" + id

    case MOVIE_DB_URL.MOVIE_FROM_GENRE_AND_PAGE:
      return (
        BASE_URL +
        "/discover/movie" +
        KEY_PATH +
        "&with_genres=" +
        id +
        "&page=" +
        page
      )

    case MOVIE_DB_URL.SINGLE_MOVIE:
      return BASE_URL + "/movie/" + id + KEY_PATH

    case MOVIE_DB_URL.IMAGELIST:
      return BASE_URL + "/movie/" + id + "/images" + KEY_PATH

    case MOVIE_DB_URL.RECOMMENDED_MOVIES:
      return BASE_URL + "/movie/" + id + "/recommendations" + KEY_PATH

    case MOVIE_DB_URL.BEST_THIS_YEAR:
      return (
        BASE_URL +
        "/discover/movie" +
        KEY_PATH +
        "&primary_release_year=" +
        YEAR +
        "&certification_country=US&certification=R&vote_count.gte=500&sort_by=vote_average.desc"
      )

    case MOVIE_DB_URL.BEST_OF_2023:
      return (
        BASE_URL +
        "/discover/movie" +
        KEY_PATH +
        "&primary_release_year=2023" +
        "&certification_country=US&certification=R&vote_count.gte=500&sort_by=vote_average.desc"
      )

    case MOVIE_DB_URL.SEARCH_MOVIE:
      return (
        BASE_URL +
        "/search/movie" +
        KEY_PATH +
        `&query=${movie}` +
        "&include_adult=false&language=en-US&page=1"
      )
  }
}

export const createMovieImageURL = path =>
  "https://image.tmdb.org/t/p/original/" + path

export const getTrending = async () => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.TRENDING)
  const res = await fetch(url)
  const data = await res.json()

  return data?.results
    .map(movie => ({
      id: movie.id,
      title: movie.original_title,
      image: createMovieImageURL(movie.poster_path),
    }))
    .slice(0, 10)
}

export const getGenres = async () => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.GENRES)
  const res = await fetch(url)
  const data = await res.json()
  return data.genres
}

export const getGenreLabel = async id => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.GENRES)
  const res = await fetch(url)
  const data = await res.json()
  return data.genres?.find(genre => genre.id.toString() === id.toString())
}

export const getMoviesFromGenre = async (genreID, page) => {
  const url = page
    ? GET_MOVIE_DB_URL(MOVIE_DB_URL.MOVIE_FROM_GENRE_AND_PAGE, genreID, page)
    : GET_MOVIE_DB_URL(MOVIE_DB_URL.MOVIE_FROM_GENRE, genreID)

  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getSingleMovie = async id => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.SINGLE_MOVIE, id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getImageList = async id => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.IMAGELIST, id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getRecommendedMovies = async id => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.RECOMMENDED_MOVIES, id)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getBestThisYear = async () => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.BEST_THIS_YEAR)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const getBestOf2023 = async () => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.BEST_OF_2023)
  const res = await fetch(url)
  const data = await res.json()
  return data
}

export const searchForMovie = async movie => {
  const url = GET_MOVIE_DB_URL(MOVIE_DB_URL.SEARCH_MOVIE, null, null, movie)
  const res = await fetch(url)
  const data = await res.json()
  return data
}
