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
        const fb_res = await db.collection("users").doc(uid).get()
        const fb_data = fb_res.data()
        const fb_user_data = fb_data

        // getting movies
        console.log("testing firebase in the backend")
        const backend_firebase = await fetch('/api/firebase/movies', {
            method: 'GET',
            headers: {uid}
        })
        console.log("backend_firebase", backend_firebase)
        console.log("finished testing firebase in the backend")

        const fb_movie_res = await db.collection("movies").doc(uid).get()
        const fb_movie_data = fb_movie_res.data()


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