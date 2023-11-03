import { useGetFirebaseUser, useSetFirebaseUser } from "context/FirebaseContext"
import styles from "styles/VoteButtons.module.css"

import liked_movie from "utils/firebase/liked"
import disliked_movie from "utils/firebase/disliked"
import saved_movie from "utils/firebase/saved"

const VoteButtons = ({ movie }) => {
  const firebaseUser = useGetFirebaseUser()
  const setFirebaseUser = useSetFirebaseUser()

  const currently_liked = firebaseUser.liked?.find(m => m.movie_id === movie.id)
  const currently_disliked = firebaseUser.disliked?.find(
    m => m.movie_id === movie.id,
  )
  const currently_saved = firebaseUser.saved?.find(m => m.movie_id === movie.id)

  const liked_style = currently_liked ? { borderColor: "white" } : {}
  const disliked_style = currently_disliked ? { borderColor: "white" } : {}
  const saved_style = currently_saved ? { borderColor: "white" } : {}

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Like and Un_Like

  async function likeMovie() {
    await liked_movie(movie, firebaseUser, false)

    setFirebaseUser(current => {
      const likes = [...current.liked, { movie_id: movie.id }]
      const dislikes = current.disliked.filter(
        disliked => disliked.movie_id !== movie.id,
      )
      const saves = current.saved.filter(saved => saved.movie_id !== movie.id)

      const updatedLikes = {
        ...current,
        liked: likes,
        disliked: dislikes,
        saved: saves,
      }
      return updatedLikes
    })
  }

  async function un_likeMovie() {
    await liked_movie(movie, firebaseUser, true)

    setFirebaseUser(current => {
      const filtered = current.liked.filter(
        liked => liked.movie_id !== movie.id,
      )

      const tagsObj = current.tags?.liked
      const tagsArr = tagsObj ? Object.entries(tagsObj) : []
      tagsArr.forEach(tag => {
        const exists = tag[1] && tag[1].find(id => id === movie.id)
        if (exists) {
          const filtered = tag[1].filter(id => id !== movie.id)
          tagsObj[tag[0]] = filtered
        }
      })
      const updatedLikes = { ...current, liked: filtered, tags: tagsObj }
      return updatedLikes
    })
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Dislike and Un_Dislike

  async function dislikeMovie() {
    await disliked_movie(movie, firebaseUser, false)

    setFirebaseUser(current => {
      const likes = current.liked.filter(liked => liked.movie_id !== movie.id)
      const dislikes = [...current.disliked, { movie_id: movie.id }]
      const saves = current.saved.filter(saved => saved.movie_id !== movie.id)

      const updatedDisikes = {
        ...current,
        liked: likes,
        disliked: dislikes,
        saved: saves,
      }
      return updatedDisikes
    })
  }

  async function un_dislikeMovie() {
    await disliked_movie(movie, firebaseUser, true)

    setFirebaseUser(current => {
      const filtered = current.disliked.filter(
        disliked => disliked.movie_id !== movie.id,
      )
      const updatedDisikes = { ...current, disliked: filtered }
      return updatedDisikes
    })
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Save and Un_Save
  async function saveMovie() {
    await saved_movie(movie, firebaseUser, false)

    setFirebaseUser(current => {
      const likes = current.liked.filter(liked => liked.movie_id !== movie.id)
      const dislikes = current.disliked.filter(
        disliked => disliked.movie_id !== movie.id,
      )
      const saves = current.saved
        ? [...current.saved, { movie_id: movie.id }]
        : [{ movie_id: movie.id }]

      const updatedDisikes = {
        ...current,
        disliked: dislikes,
        liked: likes,
        saved: saves,
      }
      return updatedDisikes
    })
  }

  async function un_saveMovie() {
    await saved_movie(movie, firebaseUser, true)

    setFirebaseUser(current => {
      const saves = current.saved.filter(saved => saved.movie_id !== movie.id)
      const updatedDisikes = { ...current, saved: saves }
      return updatedDisikes
    })
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Button Handlers

  async function handleLikedButton() {
    if (currently_disliked) await un_dislikeMovie()
    if (currently_saved) await un_saveMovie()
    if (currently_liked) await un_likeMovie()
    else await likeMovie()
  }

  async function handleDisikedButton() {
    if (currently_liked) await un_likeMovie()
    if (currently_saved) await un_saveMovie()
    if (currently_disliked) await un_dislikeMovie()
    else dislikeMovie()
  }

  async function handleSaveButton() {
    if (currently_liked) await un_likeMovie()
    if (currently_disliked) await un_dislikeMovie()
    if (currently_saved) await un_saveMovie()
    else saveMovie()
  }

  return (
    <>
      <button
        onClick={handleLikedButton}
        className={styles.voting_buttons}
        style={liked_style}
      >
        👍
      </button>

      <button
        onClick={handleSaveButton}
        className={styles.voting_buttons}
        style={saved_style}
      >
        {currently_saved ? "★" : "☆"}
      </button>

      <button
        onClick={handleDisikedButton}
        className={styles.voting_buttons}
        style={disliked_style}
      >
        👎
      </button>
    </>
  )
}

export default VoteButtons
