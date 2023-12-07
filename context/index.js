import { useContext } from "react"

import UserProvider, { UserContext } from "./UserContext"

export const useUserContext = () => useContext(UserContext)

export { UserProvider }
