import Link from 'next/link'
import Image from 'next/image'

export const getStaticPaths = async () => {
    const baseURL = "https://api.themoviedb.org/3/"
    const key = process.env.MOVIE_KEY

    const res = await fetch(baseURL +"/trending/movie/week?api_key=" + key)
    const data = await res.json()

    const moviePaths = data.results.map( movie => {
        return {
            params: { id: movie.id.toString() }
        }
    })

    return {
        paths: moviePaths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    const baseURL = "https://api.themoviedb.org/3/"
    const key = process.env.MOVIE_KEY

    const res = await fetch(baseURL +"/movie/"+ id +"?api_key=" + key)
    const data = await res.json()

    // getting images
    const imageRes = await fetch(baseURL +"/movie/"+ id +"/images?api_key=" + key)
    const imageData = await imageRes.json()

    return {
        props: { movie: data, images: imageData }
    }
}

const MovieDetails = ({movie, images}) => {

    let altPics
    if(images){
        altPics = images.backdrops.map( (img, key) => {

            const w = img.width.toString()
            const h = img.height.toString()

            const altImage = `https://image.tmdb.org/t/p/original/${img.file_path}`

            return <Image key={key} src={altImage} width={960} height={540} alt={key}/>
        })
    }

    const image = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`

    const genres = movie.genres.map( g => {
        return <li key={g.id}> {g.name} </li>
        }
    )


    return (
        <div>
            <Link href='/'>
                <a>
                    Home
                </a>
            </Link>

            <p>Rating: {movie.vote_average}</p>
            <p>Number of Votes: {movie.vote_count}</p>

            <h3>{movie.title}</h3>
            <h4>{movie.tagline}</h4>
            <p>{movie.overview}</p>
            <p> Released: {movie.release_date}</p>
            <p> Runtime: {movie.runtime} minutes</p>

            <ul>{genres}</ul>

            <Image src={image} alt={movie.title} width="185" height="278"/>

            {
                altPics?
                altPics
                : ''
            }
        </div>
    )
}

export default MovieDetails;