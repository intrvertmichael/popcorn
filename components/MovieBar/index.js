import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/MovieBar.module.css'
import Movie from '../Movie'

const MovieBar = ({movieList, FBLikedMovies, setFBLikedMovies, FBDisLikedMovies}) => {
    const [movies, setMovies] = useState([])

    useEffect( () => {
        const movie_array = []
        movieList.movies?.map( movie => {
            const liked = FBLikedMovies?.find( liked => liked.movie_id === movie.id)
            const disliked = FBDisLikedMovies?.find( liked => liked.movie_id === movie.id)

            if(!disliked) movie_array.push(
                <Movie
                    movie = {movie}
                    key = {movie.id}
                    fb_liked = { liked? true : null}
                    setFBLikedMovies = {setFBLikedMovies}
                />
            )
        })

        setMovies(movie_array)

    }, [movieList, FBLikedMovies, FBDisLikedMovies])

    if(!movieList || movieList.movies?.length === 0) return false

    const movie_image_size = 20

    if(movies?.length === 0) return false

    return (
        <div className={styles.movie_bar}>
            {
                movieList.genreID?
                <Link href={`/genre/${movieList.genreID}`}>
                    <a>
                        <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
                    </a>
                </Link>
                :
                <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
            }

            <div className={styles.genre_movies_wrapper}>
                <ul className={styles.genre_movies} style={{width: `${ movies?.length * movie_image_size }%`}}>
                    {movies}
                </ul>
            </div>
        </div>
    )
}

export default MovieBar;