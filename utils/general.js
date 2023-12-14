import { round, isEmpty } from "lodash"

export const createFullLength = length => {
  const lengthHours = Math.floor(length / 60)
  const lengthMins = length % 60
  return (
    (lengthHours > 1
      ? lengthHours + " hours and "
      : lengthHours + " hour and ") +
    lengthMins +
    " minutes"
  )
}

export const createFullDate = date => {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString("default", { month: "long" })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}

export const formatRating = rating => round(rating, 2).toFixed(1)

export const findMovieFromList = (movie, movieList) => {
  return !isEmpty(movieList) && movieList.find(m => m.id === movie.id)
}

export const getFavoriteGenresFromLikedMovies = likedMovies => {
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
}

export const sortFavoriteGenres = favoriteGenres =>
  !isEmpty(favoriteGenres) &&
  Object.entries(favoriteGenres)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

export const checkIfExists = value =>
  value !== null && typeof value !== "undefined"
