import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { isEmpty } from "lodash"

import { useUserContext } from "context"
import { findMovieFromList } from "utils/general"

import Movie from "components/Movie"

const buttonStyle =
  "absolute pb-1 px-3 text-3xl font-bold bg-black top-1/2 z-20 rounded -translate-y-1/2"

const collectionTitleStyle =
  "p-6 text-2xl text-neutral-500 w-fit hover:text-white"

export default function MovieCollection({ view, movieList }) {
  const movieBar = useRef(null)
  const { likedMovies, dislikedMovies } = useUserContext()

  const [scrollAmount, setScrollAmount] = useState()

  useEffect(() => {
    window.addEventListener("resize", e => {
      setScrollAmount(e.currentTarget.innerWidth)
    })

    if (typeof window !== "undefined") {
      setScrollAmount(window.innerWidth)
    }
  }, [])

  if (isEmpty(movieList) || isEmpty(movieList.movies)) return <></>

  const movies = movieList?.movies
    ?.filter(movie => !findMovieFromList(movie, dislikedMovies))
    ?.map(
      movie =>
        movie?.id && (
          <Movie
            movie={movie}
            key={movie.id}
            fb_liked={likedMovies?.find(liked => liked.id === movie.id)}
            className='snap-start'
          />
        ),
    )

  const moviesWrapperStyle =
    view === "bar"
      ? "w-full scroll-smooth overflow-x-scroll snap-x snap-mandatory"
      : ""

  const handleRMovement = e => {
    e.preventDefault()
    movieBar.current.scrollLeft += scrollAmount
  }

  const handleLMovement = e => {
    e.preventDefault()
    movieBar.current.scrollLeft -= scrollAmount
  }

  return (
    <div className=''>
      {movieList.genreID ? (
        <Link
          href={`/genre/${movieList.genreID}`}
          passHref
          className='block w-fit'
        >
          <h3 className={collectionTitleStyle}>{movieList.title}</h3>
        </Link>
      ) : (
        <h3 className={collectionTitleStyle}> {movieList.title} </h3>
      )}

      <div className='relative'>
        {view === "bar" && (
          <>
            <button
              onClick={handleLMovement}
              className={`${buttonStyle} left-3`}
            >
              {"<"}
            </button>

            <button
              onClick={handleRMovement}
              className={`${buttonStyle} right-3`}
            >
              {">"}
            </button>
          </>
        )}

        <div className={moviesWrapperStyle} ref={movieBar}>
          <ul
            className={
              view === "bar"
                ? `w-[680%] sm:w-[500%] md:w-[400%] lg:w-[340%] xl:w-[200%] grid grid-cols-20 grid-rows-1`
                : "grid grid-cols-4"
            }
          >
            {view === "bar" ? movies.slice(0, 20) : movies}
          </ul>
        </div>
      </div>
    </div>
  )
}
