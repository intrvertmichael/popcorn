import { useEffect, useState } from 'react'
import styles from '../../../styles/Header.module.css'
import Link from 'next/link'

const GenreList = () => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        async function getGenres(){
            const genres_res = await fetch('/api/genres', { method: 'GET' })
            const genres_data = await genres_res.json()
            let genres = Object.entries(genres_data)?.map( data => data[1])
            setGenres(genres)
        }

        getGenres()
    }, [])

    console.log('genres', genres)

    return (
        <ul className={styles.genre_list}>
        {
            genres?.map( (genre, key) =>(
                <Link key={key} href={'/genre/'+ genre.id} passHref>
                    <li> <a> {genre.name} </a> </li>
                </Link>
            ))
        }
        </ul>
    )
}

export default GenreList;