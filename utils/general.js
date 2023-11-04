import { round } from "lodash"

export async function getGenreMovies(genreID) {
  const genre_res = await fetch("/api/genre", {
    method: "GET",
    headers: { genre_id: genreID },
  })

  const genre_data = await genre_res.json()
  return genre_data
}

export function createFullLength(length) {
  const lengthHours = Math.floor(length / 60)
  const lengthMins = length % 60
  const fullLength =
    (lengthHours > 1
      ? lengthHours + " hours and "
      : lengthHours + " hour and ") +
    lengthMins +
    " minutes"
  return fullLength
}

export function createFullDate(date) {
  const dateObj = new Date(date)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}

export const formatRating = rating => round(rating, 2).toFixed(1)
