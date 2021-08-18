import Movie from '../Movie'
import styles from '../../styles/MovieGrid.module.css'

const ProfileMovieGrid = ({movies, title}) => {
    if(movies.length === 0) return false
    return (
        <div>
            <h4>{title}</h4>
            <ul className={styles.genre_movies}>
                {
                    movies.map( movie => <Movie movie={movie} key={movie.id} />)
                }
            </ul>
        </div>
    )
}

export default ProfileMovieGrid