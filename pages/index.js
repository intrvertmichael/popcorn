import styles from '../styles/Home.module.css'
import { getTrending, getGenres, getMoviesFromGenre } from '../requests/movie.api'

import Trending from '../components/Trending'
import Header from '../components/Header'
// import MovieBar from '../components/MovieBar'
import SearchBar from '../components/SearchBar'
import GenreList from '../components/Genre/List'

import { useGetFirebaseUser } from "../context/FirebaseContext";

import firebase from '../requests/firebase/config'
import { useEffect, useState } from 'react'
const db = firebase.firestore()

export async function getServerSideProps () {

  let movies = await getTrending()
  if(!movies) movies = []

  let genres = await getGenres()
  if(!genres) genres = []

  return { props: { movies, genres, fallback: false } }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function Home({movies, genres}) {
  const firebaseUser = useGetFirebaseUser()
  const [favMovies, setFavMovies] = useState()

  async function fetch_genre_movies(genreID){
    const genre_res = await fetch('/api/genre', {
        method: 'GET',
        headers: { genre_id: genreID }
    })

    const genre_data = await genre_res.json()
    return genre_data
}



useEffect( () => {
  async function getFavs(){
    console.log("calling getFavs...")
    // getting favs from firebase
    const fb_genre_res = await db.collection("genres").doc(firebaseUser.uid).get()
    const fb_genre_data = fb_genre_res.data()

    // sorting the entries
    const keysValues = Object.entries(fb_genre_data)
    const sorted_list = keysValues.sort( (a,b) => a[1] < b[1])
    const limited_list = sorted_list.slice(0,3)

    // getting the moves from each sorted entry
    limited_list.map( async entry => {
      const genreID = entry[0]
      const genre_movies = await fetch_genre_movies(genreID)
      console.log(genre_movies)
      setFavMovies( curr => {return {...curr , [genreID]: genre_movies}})
    })
  }

  if(firebaseUser && !favMovies) getFavs()
}, [favMovies, firebaseUser])

console.log("favMovies", favMovies)

  return (
    <>
      <Trending movies={movies} />

      <div className={styles.container}>
        <Header />
        <GenreList genres={genres} />
        <SearchBar />

        {
          firebaseUser?
          // <MovieBar movieList = {allFavMovies[0]} />
          "logged in"
          : "not logged in"
        }
      </div>
    </>
  )
}