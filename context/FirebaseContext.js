import React, {useContext, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import firebase from '../requests/firebase/config'
import 'firebase/database'

const db = firebase.firestore()

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)


const FirebaseContext = ({children}) => {
    const router = useRouter()

    const [firebaseUser, setFirebaseUser] = useState()
    const [prevPage, setPrevPage] = useState()

    async function getFirebaseData(uid){
        // getting user data

        // const fb_user_res = await fetch('/api/firebase/user', {
        //     method: 'GET',
        //     headers: {uid}
        // })

        console.log("starting test . . .")
        const fb_res = await db.collection("users").doc(uid).get()
        console.log("successfully got firebase user data")
        console.log("returning data to next front end")
        const fb_data = fb_res.data()

        console.log("fb_data", fb_data)
        console.log("this is the last place the bug goes to.")

        console.log("ending test . . .")


        // const fb_user_data = await fb_user_res.json()
        const fb_user_data = fb_data

        console.log("fb_user_data", fb_user_data)

        console.log("sucessfully got user data")

        console.log("getting movie data now ...")
        // getting movies
        // const fb_movie_res = await fetch('/api/firebase/movies', {
            //     method: 'GET',
            //     headers: {uid}
            // })
            // console.log("fb_movie_res", fb_movie_res)

            console.log("testing firebase in the backend")
            const backend_firebase = await fetch('/api/firebase/movies', {
                method: 'GET',
                headers: {uid}
            })
            console.log("backend_firebase", backend_firebase)
            console.log("finished testing firebase in the backend")

            const fb_movie_res = await db.collection("movies").doc(uid).get()
            const fb_movie_data = fb_movie_res.data()

            console.log("fb_movie_res", fb_movie_res)
            console.log("fb_movie_data", fb_movie_data)

            console.log("got the movie data ...")

            // const fb_movie_data = await fb_movie_res.json()

        const data = { ...fb_user_data, ...fb_movie_data }
        setFirebaseUser(data)
    }

    useEffect( () => {
        let user_id = localStorage.getItem('user_id')

        if(user_id && !firebaseUser) getFirebaseData(user_id)

        if(user_id && firebaseUser) {
            // if current page is diff then previous page
            // update context and set prev page
            if(prevPage !== router.asPath) {
                getFirebaseData(user_id)
                setPrevPage(router.asPath)
            }
        }

    }, [firebaseUser, prevPage, router])

    return (
        <GetFirebaseUserContext.Provider value={firebaseUser}>
        <SetFirebaseUserContext.Provider value={setFirebaseUser}>
            {children}
        </SetFirebaseUserContext.Provider>
        </GetFirebaseUserContext.Provider>
    )
}



export default FirebaseContext;