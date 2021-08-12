import firebase from 'firebase/app'
import 'firebase/database'

export default async function handler(req, res) {

    const {user_id, movie_id, liked} = req.headers

    const db = firebase.firestore()
    const test = 'eJD52RAYwV5hLD0zz8uL'
    const test2 = 'thisisafakeid'

    if (req.method === 'GET') {
        console.log("inside GET request")

        const querySnapshot = await db.collection("users").doc(test2).get()
        console.log(querySnapshot.data())
        res.status(200).json({...querySnapshot})
    }

    else if (req.method === 'POST') {
        console.log("inside POST request")
        const res = await db.collection("movies").doc(user_id).get()
        const data = res.data()

        console.log(data) // if no data a document should be created before adding the data

        if(liked) {
            console.log(liked)

            if(!data){
                // create document and set first movie
                const post_movie = await db.collection("movies").doc(user_id).set({
                    liked: [{ movie_id: movie_id }]
                })

                return res.status(200).json({post_movie})
            }

            // check if data includes liked movie
            const exists_in_liked = data.liked.filter( liked => liked.movie_id === movie_id).length > 0
            const exists_in_disliked = data.disliked.filter( disliked => disliked.movie_id === movie_id).length > 0

            if(!exists_in_liked){
                console.log("posted because movie doesnt exists")

                if(exists_in_disliked){
                    // if it exists in disliked then remove it
                    // before adding it to the liked list
                    console.log("this movie exists in dislikes so it will be removed")
                    const filtered = data.disliked.filter( disliked => disliked.movie_id !== movie_id)
                    console.log("filtered", filtered)
                    await db.collection("movies").doc(user_id).update({
                        disliked: filtered
                    })
                }

                // if it DOES NOT then add to liked movies then post
                await db.collection("movies").doc(user_id).update({
                    liked: [...data.liked, { movie_id: movie_id }]
                })
            } else {
                // if it DOES then don't add to liked movies
                console.log("didnt post because movie exists")
            }

            res.status(200).json({post_movie})

        }
    }

    else if (req.method === 'PUT') {
        console.log("inside PUT request")

        const data = await db.collection("users").doc(test2).update({another_name: "Yafi"})
        res.status(200).json({data})
    }

    else if (req.method === 'DELETE') {
        console.log("inside DELETE request")

        const data = await db.collection("users").doc(test2).delete()
        res.status(200).json({data})
    }
}