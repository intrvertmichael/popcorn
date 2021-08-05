import React, {useContext, useEffect, useState} from 'react'

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)

const FirebaseContext = ({children}) => {

    const [firebaseUser, setFirebaseUser] = useState()

    useEffect( () => {
        let stored_user = localStorage.getItem('user')

        if(stored_user && !firebaseUser) {
            stored_user = JSON.parse(stored_user)
            setFirebaseUser(stored_user)
        }

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