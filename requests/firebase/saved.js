import firebase from './config'
const db = firebase.firestore()

import {remove_multiple_tags} from './tags'

async function saved_movie(movie, firebaseUser, currently_saved) {

    async function save_movie(){
        const updated_dislikes = firebaseUser.disliked?.filter( m => m.movie_id !== movie.id )
        const updated_likes = firebaseUser.liked?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: updated_likes,
            disliked: updated_dislikes,
            saved: firebaseUser.saved? [...firebaseUser.saved,{movie_id: movie.id}] : [{movie_id: movie.id}]
        })
    }
    async function un_save_movie(){
        const updated_dislikes = firebaseUser.disliked?.filter( m => m.movie_id !== movie.id )
        const updated_likes = firebaseUser.liked?.filter( m => m.movie_id !== movie.id )
        const updated_saves = firebaseUser.saved?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: updated_likes,
            disliked: updated_dislikes,
            saved: updated_saves
        })

        await remove_multiple_tags(movie.id, firebaseUser, true)
    }

    if(currently_saved) un_save_movie()
    else save_movie()
}

export default saved_movie