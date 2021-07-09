
import Image from 'next/image'
import styles from '../../styles/Home.module.css'

const Trending = ({movies}) => {

    const trendingMovies = movies.map( movie => (
        <li key={movie.id}>
            <Image src={movie.image} alt={movie.title} width="185" height="278"/>
        </li>
    ))

    return (
        <ul className={styles.movie_grid}>
            { trendingMovies }
        </ul>
    )
}

export default Trending;