import Link from 'next/link'
import Image from 'next/image'
import {createMovieImageURL} from '../../requests/movie.api'
import styles from '../../styles/Movie.module.css'

const Movie = ({movie}) => {

    const poster = createMovieImageURL(movie.poster_path)

    return (
        <li className={styles.movie_li} key={movie.id}>
            <Image src={poster} alt={movie.original_title} width="192" height="288"/>

            <div className={styles.movie_info}>
                <div>
                    <h3>
                        <Link href={'/movies/' + movie.id}>
                            <a>
                                {movie.original_title}
                            </a>
                        </Link>
                    </h3>

                    <p>
                        Voted {movie.vote_average} <br/>
                        by {movie.vote_count} people
                    </p>
                </div>
            </div>
        </li>
    )
}

export default Movie