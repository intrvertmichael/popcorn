import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/ProfileMovieGrid.module.css'

import {createMovieImageURL} from '../../../requests/movie.api'
import { useGetFirebaseUser } from "../../../context/FirebaseContext";

import removeDisliked from '../firebase/disliked'

const DislikedMovie = ({movies, movie, set}) => {
        const firebaseUser = useGetFirebaseUser()
        const poster = createMovieImageURL(movie.poster_path)

        function removeFromDislikes(){
            const message = `Are you sure you want to remove ${movie.original_title} from Dislikes?`
            if(confirm(message)){
                removeDisliked(movie, firebaseUser)
                const filtered = movies?.filter( m => m.id !== movie.id)
                set(filtered)
            }
        }

        return (
            <li key={movie.id}>
                <Link href={'/movie/' + movie.id}>
                    <a>
                        <Image src={poster} alt={movie.original_title} width="144" height="216" />
                    </a>
                </Link>

                <div className={styles.movie_caption}>
                    <button className={styles.remove} onClick={removeFromDislikes}>
                        Remove from Dislikes
                    </button>

                    <Link href={'/movie/' + movie.id}>
                        <a>
                            <h4>{movie.original_title}</h4>
                        </a>
                    </Link>

                    <p> {movie.tagline} </p>
                </div>
            </li>
        )
}

export default DislikedMovie