import Link from "next/link"
import Image from "next/image"

import { useGetFirebaseUser, useSetFirebaseUser } from "context/FirebaseContext"
import { createMovieImageURL } from "utils/movie.api"
import disliked_movie from "utils/firebase/disliked"

import styles from "styles/ProfileMovieGrid.module.css"

export default function DislikedMovie({ movie }) {
  const firebaseUser = useGetFirebaseUser()
  const setFirebaseUser = useSetFirebaseUser()

  const poster = createMovieImageURL(movie.poster_path)

  function removeFromDislikes() {
    const message = `Are you sure you want to remove ${movie.original_title} from Dislikes?`
    if (confirm(message)) {
      setFirebaseUser(current => {
        const filtered = current.disliked.filter(
          disliked => disliked.movie_id !== movie.id,
        )
        const updatedLikes = { ...current, disliked: filtered }
        return updatedLikes
      })

      disliked_movie(movie, firebaseUser, true)
    }
  }

  return (
    <li key={movie.id}>
      <Link href={"/movie/" + movie.id} passHref>
        <Image
          src={poster}
          alt={movie.original_title}
          width='144'
          height='216'
        />
      </Link>

      <div className={styles.movie_caption}>
        <button className={styles.remove} onClick={removeFromDislikes}>
          X
        </button>

        <Link href={"/movie/" + movie.id} passHref>
          <h4>{movie.original_title}</h4>
        </Link>

        <p> {movie.tagline} </p>
      </div>
    </li>
  )
}
