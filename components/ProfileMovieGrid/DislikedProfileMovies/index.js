import styles from '../../../styles/ProfileMovieGrid.module.css'
import DislikedMovie from './DislikedMovie'

const DislikedProfileMovies = ({ movies }) => {
	if (movies?.length === 0) return false

	return (
		<>
			<ul className={styles.genre_movies}>
				{movies?.map((movie) => {
					return <DislikedMovie key={movie.id} movie={movie} />
				})}
			</ul>
		</>
	)
}

export default DislikedProfileMovies
