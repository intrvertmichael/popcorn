import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Trending from '../components/trending'

export async function getStaticProps () {

  const movies = await getTrending()
  const genres = await getGenres()

  // call firebase
  // use firebase response to choose what 3 genres to show
  const favGenre = [80, 12, 16]

  let allFavMovies = await Promise.all(favGenre.map( async genre => {
    const movies = await getMoviesFromGenre(genre)
    return movies
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
        <div className={styles.title}>
          <div>
            <h1>🍿Popcorn</h1>
            <h2>Find what to watch</h2>
          </div>

          <div>
            <h3>Sign Up</h3>
            <h3>Log In</h3>
          </div>
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

        <div className={styles.genre_movies_wrapper}>
          {
            allFavMovies?
            allFavMovies.map( (movieList, key) => (
              <>
              <h3 className={styles.genre_movies_title}> I love %Genre% movies</h3>
              <ul key={key} className={styles.genre_movies}>
              {
                movieList.map( movie => {
                  const img = 'https://image.tmdb.org/t/p/original/' + movie.poster_path
                  return (
                    <li key={movie.id}>
                      <Image src={img} alt={movie.original_title} width="192" height="288"/>
                    </li>
                  )
                })
              }
              </ul>
              </>
            ))
            : ''
          }
        </div>

      </div>
    </>
  )
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - -

async function getTrending() {
  const baseURL = "https://api.themoviedb.org/3/"
  const key = process.env.MOVIE_KEY

  const res = await fetch(baseURL +"/trending/movie/week?api_key=" + key)
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

  const res = await fetch(baseURL +"/genre/movie/list?api_key=" + key)
  const data = await res.json()

  return data.genres
}

// get more pages = &page=2

async function getMoviesFromGenre(genreID) {
  const baseURL = "https://api.themoviedb.org/3"
  const key = process.env.MOVIE_KEY
  const url = baseURL + "/discover/movie?api_key=" + key + "&with_genres=" + genreID

  const res = await fetch(url)
  const data = await res.json()

  return data.results
}