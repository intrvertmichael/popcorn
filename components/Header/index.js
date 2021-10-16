import { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import {
	useGetFirebaseUser,
	useSetFirebaseUser,
} from '../../context/FirebaseContext'
import { useRouter } from 'next/router'
import { firebase_signout } from './../../requests/firebase/auth'
import GenreList from '../Genre/List'
import SearchBar from '../SearchBar'
import Head from 'next/head'

const Header = () => {
	const firebaseUser = useGetFirebaseUser()
	const setFirebaseUser = useSetFirebaseUser()

	const [genreVisible, setGenreVisible] = useState(false)
	const [searchVisible, setSearchVisible] = useState(false)

	const router = useRouter()
	const onAuthPage = router.pathname === '/auth'

	function handleGenreBtn() {
		if (searchVisible) setSearchVisible(false)
		if (genreVisible) setGenreVisible(false)
		else setGenreVisible(true)
	}

	function handleSearchBtn() {
		if (genreVisible) setGenreVisible(false)
		if (searchVisible) setSearchVisible(false)
		else setSearchVisible(true)
	}

	let rightComp = (
		<Link href='/auth'>
			<a>
				<h3>
					Create an account <br />
					to save and vote <br />
					on Movies
				</h3>
			</a>
		</Link>
	)

	if (onAuthPage) rightComp = <div></div>
	if (firebaseUser)
		rightComp = (
			<div className={styles.right}>
				<button
					className={styles.logout_btn}
					onClick={() => {
						setFirebaseUser(null)
						firebase_signout()
					}}>
					Sign Out
				</button>

				<Link href='/auth'>
					<a>
						<h3>Profile</h3>
					</a>
				</Link>
			</div>
		)

	return (
		<>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=no'
				/>
			</Head>

			<div className={styles.header}>
				<div className={styles.left}>
					<div>
						<Link href='/'>
							<a>
								<h1>
									<span>🍿</span>Popcorn
								</h1>
							</a>
						</Link>
						<h2>Find what to watch</h2>
					</div>

					<div>
						<button onClick={handleGenreBtn}> Genres </button>
						<button onClick={handleSearchBtn}> Search </button>
					</div>
				</div>

				{rightComp}
			</div>

			{genreVisible && <GenreList />}
			{searchVisible && <SearchBar />}
		</>
	)
}

export default Header
