import React, {useContext, useEffect, useState} from 'react'

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)

const FirebaseContext = ({children}) => {

    const [firebaseUser, setFirebaseUser] = useState()

    let stored_user
    if (typeof window !== "undefined" && localStorage.getItem('user')){
        const ls_user = localStorage.getItem('user')
        stored_user = JSON.parse(ls_user)
    }

    useEffect( () => {
        if(stored_user && !firebaseUser) setFirebaseUser(stored_user)
    }, [firebaseUser, stored_user])

    return (
        <GetFirebaseUserContext.Provider value={firebaseUser}>
        <SetFirebaseUserContext.Provider value={setFirebaseUser}>
            {children}
        </SetFirebaseUserContext.Provider>
        </GetFirebaseUserContext.Provider>
    )
}

export default FirebaseContext;