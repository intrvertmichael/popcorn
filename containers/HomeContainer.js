import { useState } from "react"

import { useGetFirebaseUser } from "context/FirebaseContext"
import { getFavGenres } from "utils/firebase/general"

import MovieCollection from "components/MovieCollection"
import Intro from "components/Intro"
import FavoriteMovies from "components/FavoriteMovies"

import styles from "styles/Home.module.css"

export default function Home({ best, genres }) {
  const firebaseUser = useGetFirebaseUser()
  const [favGenreMovies, setfavGenreMovies] = useState() // TODO: move this to context (?)

  if (firebaseUser && !favGenreMovies) {
    getFavGenres(firebaseUser, setfavGenreMovies) // TODO: this doesnt need to be called on every render
  }

  return (
    <>
      <div className={styles.container}>
        {!firebaseUser && <Intro />}

        {firebaseUser && favGenreMovies ? (
          <>
            <h2 className={styles.genre_intro}>Based on your Liked Movies:</h2>

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
    </>
  )
}
