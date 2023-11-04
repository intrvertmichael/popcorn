import { useEffect, useState } from "react"

import { useGetFirebaseUser } from "context/FirebaseContext"

import AuthForm from "components/AuthForm"
import LikedProfileMovies from "components/LikedMovies"
import DislikedProfileMovies from "components/DislikedMovies"
import SavedProfileMovies from "components/SavedMovies"

import styles from "styles/Auth.module.css"

export default function ProfileContainer() {
  const firebaseUser = useGetFirebaseUser()

  const [page, setPage] = useState("saved")
  const [likedMovies, setLikedMovies] = useState()
  const [dislikedMovies, setDisLikedMovies] = useState()
  const [savedMovies, setSavedMovies] = useState()

  async function fetch_movie(id) {
    const movie_res = await fetch("/api/movie", {
      method: "GET",
      headers: { movie_id: id },
    })

    const movie_data = await movie_res.json()
    return movie_data
  }

  useEffect(() => {
    if (firebaseUser) {
      // getting the liked movies
      if (firebaseUser.liked) {
        Promise.all(
          firebaseUser.liked.map(async movie => {
            return await fetch_movie(movie.movie_id)
          }),
        ).then(result => setLikedMovies(result))
      }

      // getting the disliked movies
      if (firebaseUser.disliked) {
        Promise.all(
          firebaseUser.disliked.map(async movie => {
            return await fetch_movie(movie.movie_id)
          }),
        ).then(result => setDisLikedMovies(result))
      }

      // getting the saved movies
      if (firebaseUser.saved) {
        Promise.all(
          firebaseUser.saved.map(async movie => {
            return await fetch_movie(movie.movie_id)
          }),
        ).then(result => setSavedMovies(result))
      }
    }
  }, [firebaseUser])

  if (!firebaseUser) return <AuthForm />

  return (
    <div className={styles.auth}>
      <h1>Profile</h1>

      <div className={styles.labels}>
        {page === "saved" ? (
          <h3>⭐ Saved ({firebaseUser.saved?.length})</h3>
        ) : (
          <a onClick={() => setPage("saved")}>
            <h3>Saved ({firebaseUser.saved?.length})</h3>
          </a>
        )}

        {page === "liked" ? (
          <h3>👍 Liked ({firebaseUser.liked?.length})</h3>
        ) : (
          <a onClick={() => setPage("liked")}>
            <h3>Liked ({firebaseUser.liked?.length})</h3>
          </a>
        )}

        {page === "disliked" ? (
          <h3>👎 Disliked ({firebaseUser.disliked?.length})</h3>
        ) : (
          <a onClick={() => setPage("disliked")}>
            <h3>Disliked ({firebaseUser.disliked?.length})</h3>
          </a>
        )}
      </div>

      {page === "liked" && (
        <LikedProfileMovies likes={true} movies={likedMovies} />
      )}

      {page === "disliked" && (
        <DislikedProfileMovies likes={false} movies={dislikedMovies} />
      )}

      {page === "saved" && (
        <SavedProfileMovies likes={true} movies={savedMovies} />
      )}
    </div>
  )
}
