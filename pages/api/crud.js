import firebase from 'firebase/app'
import 'firebase/database'

export default async function handler(req, res) {
    console.log("entered backend")

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

        // read or update
        const data = await db.collection("users").doc(test2).set({
            name: "New York",
            state: "NY",
            country: "USA"
        })

        res.status(200).json({data})
    }

    else if (req.method === 'PUT') {
        console.log("inside PUT request")

        const data = await db.collection("users").doc(test2).update({name: "New Yoak"})
        res.status(200).json({data})
    }

    else if (req.method === 'DELETE') {
        console.log("inside DELETE request")

        const data = await db.collection("users").doc(test2).delete()
        res.status(200).json({data})
    }
}