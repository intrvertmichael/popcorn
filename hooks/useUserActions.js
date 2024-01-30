import { useUserContext } from "context"

import { findMovieFromList } from "utils/general"

export default function useUserActions(movie) {
  const {
    savedMovies,
    likedMovies,
    dislikedMovies,
    setSavedMovies,
    setLikedMovies,
    setDisLikedMovies,
  } = useUserContext()

  const addToList = curr => (curr ? [...curr, movie] : [movie])
  const removeFromList = curr => curr.filter(c => c.id !== movie.id)

  const isSaved = findMovieFromList(movie, savedMovies)
  const isLiked = findMovieFromList(movie, likedMovies)
  const isDisliked = findMovieFromList(movie, dislikedMovies)

  const addToSaved = () => setSavedMovies(addToList)
  const removeFromSaved = () => setSavedMovies(removeFromList)

  const addToLiked = () => setLikedMovies(addToList)
  const removeFromLiked = () => setLikedMovies(removeFromList)

  const addToDisliked = () => setDisLikedMovies(addToList)
  const removeFromDisliked = () => setDisLikedMovies(removeFromList)

  return {
    isSaved,
    isLiked,
    isDisliked,
    addToSaved,
    removeFromSaved,
    addToLiked,
    removeFromLiked,
    addToDisliked,
    removeFromDisliked,
  }
}
