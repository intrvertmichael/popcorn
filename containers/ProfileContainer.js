import { useState } from "react"
import { isEmpty } from "lodash"

import { CONFIRM_MESSAGES, PAGES } from "constants/general"
import { useUserContext } from "context"

import ProfileMovieList from "components/ProfileMovieList"
import ProfiledUserInfo from "components/ProfileUserInfo"

export default function ProfileContainer() {
  const { likedMovies, dislikedMovies, savedMovies, resetData } =
    useUserContext()

  const [currentPage, setCurrentPage] = useState(PAGES.SAVED)

  const movieList = {
    [PAGES.SAVED]: savedMovies,
    [PAGES.LIKED]: likedMovies,
    [PAGES.DISLIKED]: dislikedMovies,
  }

  const handleRemoveAllData = () => {
    if (confirm(CONFIRM_MESSAGES.REMOVE_ALL_DATA)) resetData()
  }

  return (
    <div className='grid w-full max-w-4xl gap-12 py-12 mx-auto'>
      <ProfiledUserInfo />

      <button
        className='mx-auto text-neutral-800 hover:text-red-500 w-fit'
        onClick={handleRemoveAllData}
      >
        Remove Account Information
      </button>

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

      <ProfileMovieList
        movies={movieList[currentPage]}
        currentPage={currentPage}
      />
    </div>
  )
}
