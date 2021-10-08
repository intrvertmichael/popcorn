import firebase from './config'
const db = firebase.firestore()

async function disliked_movie(movie, uid, likedMovies, dislikedMovies, currently_disliked) {

    if(currently_disliked) {
        const updated_dislikes = dislikedMovies? dislikedMovies.filter( m => m.movie_id !== movie.id ) : []

        await db.collection("movies").doc(uid).update({
            disliked: updated_dislikes
        })

    }
    else {
        const updateDislikes = dislikedMovies? [...dislikedMovies, {movie_id: movie.id}] : [{movie_id: movie.id}]
        const updatedLikes = likedMovies? likedMovies.filter( m => m.movie_id !== movie.id ) : []

        await db.collection("movies").doc(uid).update({
            disliked: updateDislikes,
            liked: updatedLikes
        })
    }
}

export default disliked_movie