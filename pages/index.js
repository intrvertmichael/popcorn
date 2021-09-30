import styles from '../styles/Home.module.css'
import { getTrending, getGenres, getBestThisYear } from '../requests/movie.api'

import Trending from '../components/Trending'
import Header from '../components/Header'
import MovieBar from '../components/MovieBar'
import SearchBar from '../components/SearchBar'
import GenreList from '../components/Genre/List'

import { useGetFirebaseUser } from "../context/FirebaseContext";

import firebase from '../requests/firebase/config'
import { useEffect, useState } from 'react'
const db = firebase.firestore()

export async function getServerSideProps () {

  let trending = await getTrending()
  if(!trending) trending = []

  let genres = await getGenres()
  if(!genres) genres = []

  let best = await getBestThisYear()
  if(!best) best = []

  return { props: { trending, best, genres, fallback: false } }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default function Home({trending, best, genres}) {
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

      // getting favs from firebase
      const fb_genre_res = await db.collection("genres").doc(firebaseUser.uid).get()
      const fb_genre_data = fb_genre_res.data()

      // sorting the entries
      const keysValues = fb_genre_data? Object.entries(fb_genre_data) : []
      const sorted_list = keysValues.sort( (a,b) => a[1] < b[1])
      const limited_list = sorted_list.slice(0,3)

      // getting the moves from each sorted entry
      limited_list.map( async entry => {
        const genreID = entry[0]
        const genre_movies = await fetch_genre_movies(genreID)
        setFavMovies( curr => {return {...curr , [genreID]: genre_movies}})
      })
    }

    if(firebaseUser && !favMovies) getFavs()
  }, [favMovies, firebaseUser])

  // creating favorite movie bars
  if(firebaseUser && favMovies){
    const fav_genre_movies = favMovies? Object.entries(favMovies) : null
    var fav_movies_list = fav_genre_movies?
    fav_genre_movies.map( movieList => {
      const genre_info = genres.find( genre => String(genre.id) === movieList[0])
      return <MovieBar key={movieList[0]} movieList={{
          genreID: genre_info.id,
          title: genre_info.name,
          movies: movieList[1].results
      }} />
    })
    : []
  }

  return (
    <>
      <Trending movies={trending} />

      <div className={styles.container}>
        <Header />
        <GenreList genres={genres} />
        <SearchBar />

        {
          firebaseUser && favMovies?
          fav_movies_list
          :
          <MovieBar movieList={{
              title: "Best of the Year",
              movies: best?.results
          }} />
        }

      </div>
    </>
  )
}