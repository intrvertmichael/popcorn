import { searchForMovie } from '../../requests/movie.api'

export default async function handler(req, res) {
	const searchTerm = req.headers.searchterm
	const page = req.headers.page

	let data
	if (page) data = await searchForMovie(searchTerm, page)
	else data = await searchForMovie(searchTerm)

	if (req.method === 'GET') {
		res.status(200).json({ ...data })
	} else {
		res.status(400)
	}
}
