import firebase from '../../../requests/firebase/config'
const db = firebase.firestore()

async function disliked_movie(movie, uid, likedMovies, dislikedMovies, currently_disliked) {

    if(currently_disliked) {
        console.log("currently disliked")
        console.log(dislikedMovies)

        const updated_dislikes = dislikedMovies? dislikedMovies.filter( m => m.movie_id !== movie.id ) : []

        console.log('updated_dislikes', updated_dislikes)

        await db.collection("movies").doc(uid).update({
            disliked: updated_dislikes
        })

    }
    else {
        console.log("not currently disliked")
        const updateDislikes = dislikedMovies? [...dislikedMovies, {movie_id: movie.id}] : [{movie_id: movie.id}]
        console.log("updateDislikes", updateDislikes)
        const updatedLikes = likedMovies? likedMovies.filter( m => m.movie_id !== movie.id ) : []
        console.log("updatedLikes", updatedLikes)

        await db.collection("movies").doc(uid).update({
            disliked: updateDislikes,
            liked: updatedLikes
        })
    }
}

export default disliked_movie