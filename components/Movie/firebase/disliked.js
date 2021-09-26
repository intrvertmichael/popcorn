import firebase from '../../../requests/firebase/config'
import {getCurrentFirebaseMovies} from './fb_movies'

const db = firebase.firestore()

// DISLIKED BUTTON LISTENER
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export async function disliked_movie(movie, setLiked, firebaseUser) {
    const {current_likes, current_dislikes} = await getCurrentFirebaseMovies(firebaseUser)
    const currently_disliked = current_dislikes.find(m => m.movie_id === movie.id)

    if(currently_disliked) {
        setLiked(null)

        const updated_dislikes = current_dislikes.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            disliked: updated_dislikes
        })

        console.log("removed from dislikes...")
    }

    else {
        setLiked(false)

        await db.collection("movies").doc(firebaseUser.uid).update({
            disliked: [ ...current_dislikes, {movie_id: movie.id} ]
        })

        console.log("added to dislikes...")


        const updated_likes = current_likes.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: updated_likes
        })

        console.log("removed from likes...")
    }
}