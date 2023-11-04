import { useEffect, useState } from "react"

import { useGetFirebaseUser } from "context/FirebaseContext"

import LikedMovie from "components/LikedMovie"
import TagFilter from "components/TagFilter"

import styles from "styles/ProfileMovieGrid.module.css"

export default function LikedProfileMovies({ movies }) {
  const firebaseUser = useGetFirebaseUser()
  const [tags, setTags] = useState()
  const [filter, setFilter] = useState()
  const [filteredMovies, setFilteredMovies] = useState()

  useEffect(() => {
    async function getTags() {
      setTags(firebaseUser.tags.liked)
    }

    getTags()
  }, [firebaseUser])

  useEffect(() => {
    if (filter) {
      const tagArr = tags[filter]
      const filtered = movies.filter(movie => {
        const exists = tagArr?.length
          ? tagArr?.find(id => id === movie.id)
          : tagArr === movie.id
        return exists ? true : false
      })
      setFilteredMovies(filtered)
    } else {
      setFilteredMovies(movies)
    }
  }, [filter, movies, tags])

  if (movies?.length === 0) return false

  return (
    <>
      <TagFilter filter={filter} setFilter={setFilter} />

      <ul className={styles.genre_movies}>
        {filteredMovies?.map(movie => {
          return (
            <LikedMovie key={movie.id} movie={movie} movies={filteredMovies} />
          )
        })}
      </ul>
    </>
  )
}
