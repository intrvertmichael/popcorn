import { useEffect, useState } from "react"
import { isEmpty } from "lodash"

import { useGetFirebaseUser } from "context/FirebaseContext"

import ProfileMovie from "components/ProfileMovie"
import TagFilter from "components/TagFilter"

export default function SavedProfileMovies({ movies, saved, liked, disliked }) {
  const firebaseUser = useGetFirebaseUser()
  const [tags, setTags] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredMovies, setFilteredMovies] = useState()

  useEffect(() => {
    if (saved) setTags(firebaseUser.tags?.saved)
    if (liked) setTags(firebaseUser.tags.liked)
    if (disliked) setTags([])
  }, [firebaseUser, saved, liked, disliked])

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

  if (movies?.length === 0) return <></>

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
    </>
  )
}
