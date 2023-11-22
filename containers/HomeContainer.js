import { useState } from "react"

import { useGetFirebaseUser } from "context/FirebaseContext"
import { getFavGenres } from "utils/firebase/general"

import MovieCollection from "components/MovieCollection"
import Intro from "components/Intro"
import FavoriteMovies from "components/FavoriteMovies"

export default function Home({ best, genres }) {
  const firebaseUser = useGetFirebaseUser()
  const [favGenreMovies, setfavGenreMovies] = useState() // TODO: move this to context (?)

  if (firebaseUser && !favGenreMovies) {
    getFavGenres(firebaseUser, setfavGenreMovies) // TODO: this doesnt need to be called on every render
  }

  return (
    <div className='flex flex-col h-full'>
      {!firebaseUser && <Intro />}

      {firebaseUser && favGenreMovies ? (
        <>
          <h2 className='py-32 text-2xl text-center'>
            Based on your Liked Movies:
          </h2>

          <FavoriteMovies favGenreMovies={favGenreMovies} genres={genres} />
        </>
      ) : (
        <MovieCollection
          view='bar'
          movieList={{
            title: "Best of the Year",
            movies: best?.results,
          }}
        />
      )}
    </div>
  )
}
