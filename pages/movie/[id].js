import Image from "next/image"
import styles from "styles/MovieDetails.module.css"
import Rating from "components/Rating"
import Layout from "components/Layout"
import { useEffect, useState } from "react"

import {
  getSingleMovie,
  getImageList,
  createMovieImageURL,
  getRecommendedMovies,
} from "utils/movie.api"
import Link from "next/link"
import Carousel from "components/Carousel"
import MovieCollection from "components/MovieCollection"
import VoteButtons from "components/VoteButtons"

import { useGetFirebaseUser } from "context/FirebaseContext"
import firebase from "utils/firebase/config"
const db = firebase.firestore()

export const getStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export const getStaticProps = async context => {
  const id = context.params.id
  const movie = await getSingleMovie(id)
  const images = await getImageList(id)
  const recommended = await getRecommendedMovies(id)

  return { props: { movie, images, recommended } }
}

const MovieDetails = ({ movie, images, recommended }) => {
  const firebaseUser = useGetFirebaseUser()
  const [FBLikedMovies, setFBLikedMovies] = useState()
  const [FBDisLikedMovies, setFBDisLikedMovies] = useState()

  useEffect(() => {
    async function getFBMovies() {
      // getting liked Movies
      const fb_movies_res = await db
        .collection("movies")
        .doc(firebaseUser.uid)
        .get()
      const fb_movies_data = fb_movies_res.data()

      setFBLikedMovies(fb_movies_data?.liked)
      setFBDisLikedMovies(fb_movies_data?.disliked)
    }

    if (firebaseUser) getFBMovies()
  }, [firebaseUser])

  if (!movie || !images || !recommended) return false

  const altPics = images.backdrops.map((img, key) => {
    const altImage = createMovieImageURL(img.file_path)
    return <Image key={key} src={altImage} width={960} height={540} alt={key} />
  })

  const posterImage = createMovieImageURL(movie.poster_path)
  const genres = movie.genres.map(g => (
    <Link href={"/genre/" + g.id} key={g.id}>
      <li> {g.name} </li>
    </Link>
  ))

  const fullDate = createFullDate(movie.release_date)
  const fullLength = createFullLength(movie.runtime)

  return (
    <Layout>
      <Carousel images={altPics} />

      <div className={styles.poster}>
        <Image src={posterImage} alt={movie.title} width='185' height='278' />
      </div>

      <div className={styles.movie_info}>
        <Rating score={movie.vote_average} count={movie.vote_count} />

        {firebaseUser && (
          <div className={styles.vote_btns}>
            <VoteButtons movie={movie} />
          </div>
        )}

        <div className={styles.movie_description}>
          <h1>{movie.title}</h1>
          <h2>{movie.tagline}</h2>

          <p className={styles.overview}>{movie.overview}</p>

          <div className={styles.details}>
            <p> Released on {fullDate}</p>
            <p> {fullLength} long</p>
          </div>

          <ul className={styles.genres}>{genres}</ul>
        </div>

        <MovieCollection
          view='bar'
          FBLikedMovies={FBLikedMovies}
          FBDisLikedMovies={FBDisLikedMovies}
          setFBLikedMovies={setFBLikedMovies}
          setFBDisLikedMovies={setFBDisLikedMovies}
          movieList={{
            movies: recommended.results,
            title: "Recommended Movies",
          }}
        />
      </div>
    </Layout>
  )
}

function createFullLength(length) {
  const lengthHours = Math.floor(length / 60)
  const lengthMins = length % 60
  const fullLength =
    (lengthHours > 1
      ? lengthHours + " hours and "
      : lengthHours + " hour and ") +
    lengthMins +
    " minutes"
  return fullLength
}

function createFullDate(date) {
  const dateObj = new Date(date)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const month = months[dateObj.getMonth()]
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()
  return `${month} ${day}, ${year}`
}

export default MovieDetails
