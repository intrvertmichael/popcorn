import { getGenres } from '../../requests/movie.api'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const genres = await getGenres()
		res.status(200).json({ ...genres })
	} else {
		res.status(400)
	}
}
