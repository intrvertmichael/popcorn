import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../../styles/MovieBar.module.css'
import Movie from '../Movie'

import {useGetFirebaseUser} from '../../context/FirebaseContext'

const MovieBar = ({movieList}) => {
    const firebaseUser = useGetFirebaseUser()
    const [movies, setMovies] = useState([])

    useEffect( () => {
        const movie_array = []
        movieList.movies.map( movie => {
            // check if movie is disliked
            const fb_disliked = firebaseUser && firebaseUser.movies && firebaseUser.movies.disliked?
            firebaseUser.movies.disliked.find(m => m.movie_id.toString() === movie.id.toString()) : null

            // check if movie is liked
            const fb_liked = firebaseUser && firebaseUser.movies && firebaseUser.movies.liked?
            firebaseUser.movies.liked.find(m => m.movie_id.toString() === movie.id.toString()) : null

            const liked = fb_liked? true : null

            // if movie is not disliked then show it on the bar
            if(!fb_disliked) movie_array.push(<Movie movie={movie} key={movie.id} fb_liked={liked}/>)
        })

        setMovies(movie_array)

    }, [firebaseUser, movieList.movies])


    if(!movieList || movieList.movies.length === 0) return false

    const movie_image_size = 20

    if(movies.length === 0) return false

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
                <ul className={styles.genre_movies} style={{width: `${ movies.length * movie_image_size }%`}}>
                    {movies}
                </ul>
            </div>
        </div>
    )
}

export default MovieBar;