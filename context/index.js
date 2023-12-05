import { useContext } from "react"

import UserProvider, { UserContext } from "context/UserContext"

export const useUserContext = () => useContext(UserContext)

export { UserProvider }
