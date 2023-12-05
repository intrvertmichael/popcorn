import { useUserContext } from "context"

export default function useUserActions(movie) {
  const {
    savedMovies,
    likedMovies,
    dislikedMovies,
    setSavedMovies,
    setLikedMovies,
    setDisLikedMovies,
  } = useUserContext()

  const isSaved = savedMovies.find(saved => saved.id === movie.id)
  const isLiked = likedMovies.find(liked => liked.id === movie.id)
  const isDisliked = dislikedMovies.find(disliked => disliked.id === movie.id)

  const addToSaved = () => setSavedMovies(curr => [...curr, movie])
  const removeFromSaved = () => {
    setSavedMovies(curr => curr.filter(c => c.id !== movie.id))
  }

  const addToLiked = () => setLikedMovies(curr => [...curr, movie])
  const removeFromLiked = () => {
    setLikedMovies(curr => curr.filter(c => c.id !== movie.id))
  }

  const addToDisliked = () => setDisLikedMovies(curr => [...curr, movie])
  const removeFromDisliked = () => {
    setDisLikedMovies(curr => curr.filter(c => c.id !== movie.id))
  }

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
