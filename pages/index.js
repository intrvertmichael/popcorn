
import styles from '../styles/Home.module.css'
import Trending from '../components/trending'

export async function getStaticProps () {
  const baseURL = "https://api.themoviedb.org/3/"
  const key = process.env.MOVIE_KEY

  const res = await fetch(baseURL +"/trending/movie/week?api_key=" + key)
  const data = await res.json()

  const movies = data.results.map( movie => {

    const imagePath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`

    return {
      id: movie.id,
      title: movie.original_title,
      image: imagePath
    }
  })

  return {
    props: {
      movies: movies
    }
  }
}


export default function Home({movies}) {
  return (
    <div className={styles.container}>
      <h1>🍿Popcorn</h1>
      <Trending movies={movies} />
    </div>
  )
}
