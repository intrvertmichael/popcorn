import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { useGetFirebaseUser, useSetFirebaseUser } from "context/FirebaseContext"
import { firebase_signout } from "utils/firebase/auth"

import GenreList from "components/GenreList"
// import SearchBar from "components/SearchBar"
import AuthForm from "components/AuthForm"

import styles from "styles/Header.module.css"

export default function Header({ genres }) {
  const firebaseUser = useGetFirebaseUser()
  const setFirebaseUser = useSetFirebaseUser()

  const [genreVisible, setGenreVisible] = useState(false)
  const [authVisible, setAuthVisible] = useState(false)

  const router = useRouter()
  const onProfilePage = router.pathname === "/profile"

  const handleGenreBtn = () => setGenreVisible(curr => !curr)

  function handleSearchBtn() {
    if (genreVisible) setGenreVisible(false)
    else setSearchVisible(true)
  }

  const handleAuthClick = () => setAuthVisible(curr => !curr)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.leftTop}>
            <Link href='/' passHref>
              <h1>
                <span>🍿</span>Popcorn
              </h1>
            </Link>

            <h2>Find what to watch</h2>
          </div>

          <div>
            <button onClick={handleGenreBtn}> Genres </button>
          </div>
        </div>

        <div className={styles.right}>
          {/* <SearchBar /> */}

          {firebaseUser && (
            <>
              <button
                className={styles.logout_btn}
                onClick={() => {
                  setFirebaseUser(null)
                  firebase_signout()
                  onProfilePage && router.push("/")
                }}
              >
                Sign Out
              </button>

              {!onProfilePage && (
                <Link href='/profile' passHref>
                  <h3>Profile</h3>
                </Link>
              )}
            </>
          )}

          {!firebaseUser && !onProfilePage && (
            <button onClick={handleAuthClick} className={styles.auth}>
              Create an account <br />
              to save and vote <br />
              on Movies
            </button>
          )}
        </div>
      </div>

      {genreVisible && <GenreList genres={genres} />}
      {authVisible && <AuthForm />}
    </>
  )
}
