import { getSingleMovie } from "../../requests/movie.api"

export default async function handler(req, res) {
    const {movie_id} = req.headers

    if (req.method === 'GET') {
        const movie_data = await getSingleMovie(movie_id)
        res.status(200).json({...movie_data})
    } else {
        res.status(400)
    }
}
