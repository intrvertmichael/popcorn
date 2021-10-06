import firebase from '../../../requests/firebase/config'
const db = firebase.firestore()

async function removeLiked(movie, firebaseUser){
    const genre_ids = movie.genres.map( g => g.id)

    const updated_likes = firebaseUser.liked.filter( m => m.movie_id !== movie.id )
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

    const entries = Object.entries(firebaseUser.tags)

    entries.forEach( async tag => {
        const name = tag[0]
        const taggedIds = tag[1]
        const hasLength = taggedIds.length
        const exists = hasLength? taggedIds.find( tag => tag === movie.id) : taggedIds === movie.id

        if(exists && hasLength > 1) {
            const filtered = taggedIds.filter( id => id !== movie.id )
            await db.collection("tags").doc(firebaseUser.uid).update({
                [name]: filtered
            })

            console.log("removed id from tag list...")
        }
        else if(exists) {
            await db.collection("tags").doc(firebaseUser.uid).update({
                [name]: firebase.firestore.FieldValue.delete()
            })

            console.log("deleted tag from fb...")
        }
    })


}

export default removeLiked
