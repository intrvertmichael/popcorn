import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Trending = ({movies}) => {

    const trendingMovies = movies.map( movie => (
        <li key={movie.id}>
            <Link href={'/movies/' + movie.id}>
                <a>
                <Image src={movie.image} alt={movie.title} width="185" height="278"/>
                </a>
            </Link>
        </li>
    ))

    return (
        <>
            <h3>Trending this week</h3>
            <ul className={styles.movie_grid}>
                { trendingMovies }
            </ul>
        </>
    )
}

export default Trending;