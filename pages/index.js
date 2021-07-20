import styles from '../styles/Home.module.css'
import Trending from '../components/Trending'
import Header from '../components/Header'
import MovieBar from '../components/MovieBar'

export async function getStaticProps () {

  const movies = await getTrending()
  const genres = await getGenres()

  // call firebase
  // use firebase response to choose what 3 genres to show
  const favGenre = [10402, 16, 878]

  let allFavMovies = await Promise.all(favGenre.map( async genreID => {
    const genreTitle = genres.find( g => g.id === genreID).name
    const movies = await getMoviesFromGenre(genreID)
    return { title: genreTitle, movies: movies }
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
        {genres.map( (genre, key) => <li key={key}>{genre.name} : {genre.id}</li>)}
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
          allFavMovies.map( (movieList, key) => <MovieBar movieList = {movieList} key= {key} />)
          : ''
        }

      </div>
    </>
  )
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function getTrending() {
  const baseURL = "https://api.themoviedb.org/3/"
  const key = process.env.MOVIE_KEY
  const keyPath = "?api_key=" + key

  const res = await fetch(baseURL +"/trending/movie/week" + keyPath)
  const data = await res.json()

  const movies = []

  for(let i = 0; i < 16; i++){
    let movie = data.results[i]
    const imagePath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    movies.push ({
      id: movie.id,
      title: movie.original_title,
      image: imagePath
    })
  }

  return movies
}

async function getGenres() {
  const baseURL = "https://api.themoviedb.org/3/"
  const key = process.env.MOVIE_KEY
  const keyPath = "?api_key=" + key

  const res = await fetch(baseURL +"/genre/movie/list" + keyPath)
  const data = await res.json()

  return data.genres
}

// get more pages = &page=2

async function getMoviesFromGenre(genreID) {
  const baseURL = "https://api.themoviedb.org/3"
  const key = process.env.MOVIE_KEY
  const keyPath = "?api_key=" + key

  const url = baseURL + "/discover/movie" + keyPath + "&with_genres=" + genreID

  const res = await fetch(url)
  const data = await res.json()

  return data.results
}