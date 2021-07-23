

function getURL(type, id) {
    const baseURL = "https://api.themoviedb.org/3"
    const key = process.env.MOVIE_KEY
    const keyPath = "?api_key=" + key

    switch(type){
        case "trending":
        return baseURL +"/trending/movie/week" + keyPath

        case "genres":
        return baseURL +"/genre/movie/list" + keyPath

        case "moviesFromGenre":
        return baseURL + "/discover/movie" + keyPath + "&with_genres=" + id

        case "singleMovie":
        return baseURL +"/movie/"+ id + keyPath

        case "imageList":
        return baseURL +"/movie/"+ id +"/images" + keyPath
    }

}

export function createMovieImageURL(path){
    return 'https://image.tmdb.org/t/p/original/' + path
}

export async function getTrending() {
    const url = getURL("trending")
    const res = await fetch(url)
    const data = await res.json()

    const movies = []

    for(let i = 0; i < 16; i++){
        let movie = data.results[i]
        const imagePath = createMovieImageURL(movie.poster_path)
        movies.push ({
            id: movie.id,
            title: movie.original_title,
            image: imagePath
        })
    }

    return movies
}

export async function getGenres() {
    const url = getURL("genres")
    const res = await fetch(url)
    const data = await res.json()
    return data.genres
}

export async function getGenreLabel(id) {
    const url = getURL("genres")
    const res = await fetch(url)
    const data = await res.json()
    const genreLabel = data.genres.find( genre => genre.id.toString() === id.toString())
    return genreLabel
}

// get more pages = &page=2

export async function getMoviesFromGenre(genreID) {
    const url = getURL("moviesFromGenre", genreID)
    const res = await fetch(url)
    const data = await res.json()
    return data.results
}

export async function getSingleMovie(id){
    const url = getURL('singleMovie', id)
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export async function getImageList(id){
    const url = getURL("imageList", id)
    const res = await fetch(url)
    const data = await res.json()
    return data
}