import { useState, useEffect, useRef } from "react"
import Link from "next/link"

import { useGetFirebaseUser } from "context/FirebaseContext"

import Movie from "components/Movie"

const buttonStyle =
  "absolute pb-1 px-3 text-3xl font-bold bg-black top-1/2 z-20 rounded -translate-y-1/2"

const collectionTitleStyle = "p-6 text-2xl text-neutral-500"

const scrollAmount = 500 // TODO: needs to adapt depending on the screen width

export default function MovieCollection({ view, movieList }) {
  const firebaseUser = useGetFirebaseUser()
  const FBLikedMovies = firebaseUser?.liked
  const FBDisLikedMovies = firebaseUser?.disliked
  const movieBar = useRef(null)

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const movie_array = []
    movieList.movies?.map(movie => {
      const liked = FBLikedMovies?.find(liked => liked.movie_id === movie.id)
      const disliked = FBDisLikedMovies?.find(
        liked => liked.movie_id === movie.id,
      )

      if (!disliked)
        movie_array.push(
          <Movie
            movie={movie}
            key={movie.id}
            fb_liked={liked ? true : null}
            className='snap-start'
          />,
        )
    })

    setMovies(movie_array)
  }, [FBDisLikedMovies, FBLikedMovies, movieList])

  if (!movieList || movieList.movies?.length === 0 || movies?.length === 0) {
    return false
  }

  let moviesWrapperStyle
  let moviesListStyle = "grid grid-cols-4"

  if (view === "bar") {
    moviesWrapperStyle =
      "w-full scroll-smooth overflow-x-scroll snap-x snap-mandatory"
    moviesListStyle =
      "w-[400%] md:w-[334%] xl:w-[286%] grid grid-cols-20 grid-rows-1"
  }

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
        <Link href={`/genre/${movieList.genreID}`} passHref>
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
          <ul className={moviesListStyle}>
            {view === "bar" ? movies.slice(0, 20) : movies}
          </ul>
        </div>
      </div>
    </div>
  )
}
