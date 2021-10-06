import firebase from '../../../requests/firebase/config'
const db = firebase.firestore()

async function removeDisliked(movie, firebaseUser){
    const updated_dislikes = firebaseUser.disliked.filter( m => m.movie_id !== movie.id )
    await db.collection("movies").doc(firebaseUser.uid).update({
        disliked: updated_dislikes
    })

    console.log("removed from dislikes...")
}

export default removeDisliked