import firebase from '../../../requests/firebase/config'
const db = firebase.firestore()

async function getCurrentFirebaseMovies(firebaseUser){
    console.log("getting firebase movies...")

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // tags
    const fb_tags_res = await db.collection("tags").doc(firebaseUser.uid).get()
    const fb_tags_data = fb_tags_res.data()
    if(!fb_tags_data) db.collection("tags").doc(firebaseUser.uid).set({})

    const current_tags = fb_tags_data? fb_tags_data : []

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // genre
    const fb_genre_res = await db.collection("genres").doc(firebaseUser.uid).get()
    const fb_genre_data = fb_genre_res.data()
    if(!fb_genre_data) db.collection("genres").doc(firebaseUser.uid).set({})

    const current_genre = fb_genre_data? fb_genre_data : {}

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // movies
    const fb_movie_res = await db.collection("movies").doc(firebaseUser.uid).get()
    const fb_movie_data = fb_movie_res.data()
    if(!fb_movie_data) db.collection("movies").doc(firebaseUser.uid).set({liked:[], disliked:[]});

    const current_likes = fb_movie_data && fb_movie_data.liked? fb_movie_data.liked : []
    const current_dislikes = fb_movie_data && fb_movie_data.disliked? fb_movie_data.disliked : []

    return {current_likes, current_dislikes, current_genre, current_tags}
}

export default getCurrentFirebaseMovies