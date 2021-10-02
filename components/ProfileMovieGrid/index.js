
import styles from '../../styles/ProfileMovieGrid.module.css'
import { useGetFirebaseUser } from "../../context/FirebaseContext";
import getCurrentFirebaseMovies from '../Movie/firebase/_get'

import ProfileMovie from './ProfileMovie'
import { useEffect, useState } from 'react';

const ProfileMovieGrid = ({movies, set, likes}) => {
    const firebaseUser = useGetFirebaseUser()
    const [tags, setTags] = useState()

    useEffect( () => {
        async function getTags(){
            const {current_tags} = await getCurrentFirebaseMovies(firebaseUser)
            setTags(current_tags)
        }

        getTags()

    }, [firebaseUser])

    if(movies.length === 0) return false

    return (
        <>
            <ul>
                {
                    tags?
                    Object.keys(tags).map(tag => <li key={tag}> {tag} </li>)
                    : ''
                }
            </ul>

            <ul className={styles.genre_movies}>
                {
                    movies.map( movie => {
                        return (
                            <ProfileMovie
                                key={movie.id}
                                movie={movie}
                                set={set}
                                likes={likes}
                                tags={tags}
                            />
                        )
                    })
                }
            </ul>
        </>
    )
}

export default ProfileMovieGrid