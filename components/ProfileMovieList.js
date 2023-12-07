import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { useUserContext } from "context"
import { CONFIRM_MESSAGES, PAGES } from "constants/general"

import ProfileMovie from "components/ProfileMovie"
import TagFilter from "components/TagFilter"

export default function ProfileMovieList({ movies, currentPage }) {
  const { setSavedMovies, setLikedMovies, setDisLikedMovies } = useUserContext()

  const [tags, setTags] = useState([])
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
    if (saved) setTags([])
    if (liked) setTags([])
    if (disliked) setTags([])
  }, [saved, liked, disliked])

  useEffect(() => {
    if (disliked || isEmpty(filter)) return setFilteredMovies(movies)

    const tagArr = tags[filter]

    const filtered = movies.filter(movie => {
      const exists = tagArr?.length
        ? tagArr?.find(id => id === movie.id)
        : tagArr === movie.id
      return exists ? true : false
    })

    setFilteredMovies(filtered)
  }, [filter, movies, tags, disliked])

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
        <TagFilter filter={filter} setFilter={setFilter} saved={!liked} />
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
