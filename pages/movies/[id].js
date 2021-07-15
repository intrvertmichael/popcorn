import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Movie.module.css'
import { strictEqual } from 'assert'
import Rating from '../../components/rating'

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

    const image = `https://image.tmdb.org/t/p/original/${movie.poster_path}`

    const genres = movie.genres.map( g => {
        return <li key={g.id}> {g.name} </li>
        }
    )

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <Link href='/'>
                    <a>🍿 Popcorn</a>
                </Link>
            </div>

            <div className={styles.hero}>
                {altPics[1]}
            </div>

            <div className={styles.poster} >
                <Image src={image} alt={movie.title} width="185" height="278" />
            </div>

            <div className={styles.movie_info}>
                <Rating
                    style={styles.rating}
                    score={movie.vote_average}
                    count={movie.vote_count}
                />

                <div className={styles.movie_description}>
                    <h1>{movie.title}</h1>
                    <h2>{movie.tagline}</h2>
                    <p className={styles.overview}>{movie.overview}</p>

                    <div className={styles.details}>
                        <p> Released: {movie.release_date}</p>
                        <p> Runtime: {movie.runtime} minutes</p>
                    </div>

                    <ul className={styles.genres}>{genres}</ul>
                </div>

                <div className={styles.alt_pics}>
                    {altPics}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;