import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/Genre.module.css'

import { getMoviesFromGenre, getGenreLabel } from '../../requests/movie.api'
import MovieCollection from '../../components/MovieCollection'

import { useGetFirebaseUser } from "../../context/FirebaseContext";
import firebase from '../../requests/firebase/config'
const db = firebase.firestore()

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
    const firebaseUser = useGetFirebaseUser()
    // const [favGenreMovies, setfavGenreMovies] = useState()
    const [FBLikedMovies, setFBLikedMovies] = useState()
    const [FBDisLikedMovies, setFBDisLikedMovies] = useState()

    useEffect( () => {
        async function getFBMovies(){
            // getting liked Movies
            const fb_movies_res = await db.collection("movies").doc(firebaseUser.uid).get()
            const fb_movies_data = fb_movies_res.data()

            setFBLikedMovies(fb_movies_data.liked)
            setFBDisLikedMovies(fb_movies_data.disliked)
        }

        if(firebaseUser) getFBMovies()
    }, [firebaseUser])

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

            {/* <MovieGrid movies={movies} next_page_label={next_page_label}/> */}
            <MovieCollection
                key={movies[0]}
                view='grid'
                FBLikedMovies={FBLikedMovies}
                FBDisLikedMovies={FBDisLikedMovies}
                setFBLikedMovies={setFBLikedMovies}
                setFBDisLikedMovies={setFBDisLikedMovies}
                movieList={{
                    // genreID: genre_info.id,
                    // title: genre_info.name,
                    movies: movies.results
                }
            } />

            <nav className={styles.genre_nav}>
                {backBtn}
                <p>Page <span>{page}</span> / {movies.total_pages}</p>
                {nextBtn}
            </nav>
        </Layout>
    )
}

export default GenreDetails;