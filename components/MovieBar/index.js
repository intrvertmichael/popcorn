import styles from '../../styles/Home.module.css'
import Movie from '../Movie'

const MovieBar = ({movieList}) => {
    return (
        <div className={styles.movie_bar}>
            <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
            <div className={styles.genre_movies_wrapper}>
                <ul className={styles.genre_movies} style={{width: `${movieList.movies.length * 16.7}%`}}>
                { movieList.movies.map( movie => <Movie movie={movie} key={movie.id} /> ) }
                </ul>
            </div>
        </div>
    )
}

export default MovieBar;