import Link from "next/link"
import styles from "styles/Home.module.css"

const Trending = ({ movies }) => {
  if (!movies) return false

  return (
    <ul className={styles.movie_grid}>
      {movies?.map(movie => {
        const styles = {
          background: `linear-gradient(transparent ,black 100%), url(${movie.image})`,
          backgroundSize: "cover",
        }

        return (
          <Link href={"/movie/" + movie.id} key={movie.id}>
            <li style={styles}> </li>
          </Link>
        )
      })}
    </ul>
  )
}

export default Trending
