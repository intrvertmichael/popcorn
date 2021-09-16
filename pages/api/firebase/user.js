import firebase from 'firebase/app'
import 'firebase/database'

const db = firebase.firestore()

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
    const { uid } = req.headers
    const fb_res = await db.collection("users").doc(uid).get()
    console.log("fb_res", fb_res)
    const fb_data = fb_res.data()

    return res.status(200).json(fb_data)
}

async function putHandler(req, res) {}
async function deleteHandler(req, res) {}

async function postHandler(req, res) {
    const { uid, displayname, email } = req.headers

    const fb_res = await db.collection("users").doc(uid).get()
    const fb_data = fb_res.data()

    if(fb_data) console.log("user already exists in db")
    else await db.collection("users").doc(uid).set({uid, displayname, email})

    return res.status(200).end()
}


