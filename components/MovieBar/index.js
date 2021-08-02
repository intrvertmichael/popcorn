import styles from '../../styles/MovieBar.module.css'
import Movie from '../Movie'

const MovieBar = ({movieList}) => {

    if(!movieList || movieList.movies.length <= 1) return false

    const movie_length = movieList.movies.length
    const movie_image_size = 20
    const ul_width = movie_length * movie_image_size

    return (
        <div className={styles.movie_bar}>

            <h3 className={styles.genre_movies_title}> {movieList.title} </h3>

            <div className={styles.genre_movies_wrapper}>
                <ul className={styles.genre_movies} style={{width: `${ul_width}%`}}>
                    { movieList.movies.map( movie => <Movie movie={movie} key={movie.id} /> ) }
                </ul>
            </div>
        </div>
    )
}

export default MovieBar;