import DislikedMovie from "components/DislikedMovie"

import styles from "styles/ProfileMovieGrid.module.css"

export default function DislikedProfileMovies({ movies }) {
  if (movies?.length === 0) return false

  return (
    <ul className={styles.genre_movies}>
      {movies?.map(movie => {
        return <DislikedMovie key={movie.id} movie={movie} />
      })}
    </ul>
  )
}
