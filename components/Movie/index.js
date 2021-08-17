import Link from 'next/link'
import Image from 'next/image'
import {createMovieImageURL} from '../../requests/movie.api'
import styles from '../../styles/Movie.module.css'
import { useGetFirebaseUser } from '../../context/FirebaseContext'

const Movie = ({movie}) => {

    const firebaseUser = useGetFirebaseUser()

    // title
    const titleLimit = 20
    const title = movie.original_title.length > titleLimit ?
                    movie.original_title.substring(0, titleLimit) + '...'
                    : movie.original_title
    const poster = createMovieImageURL(movie.poster_path)

    // event handlers
    // const api_fb = await fetch('/api/crud',{method: 'GET', headers: { uid: firebaseUser.id}})
    // const api_fb = await fetch('/api/crud', {method: 'PUT'})
    async function liked_movie() {
        console.log("Movie is liked")
        await fetch('/api/firebase/movie_crud', {
            method: 'POST',
            headers: {
                liked: true,
                user_id: firebaseUser.id,
                movie_id: movie.id,
            }
        })
    }

    async function disliked_movie() {
        console.log("Movie is disliked")
        await fetch('/api/firebase/movie_crud', {
            method: 'POST',
            headers: {
                user_id: firebaseUser.id,
                movie_id: movie.id,
            }
        })
    }

    if(!movie.poster_path) return false
    return (
        <li className={styles.movie_li} key={movie.id}>

            <Image src={poster} alt={movie.original_title} width="288" height="432"/>

            <div
                className={styles.movie_info}
                style={firebaseUser? {} : {justifyContent:"center"}}
            >
                    <div className={styles.movie_info_description}>
                        <div>
                            <h3>
                                <Link href={'/movie/' + movie.id}>
                                    <a>
                                        {title}
                                    </a>
                                </Link>
                            </h3>

                            <p>
                                ★ {movie.vote_average}
                            </p>
                        </div>
                    </div>

                    {
                        firebaseUser &&
                        <div className={styles.votes}>
                            <button onClick={liked_movie}>👍</button>
                            <button onClick={disliked_movie}>👎</button>
                        </div>
                    }
            </div>
        </li>
    )
}

export default Movie