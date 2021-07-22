
import Image from 'next/image'
import Header from '../../components/Header'
import { getMoviesFromGenre, createMovieImageURL } from '../../requests/movie.api'

import styles from '../../styles/Genre.module.css'

export const getStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    const movies = await getMoviesFromGenre(id)
    return { props: { movies } }
}

const GenreDetails = ({movies}) => {

    if(!movies) return false


    return (
        <div>
            <Header />

            <ul className={styles.genre_movies}>
                {
                    movies.map( movie => {
                        const poster = createMovieImageURL(movie.poster_path)

                        return (
                            <li key={movie.id}>
                                <Image src={poster} alt={movie.original_title} width="192" height="288"/>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default GenreDetails;