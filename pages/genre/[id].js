import Link from 'next/link'
import Layout from '../../components/Layout'
import Movie from '../../components/Movie'
import { getMoviesFromGenre, getGenreLabel } from '../../requests/movie.api'
import styles from '../../styles/Genre.module.css'

// export const getStaticPaths = async () => {
//     return { paths: [], fallback: true }
// }

export const getServerSideProps = async (context) => {
    const id= context.params.id
    let page = context.query.page? context.query.page : 1

    let movies
    if(context.query.page) movies = await getMoviesFromGenre(id, page)
    else movies = await getMoviesFromGenre(id)

    const genreLabel = await getGenreLabel(id)

    return { props: { movies, genreLabel, page } }
}

const GenreDetails = ({movies, genreLabel, page}) => {

    if(!movies && !genreLabel && !page) return false

    const nextPage = (parseInt(page) + 1).toString()

    return (
        <Layout>
            <div className={styles.genre_title}>
                <h1>{genreLabel.name} Movies</h1>
            </div>

            <ul className={styles.genre_movies}>
                { movies.results.map( movie => <Movie movie={movie} key={movie.id}/> ) }
            </ul>

            <nav className={styles.genre_nav}>
                <p>Page {page} / {movies.total_pages}</p>
                <Link href={'/genre/' + genreLabel.id + '?page=' + nextPage}>
                    <a>
                        Next
                    </a>
                </Link>
            </nav>
        </Layout>
    )
}

export default GenreDetails;