import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { useUserContext } from "context"

import ProfileMovie from "components/ProfileMovie"
import TagFilter from "components/TagFilter"

export default function ProfileMovieList({ movies, saved, liked, disliked }) {
  const [tags, setTags] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredMovies, setFilteredMovies] = useState()
  const { setSavedMovies, setLikedMovies, setDisLikedMovies } = useUserContext()

  const handleRemoveMoviesList = () => {
    if (
      window.confirm(
        "Are you sure you want to remove all movies from this list?",
      )
    ) {
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
      </ul>

      <button
        className='py-2 text-sm text-red-500 border border-transparent hover:border-red-500'
        onClick={handleRemoveMoviesList}
      >
        Remove all movies from this list
      </button>
    </>
  )
}
