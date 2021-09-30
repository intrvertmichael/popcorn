
import styles from '../../styles/ProfileMovieGrid.module.css'
import ProfileMovie from './ProfileMovie'

const ProfileMovieGrid = ({movies, set, likes}) => {
    if(movies.length === 0) return false

    return (
        <ul className={styles.genre_movies}>
            {
                movies.map( movie => {
                    return (
                        <ProfileMovie
                            key={movie.id}
                            movie={movie}
                            set={set}
                            likes={likes}
                        />
                    )
                })
            }
        </ul>
    )
}

export default ProfileMovieGrid