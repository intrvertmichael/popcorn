import { useState } from "react"

import MovieCollection from "components/MovieCollection"
import Intro from "components/Intro"
import FavoriteMovies from "components/FavoriteMovies"

export default function Home({ best, genres }) {
  const [favGenreMovies, setfavGenreMovies] = useState() // TODO: move this to context (?)

  if (null && !favGenreMovies) {
  }

  return (
    <div className='flex flex-col h-full'>
      {!null && <Intro />}

      {null && favGenreMovies ? (
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
