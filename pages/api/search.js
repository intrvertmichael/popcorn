import { searchForMovie } from "utils/movie.api"

export default async function handler(req, res) {
  const { movie, page } = req.headers

  if (req.method === "GET") {
    const movie_data = await searchForMovie(movie, page)
    res.status(200).json({ ...movie_data })
  } else {
    res.status(400)
  }
}
