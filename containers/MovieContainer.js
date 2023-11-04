import Image from "next/image"
import Link from "next/link"

import { createMovieImageURL } from "utils/movie.api"
import { createFullLength, createFullDate } from "utils/general"
import { useGetFirebaseUser } from "context/FirebaseContext"

import Rating from "components/Rating"
import Carousel from "components/Carousel"
import MovieCollection from "components/MovieCollection"
import VoteButtons from "components/VoteButtons"

import styles from "styles/MovieDetails.module.css"

export default function Movie({ movie, images, recommended }) {
  const firebaseUser = useGetFirebaseUser()

  if (!movie || !images || !recommended) return false

  const altPics = images.backdrops.map((img, key) => {
    const altImage = createMovieImageURL(img.file_path)
    return <Image key={key} src={altImage} fill={true} alt={key} />
  })

  const posterImage = createMovieImageURL(movie.poster_path)
  const genres = movie.genres.map(g => (
    <Link href={"/genre/" + g.id} key={g.id} passHref>
      <li> {g.name} </li>
    </Link>
  ))

  const fullDate = createFullDate(movie.release_date)
  const fullLength = createFullLength(movie.runtime)

  return (
    <div className={styles.container}>
      <Carousel images={altPics} />

      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.poster}>
            <Image src={posterImage} alt={movie.title} fill={true} />
          </div>

          <Rating score={movie.vote_average} count={movie.vote_count} />

          <ul className={styles.genres}>{genres}</ul>
        </div>

        <div className={styles.movie_info}>
          <div className={styles.movie_description}>
            <h1>{movie.title}</h1>
            <h2>{movie.tagline}</h2>
            <p className={styles.overview}>{movie.overview}</p>
            <div className={styles.details}>
              <p> Released on {fullDate}</p>
              <p> {fullLength} long</p>
            </div>

            {firebaseUser && (
              <div className={styles.vote_btns}>
                <VoteButtons movie={movie} />
              </div>
            )}
          </div>
        </div>
      </div>

      <MovieCollection
        view='bar'
        movieList={{
          movies: recommended.results,
          title: "Recommended Movies",
        }}
      />
    </div>
  )
}
