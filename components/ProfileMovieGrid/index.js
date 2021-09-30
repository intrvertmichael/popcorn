import Image from 'next/image'
import styles from '../../styles/ProfileMovieGrid.module.css'
import {createMovieImageURL} from '../../requests/movie.api'
import { useGetFirebaseUser } from "../../context/FirebaseContext";

import removeLiked from './firebase/liked'
import removeDisliked from './firebase/disliked'

const ProfileMovieGrid = ({movies, likes}) => {
    const firebaseUser = useGetFirebaseUser()

    if(movies.length === 0) return false

    const title = likes? "Liked Movies" : "Disliked Movies"

    return (
        <ul className={styles.genre_movies}>
            {
                movies.map( movie => {
                    const poster = createMovieImageURL(movie.poster_path)
                    return (
                        <li key={movie.id}>
                            <Image src={poster} alt={movie.original_title} width="144" height="216" />
                            <div className={styles.movie_caption}>
                                <h4>{movie.original_title}</h4>
                                {
                                    likes?
                                    <button onClick={() => removeLiked(movie, firebaseUser)}>
                                        Remove from Likes
                                    </button>
                                    :
                                    <button onClick={() => removeDisliked(movie, firebaseUser)}>
                                        Remove from Dislikes
                                    </button>
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ProfileMovieGrid