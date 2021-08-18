import React, {useContext, useEffect, useState} from 'react'

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)
import { useRouter } from 'next/router'

const FirebaseContext = ({children}) => {
    const router = useRouter()

    const [firebaseUser, setFirebaseUser] = useState()
    const [prevPage, setPrevPage] = useState()

    async function getFirebaseData(uid){
        // getting user data
        const fb_user_res = await fetch('/api/firebase/user', {
            method: 'GET',
            headers: {uid}
        })
        const fb_user_data = await fb_user_res.json()

        // getting movies
        const fb_movie_res = await fetch('/api/firebase/movies', {
            method: 'GET',
            headers: {uid}
        })
        const fb_movie_data = await fb_movie_res.json()

        const data = { ...fb_user_data, ...fb_movie_data }
        setFirebaseUser(data)
    }

    useEffect( () => {
        let user_id = localStorage.getItem('user_id')
        if(user_id && !firebaseUser) getFirebaseData(user_id)

        // if current page is diff then previous page
        // update context and set prev page
        if(prevPage !== router.asPath) {
            getFirebaseData(user_id)
            setPrevPage(router.asPath)
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