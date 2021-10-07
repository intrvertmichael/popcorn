import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {createMovieImageURL} from '../../requests/movie.api'
import styles from '../../styles/Movie.module.css'
import { useGetFirebaseUser, useSetFirebaseUser } from '../../context/FirebaseContext'

import liked_movie from '../../requests/firebase/liked'
import disliked_movie from '../../requests/firebase/disliked'

const Movie = ({ movie, fb_liked }) => {
    const firebaseUser = useGetFirebaseUser()
    const setFirebaseUser = useSetFirebaseUser()

    const [liked, setLiked] = useState()

    // SETTING DEFAULT MOVIE VIEW
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect( () => {
        if(fb_liked) setLiked(true)
        else setLiked(null)
    }, [fb_liked])

    const titleLimit = 20
    const title = movie?.original_title?.length > titleLimit ?
                    movie.original_title.substring(0, titleLimit) + '...'
                    : movie.original_title
    const poster = createMovieImageURL(movie.poster_path)

    let classes = styles.movie_li
    if(liked) classes = styles.liked
    if(liked === false) classes = styles.disliked

    async function handleLikedButton(){
        const currently_liked = firebaseUser.liked.find(m => m.movie_id === movie.id)

        if(currently_liked) {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )
            setFirebaseUser(current => {
                const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)
                const updatedLikes = {...current, liked: filtered}
                return updatedLikes
            })
        }

        else {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                false
            )
            setFirebaseUser(current => {
                const updatedLikes = {...current, liked: [...current.liked, {movie_id:movie.id}]}
                return updatedLikes
            })
        }
    }

    async function handleDisikedButton(){
        const currently_liked = firebaseUser.liked.find(m => m.movie_id === movie.id)
        const currently_disliked = firebaseUser.disliked.find(m => m.movie_id === movie.id)

        if(currently_liked) {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )

            setFirebaseUser(current => {
                const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)
                const updatedLikes = {...current, liked: filtered}
                return updatedLikes
            })
        }

        if(currently_disliked) {
            await disliked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )

            setFirebaseUser(current => {
                const filtered = current.disliked.filter( disliked => disliked.movie_id !== movie.id)
                const updatedDisikes = {...current, disliked: filtered}
                return updatedDisikes
            })
        }

        else {

            await disliked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                false
            )

            setFirebaseUser(current => {
                const updatedDisikes = {...current, disliked: [...current.disliked, {movie_id:movie.id}]}
                return updatedDisikes
            })
        }
    }

    // RENDERING MOVIE
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    if(!movie || !movie.poster_path) return false

    return (
        <li className={classes} key={movie.id}>

            <Image src={poster} alt={movie.original_title} width="288" height="432" />

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
                        <button onClick={handleLikedButton}>
                            👍
                        </button>

                        <button onClick={handleDisikedButton}>
                            👎
                        </button>
                    </div>
                }
            </div>
        </li>
    )
}

export default Movie