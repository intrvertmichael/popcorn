// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchForMovie } from "../../requests/movie.api"

export default async function handler(req, res) {
  const searchTerm = req.headers.searchterm
  const data = await searchForMovie(searchTerm)

  if (req.method === 'GET') {
    res.status(200).json({...data})
  } else {
    res.status(400)
  }
}
