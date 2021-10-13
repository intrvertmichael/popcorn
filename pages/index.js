import { useState } from 'react'
import { useGetFirebaseUser } from '../context/FirebaseContext'
import styles from '../styles/Home.module.css'
import { getTrending, getGenres, getBestThisYear } from '../requests/movie.api'

import Trending from '../components/Trending'
import Header from '../components/Header'
import MovieCollection from '../components/MovieCollection'

export async function getServerSideProps() {
	let trending = await getTrending()
	if (!trending) trending = []

	let genres = await getGenres()
	if (!genres) genres = []

	let best = await getBestThisYear()
	if (!best) best = []

	return { props: { trending, best, genres, fallback: false } }
}

export default function Home({ trending, best, genres }) {
	const firebaseUser = useGetFirebaseUser()
	const [favGenreMovies, setfavGenreMovies] = useState()

	async function fetch_genre_movies(genreID) {
		const genre_res = await fetch('/api/genre', {
			method: 'GET',
			headers: { genre_id: genreID },
		})

		const genre_data = await genre_res.json()
		return genre_data
	}

	async function getFavGenres() {
		// sorting the entries by fav Genres
		const keysValues = firebaseUser.genres
			? Object.entries(firebaseUser.genres)
			: []
		const sorted_list = keysValues.sort((a, b) => a[1] < b[1])
		const limited_list = sorted_list.slice(0, 5)

		// getting the movies from each sorted entry
		limited_list.map(async (entry) => {
			const genreID = entry[0]
			const genre_movies = await fetch_genre_movies(genreID)

			setfavGenreMovies((curr) => {
				return { ...curr, [genreID]: { count: entry[1], movies: genre_movies } }
			})
		})
	}

	function createFavGenreMovieCollections() {
		const fav_genre_movies = Object.entries(favGenreMovies)
		const sorted_genre_movies = fav_genre_movies.sort(
			(a, b) => a[1].count < b[1].count,
		)

		return sorted_genre_movies.map((movieList) => {
			const genre_info = genres?.find(
				(genre) => String(genre.id) === movieList[0],
			)

			return (
				<MovieCollection
					key={movieList[0]}
					view='bar'
					movieList={{
						genreID: genre_info.id,
						title: `${genre_info.name} Movies`,
						movies: movieList[1].movies.results,
					}}
				/>
			)
		})
	}

	if (firebaseUser && !favGenreMovies) getFavGenres()

	return (
		<>
			<Trending movies={trending} />

			<div className={styles.container}>
				<Header />

				{!firebaseUser ? (
					<div className={styles.intro}>
						<p>
							<span>🔎</span> Discover new and old movies <br />
							<span>★</span> Save the movies you want to see <br />
							<span>👍</span> Like movies to get recommendations <br />
							<span>🏷</span> Add tags to find movies faster <br />
							<span>👎</span> Disliked movies like will be vanished
							<br />
						</p>
					</div>
				) : (
					''
				)}

				{firebaseUser && favGenreMovies ? (
					<>
						<h2 className={styles.genre_intro}>
							Based on your Liked Movies you seem to like:
						</h2>
						{createFavGenreMovieCollections()}
					</>
				) : (
					<MovieCollection
						view='bar'
						movieList={{
							title: 'Best of the Year',
							movies: best?.results,
						}}
					/>
				)}
			</div>
		</>
	)
}
