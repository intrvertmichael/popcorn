import styles from '../../styles/MovieBar.module.css'
import Movie from '../Movie'

const MovieBar = ({movieList}) => {

    if(!movieList) return false

    const movie_length = movieList.movies.length
    const movie_image_size = 20
    let ul_width = movieList.movies.length * movie_image_size

    console.log('length: ', movie_length)
    console.log('ul_width: ', ul_width)

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