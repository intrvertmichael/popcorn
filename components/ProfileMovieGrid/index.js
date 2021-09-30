import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/ProfileMovieGrid.module.css'
import {createMovieImageURL} from '../../requests/movie.api'
import { useGetFirebaseUser } from "../../context/FirebaseContext";

import removeLiked from './firebase/liked'
import removeDisliked from './firebase/disliked'

const ProfileMovieGrid = ({movies, set, likes}) => {
    const firebaseUser = useGetFirebaseUser()

    if(movies.length === 0) return false


    return (
        <ul className={styles.genre_movies}>
            {
                movies.map( movie => {
                    const poster = createMovieImageURL(movie.poster_path)
                    const list = likes? "Likes" : "Dislikes"
                    const message = `Are you sure you want to remove ${movie.original_title} from ${list} ?`

                    return (
                        <li key={movie.id}>
                            <Link href={'/movie/' + movie.id}>
                                <a>
                                    <Image src={poster} alt={movie.original_title} width="144" height="216" />
                                </a>
                            </Link>

                            <div className={styles.movie_caption}>
                                {
                                    likes?
                                    <button
                                        className={styles.remove}
                                        onClick={() =>{
                                            const result = window.confirm(message);
                                            if(result){
                                                removeLiked(movie, firebaseUser)
                                                const filtered = movies.filter( m => m.id !== movie.id)
                                                set(filtered)
                                            }
                                    }}> Remove from Likes </button>
                                    :
                                    <button
                                        className={styles.remove}
                                        onClick={() => {
                                            const result = window.confirm(message);
                                            if(result){
                                                removeDisliked(movie, firebaseUser)
                                                const filtered = movies.filter( m => m.id !== movie.id)
                                                set(filtered)
                                            }
                                    }}> Remove from Dislikes </button>
                                }

                                <Link href={'/movie/' + movie.id}>
                                    <a>
                                        <h4>{movie.original_title}</h4>
                                    </a>
                                </Link>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ProfileMovieGrid