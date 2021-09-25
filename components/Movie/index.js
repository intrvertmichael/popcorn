import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {createMovieImageURL} from '../../requests/movie.api'
import styles from '../../styles/Movie.module.css'
import { useGetFirebaseUser } from '../../context/FirebaseContext'
import firebase from '../../requests/firebase/config'

const db = firebase.firestore()


const Movie = ({movie, fb_liked}) => {
    const firebaseUser = useGetFirebaseUser()
    const [liked, setLiked] = useState()

    useEffect( () => {
        if(fb_liked) setLiked(true)
        else setLiked(null)
    }, [fb_liked])

    // title
    const titleLimit = 20
    const title = movie.original_title.length > titleLimit ?
                    movie.original_title.substring(0, titleLimit) + '...'
                    : movie.original_title
    const poster = createMovieImageURL(movie.poster_path)

    async function getCurrentFirebaseMovies(){
        const fb_movie_res = await db.collection("movies").doc(firebaseUser.uid).get()
        const fb_movie_data = fb_movie_res.data()

        if(!fb_movie_data) db.collection("movies").doc(firebaseUser.uid).set({liked:[], disliked:[]});

        const current_likes = fb_movie_data && fb_movie_data.liked? fb_movie_data.liked : []
        const current_dislikes = fb_movie_data && fb_movie_data.disliked? fb_movie_data.disliked : []

        return {current_likes, current_dislikes}
    }

    async function liked_movie() {
        const {current_likes, current_dislikes} = await getCurrentFirebaseMovies()

        if(liked) {
            setLiked(null)
            // remove from liked list
            const updated_likes = current_likes.filter( m => m.movie_id !== movie.id )
            await db.collection("movies").doc(firebaseUser.uid).update({
                liked: updated_likes
            })
            console.log("removed from likes...")
        }

        else {
            setLiked(true)

            // add to like list on firebase
            await db.collection("movies").doc(firebaseUser.uid).update({
                liked: [ ...current_likes, {movie_id: movie.id} ]
            })

            console.log("added to likes...")

            // remove from disliked list
            const updated_dislikes = current_dislikes.filter( m => m.movie_id !== movie.id )
            await db.collection("movies").doc(firebaseUser.uid).update({
                disliked: updated_dislikes
            })

            console.log("removed from dislikes...")

            // TODO: add genre counter
        }
    }

    async function disliked_movie() {
        // await fetch('/api/firebase/movies', {
        //     method: 'POST',
        //     headers: {
        //         user_id: firebaseUser.uid,
        //         movie_id: movie.id,
        //     }
        // })
        if(liked===false) setLiked(null)
        else setLiked(false)
    }


    let classes = styles.movie_li
    if(liked) classes = styles.liked
    if(liked === false) classes = styles.disliked
    // null has no style

    if(!movie.poster_path) return false

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
                        <button onClick={liked_movie}>👍</button>
                        <button onClick={disliked_movie}>👎</button>
                    </div>
                }
            </div>
        </li>
    )
}

export default Movie