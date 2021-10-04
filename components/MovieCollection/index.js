import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/MovieCollection.module.css'
import Movie from '../Movie'

const MovieCollection = ({
    view,
    movieList,
    FBLikedMovies,
    setFBLikedMovies,
    FBDisLikedMovies,
    setFBDisLikedMovies
}) => {
    const [movies, setMovies] = useState([])

    console.log(view)

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
                    setFBDisLikedMovies = {setFBDisLikedMovies}
                />
            )
        })

        setMovies(movie_array)

    }, [movieList, FBLikedMovies, FBDisLikedMovies, setFBLikedMovies, setFBDisLikedMovies])

    if(!movieList || movieList.movies?.length === 0) return false

    const movie_image_size = 20

    if(movies?.length === 0) return false

    let ul_classes
    let ul_style
    if(view === 'bar'){
        ul_classes = styles.genre_movies_bar
        ul_style = { width: `${ movies?.length * movie_image_size }%` }
    }
    if(view === 'grid'){
        ul_classes = styles.genre_movies_grid
    }

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
                <ul className={ul_classes} style={ul_style}>
                    {movies}
                </ul>
            </div>
        </div>
    )
}

export default MovieCollection;