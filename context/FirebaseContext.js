import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { getFirebaseData } from "utils/firebase/general"

export const GetFirebaseUserContext = React.createContext()
export const SetFirebaseUserContext = React.createContext()

export const useGetFirebaseUser = () => useContext(GetFirebaseUserContext)
export const useSetFirebaseUser = () => useContext(SetFirebaseUserContext)

const FirebaseContext = ({ children }) => {
  const router = useRouter()

  const [firebaseUser, setFirebaseUser] = useState()
  const [prevPage, setPrevPage] = useState()

  useEffect(() => {
    let user_id = localStorage.getItem("user_id")
    if (user_id && !firebaseUser) getFirebaseData(user_id, setFirebaseUser)
    if (user_id && firebaseUser) {
      // if current page is diff then previous page
      // update context and set prev page
      if (prevPage !== router.asPath) {
        getFirebaseData(user_id, setFirebaseUser)
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

export default FirebaseContext
