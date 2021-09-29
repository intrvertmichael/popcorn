import firebase from '../../../requests/firebase/config'
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'
const db = firebase.firestore()

async function removeLiked(movie, firebaseUser){
    const {current_likes, current_dislikes} = await getCurrentFirebaseMovies(firebaseUser)
    const genre_ids = movie.genres.map( g => g.id)

    const updated_likes = current_likes.filter( m => m.movie_id !== movie.id )
    await db.collection("movies").doc(firebaseUser.uid).update({
        liked: updated_likes
    })

    console.log("removed from likes...")

    if(genre_ids){
        genre_ids.map( async genre => {
            const fb_genre_res = await db.collection("genres").doc(firebaseUser.uid).get()
            const fb_genre_data = fb_genre_res.data()
            const counter = parseInt(fb_genre_data[genre])

            await db.collection("genres").doc(firebaseUser.uid).update({
                [genre]: counter - 1
            })
        })

        console.log("removed genre counters...")
    }
}

export default removeLiked
