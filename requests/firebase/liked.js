import firebase from './config'
const db = firebase.firestore()

async function liked_movie(movie, uid, liked, disliked, tags, currently_liked) {

    if(currently_liked) {
        // remove movie from liked list
        const updated_likes = liked?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(uid).update({
            liked: updated_likes
        })


        // removing the counter for each movie genre
        const fb_genre_res = await db.collection("genres").doc(uid).get()
        const fb_genre_data = fb_genre_res.data()

        if(movie.genre_ids){
            movie.genre_ids?.map( async genre => {
                const counter = parseInt(fb_genre_data[genre])

                await db.collection("genres").doc(uid).update({
                    [genre]: counter > 1? counter - 1 : firebase.firestore.FieldValue.delete()
                })
            })
        }
        else if(movie.genres){
            movie.genres?.map( async genre => {
                const counter = parseInt(fb_genre_data[genre.id])

                await db.collection("genres").doc(uid).update({
                    [genre.id]: counter > 1? counter - 1 : firebase.firestore.FieldValue.delete()
                })
            })
        }


        // removing tags
        const tagArray = Object.entries(tags)

        tagArray.forEach( async tag => {
            const exists = tag[1].find( id => id === movie.id)

            if(exists){
                const filtered = tag[1].filter( id => id !== movie.id)

                await db.collection("tags").doc(uid).update({
                    [tag[0]]: filtered.length > 0 ? filtered : firebase.firestore.FieldValue.delete()
                })
            }
        })
    }

    else {
        // add to "liked" and remove from "disliked"
        const updated_dislikes = disliked?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(uid).update({
            liked: [ ...liked, {movie_id: movie.id} ],
            disliked: updated_dislikes
        })

        // add counter to each movie genre
        movie.genre_ids?.map( async genre => {
            const fb_genre_res = await db.collection("genres").doc(uid).get()
            const fb_genre_data = fb_genre_res.data()
            const counter = parseInt(fb_genre_data[genre])

            let total
            if(!counter) total = 1
            else total = counter + 1

            await db.collection("genres").doc(uid).update({
                [genre]: total
            })
        })
    }
}

export default liked_movie