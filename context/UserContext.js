import { createContext, useCallback, useMemo, useState } from "react"

import { LOCAL_STORAGE_KEYS } from "constants/general"
import { useLocalStorage } from "hooks"

export const UserContext = createContext({})

export default function UserProvider({ children }) {
  const [username, setUsername] = useLocalStorage(LOCAL_STORAGE_KEYS.USERNAME)

  const [likedMovies, setLikedMovies] = useLocalStorage(
    LOCAL_STORAGE_KEYS.LIKED_MOVIES,
  )

  const [dislikedMovies, setDisLikedMovies] = useLocalStorage(
    LOCAL_STORAGE_KEYS.DISLIKED_MOVIES,
  )

  const [savedMovies, setSavedMovies] = useLocalStorage(
    LOCAL_STORAGE_KEYS.SAVED_MOVIES,
  )

  const [aiRecommendations, setAiRecommendations] = useState({})

  const resetData = useCallback(() => {
    setUsername()
    setLikedMovies([])
    setDisLikedMovies([])
    setSavedMovies([])
  }, [setDisLikedMovies, setLikedMovies, setSavedMovies, setUsername])

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
      resetData,
      aiRecommendations,
      setAiRecommendations,
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
      resetData,
      aiRecommendations,
    ],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
