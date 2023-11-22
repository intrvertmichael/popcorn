import { useEffect, useState } from "react"

import { useGetFirebaseUser } from "context/FirebaseContext"

import AuthForm from "components/AuthForm"
import ProfileMovieList from "components/ProfileMovieList"

const PAGES = {
  SAVED: "saved",
  LIKED: "liked",
  DISLIKED: "disliked",
}

export default function ProfileContainer() {
  const firebaseUser = useGetFirebaseUser()

  const [page, setPage] = useState(PAGES.SAVED)
  const [likedMovies, setLikedMovies] = useState([])
  const [dislikedMovies, setDisLikedMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])

  async function fetch_movie(id) {
    const movie_res = await fetch("/api/movie", {
      method: "GET",
      headers: { movie_id: id },
    })

    const movie_data = await movie_res.json()
    return movie_data
  }

  useEffect(() => {
    if (firebaseUser) {
      if (firebaseUser.liked) {
        Promise.all(
          firebaseUser.liked.map(
            async movie => await fetch_movie(movie.movie_id),
          ),
        ).then(result => setLikedMovies(result))
      }

      if (firebaseUser.disliked) {
        Promise.all(
          firebaseUser.disliked.map(
            async movie => await fetch_movie(movie.movie_id),
          ),
        ).then(result => setDisLikedMovies(result))
      }

      if (firebaseUser.saved) {
        Promise.all(
          firebaseUser.saved.map(
            async movie => await fetch_movie(movie.movie_id),
          ),
        ).then(result => setSavedMovies(result))
      }
    }
  }, [firebaseUser])

  if (!firebaseUser) return <AuthForm />

  return (
    <div className='w-full max-w-4xl pb-6 mx-auto'>
      <div className='flex gap-5'>
        {Object.values(PAGES).map(p => {
          const pageLabel = (
            <h3 key={p} className='capitalize'>
              {p} ({firebaseUser[p]?.length})
            </h3>
          )

          return page === p ? (
            pageLabel
          ) : (
            <button
              key={p}
              onClick={() => setPage(p)}
              className='text-neutral-500'
            >
              {pageLabel}
            </button>
          )
        })}
      </div>

      <h2 className='my-5 text-2xl text-neutral-500 capitalize'>
        {page} movies
      </h2>

      {page === PAGES.LIKED && (
        <ProfileMovieList movies={likedMovies} likes liked />
      )}

      {page === PAGES.DISLIKED && (
        <ProfileMovieList movies={dislikedMovies} likes={false} disliked />
      )}

      {page === PAGES.SAVED && (
        <ProfileMovieList
          movies={savedMovies}
          likes={page === PAGES.LIKED || page === PAGES.SAVED}
          saved
        />
      )}
    </div>
  )
}
