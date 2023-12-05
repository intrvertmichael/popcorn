import Link from "next/link"
import Image from "next/image"

import { createMovieImageURL } from "utils/movie.api"
import { useUserActions } from "hooks"
import { PAGES } from "constants/general"

import ProfileMovieTags from "components/ProfileMovieTags"

export default function ProfileMovie({ movie, saved, liked, disliked }) {
  const { removeFromSaved, removeFromLiked, removeFromDisliked } =
    useUserActions(movie)

  const removeClicked = () => {
    let list = PAGES.SAVED
    if (liked) list = PAGES.LIKED
    if (disliked) list = PAGES.DISLIKED

    const baseMessage = `Are you sure you want to remove ${movie.original_title} from ${list}?`

    if (confirm(baseMessage)) {
      if (liked) return removeFromLiked(movie)
      if (disliked) return removeFromDisliked(movie)
      removeFromSaved(movie)
    }
  }

  return (
    <li
      key={movie.id}
      className='relative flex border rounded border-neutral-900 bg-neutral-950'
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
        onClick={removeClicked}
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
