import 'firebase/database'


import {getSingleMovie} from '../../../requests/movie.api'

export default async function handler(req, res) {
    const routes = {
        GET: getHandler,
    }

    return routes[req.method](req, res)
}

async function getHandler(req, res) {
    const { movie_id } = req.headers
    const movie = await getSingleMovie(movie_id)

    if(movie) return res.status(200).json(movie)
    return res.status(400).end()
}