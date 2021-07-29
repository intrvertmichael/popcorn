import styles from '../../../styles/Home.module.css'
import Link from 'next/link'

const GenreList = ({genres}) => {

    if(!genres) return false

    return (
        <ul className={styles.genre_list}>
        {
            genres.map( (genre, key) =>(
            <li key={key}>
                <Link href={'/genre/'+ genre.id}>
                    <a>
                        {genre.name}
                    </a>
                </Link>
            </li>
            ))
        }
        </ul>
    )
}

export default GenreList;