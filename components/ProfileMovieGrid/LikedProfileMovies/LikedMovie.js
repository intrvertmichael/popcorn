import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/ProfileMovieGrid.module.css'

import {createMovieImageURL} from '../../../requests/movie.api'
import { useGetFirebaseUser, useSetFirebaseUser } from "../../../context/FirebaseContext";

import liked_movie from '../../../requests/firebase/liked'
import LikedMovieTags from './LikedMovieTags';

const LikedMovie = ({movie, tags, movies}) => {
        const firebaseUser = useGetFirebaseUser()
        const setFirebaseUser = useSetFirebaseUser()

        const poster = createMovieImageURL(movie.poster_path)

        async function removingLikedMovie(){
            const message = `Are you sure you want to remove ${movie.original_title} from Likes?`
            if(confirm(message)){

                setFirebaseUser(current => {
                    const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)
                    const updatedLikes = {...current, liked: filtered}
                    return updatedLikes
                })

                // remove move from Firebase Liked Movies
                await liked_movie(
                    movie,
                    firebaseUser.uid,
                    firebaseUser.liked,
                    firebaseUser.disliked,
                    true
                    )
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
                    <button className={styles.remove} onClick={removingLikedMovie}>
                        X
                    </button>

                    <Link href={'/movie/' + movie.id}>
                        <a>
                            <h4>{movie.original_title}</h4>
                        </a>
                    </Link>

                    <LikedMovieTags movie={movie} />
                </div>
            </li>
        )
}

export default LikedMovie