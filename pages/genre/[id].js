import Link from 'next/link'
import Layout from '../../components/Layout'
import Movie from '../../components/Movie'
import MovieGrid from '../../components/MovieGrid'
import { getMoviesFromGenre, getGenreLabel } from '../../requests/movie.api'
import styles from '../../styles/Genre.module.css'

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
    const prevPage = (parseInt(page) - 1).toString()

    const backBtn = (
        movies.page > 1 ?
        <Link href={'/genre/' + genreLabel.id + '?page=' + prevPage}>
            <a>
                ←
            </a>
        </Link>
        : <p> ← </p>
    )

    const next_page_label = '/genre/' + genreLabel.id + '?page=' + nextPage
    const nextBtn = (
        movies.page < movies.total_pages ?
        <Link href={next_page_label}>
            <a>
                →
            </a>
        </Link>
        : <p> → </p>
    )

    return (
        <Layout>
            <div className={styles.genre_title}>
                <h1>{genreLabel.name} Movies</h1>
            </div>

            <MovieGrid movies={movies} next_page_label={next_page_label}/>

            <nav className={styles.genre_nav}>
                {backBtn}
                <p>Page <span>{page}</span> / {movies.total_pages}</p>
                {nextBtn}
            </nav>
        </Layout>
    )
}

export default GenreDetails;