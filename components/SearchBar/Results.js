import styles from '../../styles/SeachBar.module.css'
import MovieCollection from '../MovieCollection'

import { useState, useEffect } from 'react'
import { useGetFirebaseUser } from "../../context/FirebaseContext";
import firebase from '../../requests/firebase/config'
const db = firebase.firestore()

const Results = ({results, searchText, setSearchText, setResults, fetchResults}) => {
    const firebaseUser = useGetFirebaseUser()
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


    if(!results) return false

    function clearResults(){
        setSearchText(null)
        setResults(null)
    }

    if (results.movies?.length < 1 ) {
        return (
            <div
                className={styles.clear_search}
                onClick={clearResults}
                style={{textAlign: "center"}}
                >
                No matching movies found. <br/>
                Please try again
            </div>
        )
    }

    const backBtn = (
        results.page > 1 ?
        <button onClick={() => fetchResults(results.page - 1)}>
            ←
        </button>
        : <p>←</p>
    )

    const nextBtn = (
        results.page < results.total_pages ?
        <button onClick={() => fetchResults(results.page + 1)}>
            →
        </button>
        : <p>→</p>
    )

    return (
        <div className={styles.results_wrapper}>
            <button className={styles.clear_search} onClick={clearResults}> Clear Search </button>

            {/* <ul className={styles.results}>
                {results.movies}
            </ul> */}

            <MovieCollection
                view = "grid"
                FBLikedMovies={FBLikedMovies}
                FBDisLikedMovies={FBDisLikedMovies}
                setFBLikedMovies={setFBLikedMovies}
                setFBDisLikedMovies={setFBDisLikedMovies}
                movieList = {{
                    movies: results.movies,
                    title: `Results for ${searchText.value}`
                }}
            />

            {
                results.total_pages > 1?
                <nav>
                    {backBtn}
                    <p>Page <span>{results.page}</span> / {results.total_pages}</p>
                    {nextBtn}
                </nav>
                : ""
            }
        </div>
    )
}

export default Results;