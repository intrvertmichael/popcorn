import Movie from '../Movie'
import styles from '../../styles/MovieGrid.module.css'
import {useGetFirebaseUser} from '../../context/FirebaseContext'
import { useRouter } from 'next/router'

const MovieGrid = ({movies, next_page_label}) => {
    const router = useRouter()

    const firebaseUser = useGetFirebaseUser()

    const display_movies = []
    movies.results.map( movie =>{
        // check if movie is disliked
        const fb_disliked = firebaseUser && firebaseUser.movies && firebaseUser.movies.disliked?
        firebaseUser.movies.disliked.find(m => m.movie_id.toString() === movie.id.toString()) : null

        // check if movie is liked
        const fb_liked = firebaseUser && firebaseUser.movies && firebaseUser.movies.liked?
        firebaseUser.movies.liked.find(m => m.movie_id.toString() === movie.id.toString()) : null

        const liked = fb_liked? true : null
        // if movie is not disliked then show it on the grid
        if(!fb_disliked) display_movies.push(<Movie movie={movie} key={movie.id} fb_liked={liked}/>)
    })

    if(display_movies?.length === 0) router.push(next_page_label)

    return (
        <ul className={styles.genre_movies}>
            {display_movies}
        </ul>
    )
}
export default MovieGrid