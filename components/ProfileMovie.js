import Link from "next/link"
import Image from "next/image"

import { useGetFirebaseUser, useSetFirebaseUser } from "context/FirebaseContext"
import { createMovieImageURL } from "utils/movie.api"
import { saved_movie } from "utils/firebase/saved"
import { liked_movie } from "utils/firebase/liked"
import { disliked_movie } from "utils/firebase/disliked"
import {
  updateSavedMovies,
  updateLikedMovies,
  updateDislikedMovies,
} from "utils/firebase/general"

import ProfileMovieTags from "components/ProfileMovieTags"

export default function SavedMovie({ movie, saved, liked, disliked }) {
  const firebaseUser = useGetFirebaseUser()
  const setFirebaseUser = useSetFirebaseUser()

  async function removingLikedMovie() {
    // TODO: simplify this logic - should just condition the part that changes.
    let message = `Are you sure you want to remove ${movie.original_title} from Saved?`

    if (liked) {
      message = `Are you sure you want to remove ${movie.original_title} from Likes?`
    }

    if (disliked) {
      message = `Are you sure you want to remove ${movie.original_title} from Dislikes?`
    }

    if (confirm(message)) {
      if (liked) {
        await liked_movie(movie, firebaseUser, true)
        setFirebaseUser(currentlyLiked =>
          updateLikedMovies(currentlyLiked, movie),
        )
        return
      }

      if (disliked) {
        disliked_movie(movie, firebaseUser, true)
        setFirebaseUser(current => updateDislikedMovies(current, movie))
        return
      }

      await saved_movie(movie, firebaseUser, true)
      setFirebaseUser(currentlySaved =>
        updateSavedMovies(currentlySaved, movie),
      )
    }
  }

  return (
    <li
      key={movie.id}
      className='relative flex border border-neutral-900 rounded bg-neutral-950'
    >
      <Link
        href={"/movie/" + movie.id}
        passHref
        className='relative aspect-[1/1.5] w-40'
      >
        <Image
          src={createMovieImageURL(movie.poster_path)}
          alt={movie.original_title}
          fill={true}
        />
      </Link>

      <button
        className='absolute font-bold top-2 right-3 hover:text-red-500'
        onClick={removingLikedMovie}
      >
        X
      </button>

      <div className='p-6'>
        <Link href={"/movie/" + movie.id} passHref>
          <h4 className='pb-3 text-neutral-500'>{movie.original_title}</h4>
        </Link>

        {disliked && <p> {movie.tagline} </p>}

        {(liked || saved) && (
          <ProfileMovieTags movie={movie} liked={liked} saved={saved} />
        )}
      </div>
    </li>
  )
}
