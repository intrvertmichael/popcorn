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

        // getting movies
        const fb_movie_res = await db.collection("movies").doc(uid).get()
        const fb_movie_data = fb_movie_res.data()

        // getting tags
        const fb_tags_res = await db.collection("tags").doc(uid).get()
        const fb_tags_data = fb_tags_res.data()

        // getting tags
        const fb_genre_res = await db.collection("genres").doc(uid).get()
        const fb_genre_data = fb_genre_res.data()

        const data = {
            uid: uid,
            disliked: fb_movie_data? fb_movie_data.disliked : [],
            liked: fb_movie_data? fb_movie_data.liked : [],
            tags: fb_tags_data? fb_tags_data : [],
            genres: fb_genre_data? fb_genre_data : []
        }

        console.log("context: ", data)

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