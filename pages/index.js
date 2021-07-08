import Image from 'next/image'
import styles from '../styles/Home.module.css'

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

  console.log(movies)
  console.log("movies")

  return (
    <div className={styles.container}>
      <h1>🍿Popcorn</h1>
      <ul className={styles.movie_grid}>
        {
          movies.map( movie => {
            return (
              <li key={movie.id}>
                <Image src={movie.image} alt={movie.title} width="185" height="278"/>
                {/* {movie.title} */}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
