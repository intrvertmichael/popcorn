import { createContext, useMemo, useState } from "react"

export const UserContext = createContext({})

export default function UserProvider({ children }) {
  const [username, setUsername] = useState("")
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDisLikedMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])

  const value = useMemo(
    () => ({
      username,
      setUsername,
      likedMovies,
      setLikedMovies,
      dislikedMovies,
      setDisLikedMovies,
      savedMovies,
      setSavedMovies,
    }),
    [
      username,
      setUsername,
      likedMovies,
      setLikedMovies,
      dislikedMovies,
      setDisLikedMovies,
      savedMovies,
      setSavedMovies,
    ],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
