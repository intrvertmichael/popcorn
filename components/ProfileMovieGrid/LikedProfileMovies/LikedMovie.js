import Link from 'next/link'
import Image from 'next/image'
import styles from '../../../styles/ProfileMovieGrid.module.css'
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'

import {createMovieImageURL} from '../../../requests/movie.api'
import { useGetFirebaseUser } from "../../../context/FirebaseContext";

import removeLiked from '../firebase/liked'
import LikedMovieTags from './LikedMovieTags';

const LikedMovie = ({movie, set, tags, doTagsNeedUpdate, movies}) => {
        const firebaseUser = useGetFirebaseUser()
        const poster = createMovieImageURL(movie.poster_path)

        async function removingLikedMovie(){
            const message = `Are you sure you want to remove ${movie.original_title} from Likes?`
            if(confirm(message)){
                // remove move from Firebase Liked Movies
                await removeLiked(movie, firebaseUser)

                // filter movies shown under Liked Movies
                const filtered = movies.filter( m => m.id !== movie.id)
                set(filtered)

                // updating tag list
                doTagsNeedUpdate("tag", false)

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

                    <LikedMovieTags
                        movie={movie}
                        tags={tags}
                        doTagsNeedUpdate={doTagsNeedUpdate}
                        firebaseUser={firebaseUser}
                    />
                </div>
            </li>
        )
}

export default LikedMovie