import { getMoviesFromGenre } from '../../requests/movie.api'

export default async function handler(req, res) {
	const { genre_id } = req.headers

	if (req.method === 'GET') {
		const genre_movies = await getMoviesFromGenre(genre_id)
		res.status(200).json({ ...genre_movies })
	} else {
		res.status(400)
	}
}
