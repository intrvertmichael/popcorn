
import styles from '../styles/Home.module.css'
import { getTrending, getGenres, getMoviesFromGenre } from '../requests/movie.api'

import Trending from '../components/Trending'
import Header from '../components/Header'
import MovieBar from '../components/MovieBar'
import SearchBar from '../components/SearchBar'
import GenreList from '../components/Genre/List'
import GenreVerbs from '../components/Genre/Verbs'


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
        <Header />
        <GenreList genres={genres} />
        <SearchBar />
        <GenreVerbs />

        {
          // allFavMovies?
          // allFavMovies.map( (movieList, key) => <MovieBar movieList = {movieList} key={key} />)
          // : ''
        }

        <MovieBar movieList = {allFavMovies[0]} />

      </div>
    </>
  )
}