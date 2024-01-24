import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"

import { fetchGenres } from "utils/endpoints"

import GenreList from "components/GenreList"
import Search from "./Search"

const linkStyle = "text-neutral-500 hover:text-white"

export default function Header() {
  const router = useRouter()

  const { isLoading, data: genres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  })

  const [genreVisible, setGenreVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)

  const onProfilePage = router.pathname === "/profile"

  useEffect(() => {
    setGenreVisible(false)
    setSearchVisible(false)
  }, [router.asPath])

  return (
    <>
      <div className='flex justify-between p-6'>
        <div className='flex flex-col items-start gap-3'>
          <div className='flex items-center gap-3'>
            <Link href='/' passHref>
              <h1 className='flex gap-2 text-2xl text-white'>
                <span>🍿</span>Popcorn
              </h1>
            </Link>

            <h2 className='text-neutral-500'>Find what to watch</h2>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={() => {
              setSearchVisible(curr => !curr)
              setGenreVisible(false)
            }}
            className='text-xl'
          >
            🔎
          </button>

          {!onProfilePage && (
            <Link href='/profile' passHref className='px-2'>
              <h3 className={linkStyle}>Profile</h3>
            </Link>
          )}

          <button
            onClick={() => {
              setGenreVisible(curr => !curr)
              setSearchVisible(false)
            }}
            className={linkStyle}
          >
            Genres
          </button>
        </div>
      </div>

      {searchVisible && <Search />}

      {genreVisible && !isLoading && (
        <GenreList genres={genres && Object.values(genres)} />
      )}
    </>
  )
}
