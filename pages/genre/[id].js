import Link from 'next/link'
import Layout from '../../components/Layout'
import Movie from '../../components/Movie'
import { getMoviesFromGenre, getGenreLabel } from '../../requests/movie.api'
import styles from '../../styles/Genre.module.css'

export const getStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    console.log(context.params)
    const movies = await getMoviesFromGenre(id)
    const genreLabel = await getGenreLabel(id)
    return { props: { movies, genreLabel } }
}

const GenreDetails = ({movies, genreLabel}) => {

    if(!movies) return false

    return (
        <Layout>
            <div className={styles.genre_title}>
                <h1>{genreLabel.name} Movies</h1>
            </div>

            <ul className={styles.genre_movies}>
                { movies.results.map( movie => <Movie movie={movie} key={movie.id}/> ) }
            </ul>

            <nav className={styles.genre_nav}>
                <p>Page {movies.page} / {movies.total_pages}</p>
                <Link href={'/genre/' + genreLabel.id + '?page=2'}>
                    <a>
                        Next
                    </a>
                </Link>
            </nav>
        </Layout>
    )
}

export default GenreDetails;