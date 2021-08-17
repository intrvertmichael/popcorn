import React, {useContext, useEffect, useState} from 'react'

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)

const FirebaseContext = ({children}) => {

    const [firebaseUser, setFirebaseUser] = useState()


    useEffect( () => {

        async function getFirebaseUser(uid){
            const res = await fetch('/api/firebase/user', {
                method: 'GET',
                headers: {uid}
            })
            const data = await res.json()
            setFirebaseUser(data)
        }

        let user_id = localStorage.getItem('user_id')
        if(user_id && !firebaseUser) getFirebaseUser(user_id)

    }, [firebaseUser])

    return (
        <GetFirebaseUserContext.Provider value={firebaseUser}>
        <SetFirebaseUserContext.Provider value={setFirebaseUser}>
            {children}
        </SetFirebaseUserContext.Provider>
        </GetFirebaseUserContext.Provider>
    )
}

export default FirebaseContext;