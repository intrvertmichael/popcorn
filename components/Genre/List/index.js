import styles from '../../../styles/Home.module.css'
import Link from 'next/link'

const GenreList = ({genres}) => {

    if(!genres) return false

    return (
        <ul className={styles.genre_list}>
        {
            genres.map( (genre, key) =>(
                <Link key={key} href={'/genre/'+ genre.id} passHref>
                    <li> <a> {genre.name} </a> </li>
                </Link>
            ))
        }
        </ul>
    )
}

export default GenreList;