/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react"
import Link from "next/link"

import { createMovieImageURL } from "utils/movie.api"
import { formatRating } from "utils/general"

import VoteButtons from "components/VoteButtons"

export default function Movie({ movie, fb_liked, className }) {
  const [liked, setLiked] = useState(null)

  // default movie view
  useEffect(() => {
    if (fb_liked) setLiked(true)
    else setLiked(null)
  }, [fb_liked])

  const titleLimit = 20
  const title =
    movie?.original_title?.length > titleLimit
      ? movie.original_title.substring(0, titleLimit) + "..."
      : movie.original_title

  if (!movie || !movie.poster_path) return <></>

  return (
    <div
      className={`relative w-full group aspect-[1/1.5] ${
        liked ? "border-4 border-green-500 " : ""
      }${className}`}
    >
      <Link href={"/movie/" + movie.id} passHref={true}>
        <li className='relative h-full' key={movie.id}>
          <img
            src={createMovieImageURL(movie.poster_path)}
            alt={movie.original_title}
            fill={true}
          />

          <div className='relative z-10 flex flex-col items-center justify-center w-full h-full p-3 text-center transition-opacity duration-500 opacity-0 bg-black/90 group-hover:opacity-100'>
            <h3 className='text-2xl'>{title}</h3>
            <p>★ {formatRating(movie.vote_average)}</p>
          </div>
        </li>
      </Link>

      <div className='absolute z-10 flex justify-between w-full px-3 opacity-0 bottom-4 group-hover:opacity-100'>
        <VoteButtons movie={movie} />
      </div>
    </div>
  )
}
