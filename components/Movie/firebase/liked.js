import firebase from '../../../requests/firebase/config'
import getCurrentFirebaseMovies from './_get'
const db = firebase.firestore()

async function liked_movie(movie, setLiked, firebaseUser) {
    const {current_likes, current_dislikes} = await getCurrentFirebaseMovies(firebaseUser)
    const currently_liked = current_likes.find(m => m.movie_id === movie.id)

    if(currently_liked) {
        setLiked(null)

        const updated_likes = current_likes.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: updated_likes
        })

        console.log("removed from likes...")

        if(movie.genre_ids){
            movie.genre_ids.map( async genre => {
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

    else {
        setLiked(true)

        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: [ ...current_likes, {movie_id: movie.id} ]
        })

        console.log("added to likes...")


        const updated_dislikes = current_dislikes.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            disliked: updated_dislikes
        })

        console.log("removed from dislikes...")

        if(movie.genre_ids){
            movie.genre_ids.map( async genre => {
                const fb_genre_res = await db.collection("genres").doc(firebaseUser.uid).get()
                const fb_genre_data = fb_genre_res.data()
                const counter = parseInt(fb_genre_data[genre])

                let total
                if(!counter) total = 1
                else total = counter + 1

                await db.collection("genres").doc(firebaseUser.uid).update({
                    [genre]: total
                })
            })

            console.log("added genre counters...")
        }
    }
}

export default liked_movie