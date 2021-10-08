import firebase from './config'
const db = firebase.firestore()

async function disliked_movie(movie, firebaseUser, currently_disliked) {

    if(currently_disliked) {
        const updated_dislikes = firebaseUser.disliked? firebaseUser.disliked.filter( m => m.movie_id !== movie.id ) : []

        await db.collection("movies").doc(firebaseUser.uid).update({
            disliked: updated_dislikes
        })

    }
    else {
        const updateDislikes = firebaseUser.disliked? [...firebaseUser.disliked, {movie_id: movie.id}] : [{movie_id: movie.id}]
        const updatedLikes = firebaseUser.liked? firebaseUser.liked.filter( m => m.movie_id !== movie.id ) : []
        const updatedSaves = firebaseUser.saved? firebaseUser.saved.filter( m => m.movie_id !== movie.id ) : []

        await db.collection("movies").doc(firebaseUser.uid).update({
            disliked: updateDislikes,
            liked: updatedLikes,
            saved: updatedSaves
        })
    }
}

export default disliked_movie