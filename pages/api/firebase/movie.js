import firebase from 'firebase/app'
import 'firebase/database'

const db = firebase.firestore()
const test = 'eJD52RAYwV5hLD0zz8uL'
const test2 = 'thisisafakeid'

export default async function handler(req, res) {
    const routes = {
        POST: postHandler,
        PUT: putHandler,
        DELETE: deleteHandler,
        GET: getHandler,
    }

    return routes[req.method](req, res)
}

async function getHandler(req, res) {
    console.log("getting movies")
    const { uid } = req.headers
    const fb_res = await db.collection("movies").doc(uid).get()
    const fb_data = fb_res.data()

    if(fb_data) return res.status(200).json(fb_data)
    return res.status(200).json({})
}

async function deleteHandler(req, res) {
    console.log("inside DELETE request")

    const { user_id, movie_id } = req.headers
    const fb_data = await db.collection("users").doc(user_id).delete()
    res.status(200).json({ fb_data })
}

async function putHandler(req, res) {
    console.log('inside the put rquest');

    const fb_data = await db.collection("users").doc(test2).update({ another_name: "Yafi" })
    res.status(200).json({ fb_data }).end()
}

// POST - - - - - - - - -

async function postHandler(req, res) {
    const { liked } = req.headers

    if (liked) return handleLiked(req, res)
    if (!liked) return handleDisliked(req, res)
}

async function handleLiked(req, res){
    console.log("handling liked movie")

    const { user_id, movie_id } = req.headers

    const fb_res = await db.collection("movies").doc(user_id).get()
    const fb_data = fb_res.data()

    if (!fb_data) {
        // create document and set first movie
        await db.collection("movies").doc(user_id).set({
            liked: [{ movie_id }],
            disliked: []
        })

        return res.status(200).end()
    }

    // check if movie is in liked/disliked list
    const exists_in_liked = fb_data.liked ? fb_data.liked.find(liked => liked.movie_id === movie_id) : null
    const exists_in_disliked = fb_data.disliked ? fb_data.disliked.find(disliked => disliked.movie_id === movie_id) : null

    if (exists_in_liked) {
        // movie is exists in liked so it will remove it from the list
        const filtered = fb_data.liked.filter(liked => liked.movie_id !== movie_id)
        await db.collection("movies").doc(user_id).update({
            liked: filtered
        })

        return res.status(200).end()
    }

    if (exists_in_disliked) {
        // if movie exists in disliked remove it
        const filtered = fb_data.disliked.filter(disliked => disliked.movie_id !== movie_id)
        await db.collection("movies").doc(user_id).update({
            disliked: filtered
        })
    }

    await db.collection("movies").doc(user_id).update({
        liked: [...fb_data.liked, { movie_id: movie_id }]
    })

    return res.status(200).end()
}

async function handleDisliked(req, res){
    console.log("handling disliked movie")

    const { user_id, movie_id } = req.headers

    const fb_res = await db.collection("movies").doc(user_id).get()
    const fb_data = fb_res.data()

    if (!fb_data) {
        // create document and set first movie
        await db.collection("movies").doc(user_id).set({
            liked: [],
            disliked: [{ movie_id }]
        })

        return res.status(200).end()
    }

    // check if movie is in liked/disliked list
    const exists_in_liked = fb_data.liked ? fb_data.liked.find(liked => liked.movie_id === movie_id) : null
    const exists_in_disliked = fb_data.disliked ? fb_data.disliked.find(disliked => disliked.movie_id === movie_id) : null

    if (exists_in_disliked) {
        // movie is exists in disliked so it will remove it from the list
        const filtered = fb_data.disliked.filter(disliked => disliked.movie_id !== movie_id)
        await db.collection("movies").doc(user_id).update({
            disliked: filtered
        })

        return res.status(200).end()
    }

    if (exists_in_liked) {
        // if movie exists in liked remove it
        const filtered = fb_data.liked.filter(liked => liked.movie_id !== movie_id)
        await db.collection("movies").doc(user_id).update({
            liked: filtered
        })
    }

    await db.collection("movies").doc(user_id).update({
        disliked: [...fb_data.disliked, { movie_id: movie_id }]
    })

    return res.status(200).end()
}