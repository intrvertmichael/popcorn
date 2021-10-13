import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createMovieImageURL } from '../../requests/movie.api'
import styles from '../../styles/Movie.module.css'
import { useGetFirebaseUser } from '../../context/FirebaseContext'

import VoteButtons from '../VoteButtons'

const Movie = ({ movie, fb_liked }) => {
	const firebaseUser = useGetFirebaseUser()

	const [liked, setLiked] = useState(null)

	// default movie view
	useEffect(() => {
		if (fb_liked) setLiked(true)
		else setLiked(null)
	}, [fb_liked])

	const titleLimit = 20
	const title =
		movie?.original_title?.length > titleLimit
			? movie.original_title.substring(0, titleLimit) + '...'
			: movie.original_title
	const poster = createMovieImageURL(movie.poster_path)

	let classes = styles.movie_li
	if (liked) classes = styles.liked
	if (liked === false) classes = styles.disliked

	if (!movie || !movie.poster_path) return false

	return (
		<li className={classes} key={movie.id}>
			<Image src={poster} alt={movie.original_title} width='288' height='432' />

			<div
				className={styles.movie_info}
				style={firebaseUser ? {} : { justifyContent: 'center' }}>
				<Link href={'/movie/' + movie.id} passHref={true}>
					<div className={styles.movie_info_description}>
						<div>
							<h3>{title}</h3>

							<p>★ {movie.vote_average}</p>
						</div>
					</div>
				</Link>

				{firebaseUser && (
					<div className={styles.votes}>
						<VoteButtons movie={movie} />
					</div>
				)}
			</div>
		</li>
	)
}

export default Movie
