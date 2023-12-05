import { useState } from "react"
import { isEmpty } from "lodash"

import { PAGES } from "constants/general"
import { useUserContext } from "context"

import ProfileMovieList from "components/ProfileMovieList"
import ProfiledUserInfo from "components/ProfileUserInfo"

export default function ProfileContainer() {
  const { likedMovies, dislikedMovies, savedMovies } = useUserContext()

  const [currentPage, setCurrentPage] = useState(PAGES.SAVED)

  const movieList = {
    [PAGES.SAVED]: savedMovies,
    [PAGES.LIKED]: likedMovies,
    [PAGES.DISLIKED]: dislikedMovies,
  }

  return (
    <div className='grid w-full max-w-4xl gap-12 pb-12 mx-auto'>
      <ProfiledUserInfo />

      <div className='flex justify-center gap-6'>
        {Object.values(PAGES).map(page => {
          const pageLabel = (
            <h3 key={page} className='capitalize pointer-events-none'>
              {page}
              {isEmpty(movieList[page]) ? "" : ` (${movieList[page].length})`}
            </h3>
          )

          return currentPage === page ? (
            pageLabel
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className='text-neutral-500'
            >
              {pageLabel}
            </button>
          )
        })}
      </div>

      {/* TODO: pass only the current page and derrive everything inside of the component */}
      <ProfileMovieList
        movies={movieList[currentPage]}
        likes={currentPage === PAGES.LIKED || currentPage === PAGES.SAVED}
        liked={currentPage === PAGES.LIKED}
        disliked={currentPage === PAGES.DISLIKED}
        saved={currentPage === PAGES.SAVED}
      />
    </div>
  )
}
