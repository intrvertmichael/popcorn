import styles from "styles/ProfileMovieGrid.module.css"
import DislikedMovie from "components/ProfileMovieGrid/DislikedProfileMovies/DislikedMovie"

const DislikedProfileMovies = ({ movies }) => {
  if (movies?.length === 0) return false

  return (
    <>
      <ul className={styles.genre_movies}>
        {movies?.map(movie => {
          return <DislikedMovie key={movie.id} movie={movie} />
        })}
      </ul>
    </>
  )
}

export default DislikedProfileMovies
