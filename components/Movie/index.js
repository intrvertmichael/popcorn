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
    async function liked_movie() {
        console.log("button was pressed")
        // const api_fb = await fetch('/api/crud',{method: 'GET', headers: { uid: firebaseUser.id}})
        const api_fb = await fetch('/api/movie_crud', {method: 'POST', headers: {
            liked: true,
            user_id: firebaseUser.id,
            movie_id: movie.id,
        }})
        // const api_fb = await fetch('/api/crud', {method: 'PUT'})
        console.log("api_fb", api_fb)
        console.log(firebaseUser.name, "likes", movie.original_title)
    }

    async function disliked_movie() {
        const api_fb = await fetch('/api/crud', {method: 'DELETE'})
        console.log(firebaseUser.name, "DOES NOT like", movie.original_title)
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