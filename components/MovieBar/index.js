import Link from 'next/link'
import styles from '../../styles/MovieBar.module.css'
import Movie from '../Movie'

import {useGetFirebaseUser} from '../../context/FirebaseContext'

const MovieBar = ({movieList}) => {
    const firebaseUser = useGetFirebaseUser()

    if(!movieList || movieList.movies.length <= 1) return false
    const movie_image_size = 20

    const movies = []
    movieList.movies.map( movie => {
        // check if movie is disliked
        const fb_disliked = firebaseUser && firebaseUser.disliked?
        firebaseUser.disliked.find(m => m.movie_id.toString() === movie.id.toString()) : null

        // check if movie is liked
        const fb_liked = firebaseUser && firebaseUser.liked?
        firebaseUser.liked.find(m => m.movie_id.toString() === movie.id.toString()) : null

        const liked = fb_liked? true : null
        // if movie is not disliked then show it on the bar
        if(!fb_disliked) movies.push(<Movie movie={movie} key={movie.id} fb_liked={liked}/>)
    })

    if(movies.length === 0) return false
    const ul_width = movies.length * movie_image_size

    return (
        <div className={styles.movie_bar}>
            <Link href={`/genre/${movieList.genreID}`}>
                <a>
                    <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
                </a>
            </Link>

            <div className={styles.genre_movies_wrapper}>
                <ul className={styles.genre_movies} style={{width: `${ul_width}%`}}>
                    {movies}
                </ul>
            </div>
        </div>
    )
}

export default MovieBar;