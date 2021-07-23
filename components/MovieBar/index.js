import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import {createMovieImageURL} from '../../requests/movie.api'
import Movie from '../Movie'

const MovieBar = ({movieList}) => {
    return (
        <>
            <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
            <div className={styles.genre_movies_wrapper}>
                <ul className={styles.genre_movies}>
                {
                    // movieList.movies.map( movie => {
                    //     const img = createMovieImageURL(movie.poster_path)

                    //     return (
                    //         <li key={movie.id}>
                    //             <Link href={'/movies/' + movie.id}>
                    //                 <a>
                    //                     <Image src={img} alt={movie.original_title} width="192" height="288"/>
                    //                 </a>
                    //             </Link>
                    //         </li>
                    //     )
                    // })

                    movieList.movies.map( movie => <Movie movie={movie} key={movie.id} /> )
                }
                </ul>
            </div>
        </>
    )
}

export default MovieBar;