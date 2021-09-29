import firebase from '../../../requests/firebase/config'
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'
const db = firebase.firestore()

async function removeDisliked(movie, firebaseUser){
    const {current_dislikes} = await getCurrentFirebaseMovies(firebaseUser)

    const updated_dislikes = current_dislikes.filter( m => m.movie_id !== movie.id )
    await db.collection("movies").doc(firebaseUser.uid).update({
        disliked: updated_dislikes
    })

    console.log("removed from dislikes...")
}

export default removeDisliked
