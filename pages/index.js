
import styles from '../styles/Home.module.css'
import Trending from '../components/trending'

export async function getStaticProps () {
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

  return {
    props: {
      movies: movies
    }
  }
}

export default function Home({movies}) {
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

        <div className={styles.genre_verbs}>
          <h2>I want to see a movie that makes me</h2>
          <ul>
            <li> laugh </li>
            <li> cry </li>
          </ul>
        </div>

      </div>
    </>
  )
}
