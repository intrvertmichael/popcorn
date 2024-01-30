import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { useUserContext } from "context"
import { CONFIRM_MESSAGES, PAGES } from "constants/general"

import ProfileMovie from "components/ProfileMovie"
import TagFilter from "components/TagFilter"

export default function ProfileMovieList({ movies, currentPage }) {
  const { setSavedMovies, setLikedMovies, setDisLikedMovies } = useUserContext()

  const [filter, setFilter] = useState("")
  const [filteredMovies, setFilteredMovies] = useState()

  const saved = currentPage === PAGES.SAVED
  const liked = currentPage === PAGES.LIKED
  const disliked = currentPage === PAGES.DISLIKED

  const handleRemoveMoviesList = () => {
    if (confirm(CONFIRM_MESSAGES.REMOVE_MOVIE_LIST)) {
      if (saved) setSavedMovies([])
      if (liked) setLikedMovies([])
      if (disliked) setDisLikedMovies([])
    }
  }

  useEffect(() => {
    if (disliked || isEmpty(filter)) return setFilteredMovies(movies)

    const filtered = movies.filter(movie =>
      movie.tags?.find(tag => tag === filter),
    )

    setFilteredMovies(filtered)
  }, [filter, movies, disliked])

  useEffect(() => {
    setFilter("")
  }, [currentPage])

  if (isEmpty(movies)) {
    return (
      <p className='py-3 text-center border rounded border-neutral-800'>
        Currently there are no movies in this list
      </p>
    )
  }

  return (
    <>
      {(saved || liked) && (
        <TagFilter filter={filter} setFilter={setFilter} movies={movies} />
      )}

      <ul className='grid gap-3'>
        {filteredMovies?.map(movie => {
          return (
            <ProfileMovie
              key={movie.id}
              movie={movie}
              movies={filteredMovies}
              saved={saved}
              liked={liked}
              disliked={disliked}
            />
          )
        })}

        <button
          className='py-6 text-sm text-red-500 border rounded hover:border-red-500 border-neutral-900 bg-neutral-950'
          onClick={handleRemoveMoviesList}
        >
          Remove all {currentPage} movies
        </button>
      </ul>
    </>
  )
}
