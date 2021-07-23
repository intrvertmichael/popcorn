import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Trending from '../components/Trending'
import Header from '../components/Header'
import MovieBar from '../components/MovieBar'

import { getTrending, getGenres, getMoviesFromGenre } from '../requests/movie.api'

export async function getStaticProps () {

  const movies = await getTrending()
  const genres = await getGenres()

  // call firebase
  // use firebase response to choose what 3 genres to show
  const favGenre = [10402, 16, 878]

  let allFavMovies = await Promise.all(favGenre.map( async genreID => {
    const genreTitle = genres.find( g => g.id === genreID).name
    const movies = await getMoviesFromGenre(genreID)
    return { title: genreTitle, movies: movies.results }
  }))

  return {
    props: {
      movies,
      genres,
      allFavMovies
    }
  }
}

export default function Home({movies, genres, allFavMovies}) {

  return (
    <>
      <Trending movies={movies} />
      <div className={styles.container}>

        <div className={styles.home_header}>
          <Header />
        </div>

        <ul className={styles.genre_list}>
        {
          genres.map( (genre, key) =>(
            <Link href={'/genres/'+ genre.id} key={key}>
              <a>
                <li>{genre.name}</li>
              </a>
            </Link>
          ))
        }
        </ul>

        <div className={styles.genre_verbs}>
          <h2>I want to see a movie that makes me</h2>
          <ul>
            <li> laugh </li>
            <li> cry </li>
          </ul>
        </div>

        {
          allFavMovies?
          allFavMovies.map( (movieList, key) => <MovieBar movieList = {movieList} key={key} />)
          : ''
        }

      </div>
    </>
  )
}