import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


export async function getStaticProps () {
  const baseURL = "https://api.themoviedb.org/3/"
  const key = process.env.MOVIE_KEY

  const res = await fetch(baseURL +"/trending/movie/week?" + "api_key=" + key)
  const data = await res.json()


  return {
    props: {
      movies: data.results
    }
  }
}


export default function Home({movies}) {

  console.log(movies)

  return (
    <div className={styles.container}>
      <h1>🍿Popcorn</h1>
      <ul>
        {
          movies.map( movie => <li key={movie.id}>{movie.original_title}</li>)
        }
      </ul>
    </div>
  )
}
