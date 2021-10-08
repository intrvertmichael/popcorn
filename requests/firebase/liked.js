import firebase from './config'
const db = firebase.firestore()

import {remove_multiple_tags} from './tags'
import {remove_genre_counters, add_genre_counters} from './genre'

async function liked_movie(movie, firebaseUser, currently_liked) {

    async function un_likeMovie(){
        const updated_likes = firebaseUser.liked?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: updated_likes
        })


        let genres
        if(movie.genre_ids) genres = movie.genre_ids
        else genres = movie.genres.map( genre => genre.id)

        await remove_genre_counters( genres, firebaseUser)
        await remove_multiple_tags(movie.id, firebaseUser)
    }

    async function likeMovie(){
        const updated_dislikes = firebaseUser.disliked?.filter( m => m.movie_id !== movie.id )
        await db.collection("movies").doc(firebaseUser.uid).update({
            liked: [ ...firebaseUser.liked, {movie_id: movie.id} ],
            disliked: updated_dislikes
        })

        let genres
        if(movie.genre_ids) genres = movie.genre_ids
        else genres = movie.genres.map( genre => genre.id)

        await add_genre_counters( genres , firebaseUser)
    }

    if(currently_liked) un_likeMovie()
    else likeMovie()
}

export default liked_movie