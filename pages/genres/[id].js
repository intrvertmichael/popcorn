
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getMoviesFromGenre, createMovieImageURL, getGenreLabel } from '../../requests/movie.api'

import styles from '../../styles/Genre.module.css'

export const getStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    const movies = await getMoviesFromGenre(id)
    const genreLabel = await getGenreLabel(id)
    return { props: { movies, genreLabel } }
}

const GenreDetails = ({movies, genreLabel}) => {

    if(!movies) return false


    return (
        <Layout>
            <h3 className={styles.genre_title}>{genreLabel.name} Movies</h3>
            <ul className={styles.genre_movies}>
                {
                    movies.map( movie => {
                        console.log(movie)
                        const poster = createMovieImageURL(movie.poster_path)

                        return (
                            <li key={movie.id}>
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
                    })
                }
            </ul>
        </Layout>
    )
}

export default GenreDetails;