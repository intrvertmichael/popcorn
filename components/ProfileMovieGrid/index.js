
import styles from '../../styles/ProfileMovieGrid.module.css'
import { useGetFirebaseUser } from "../../context/FirebaseContext";
import getCurrentFirebaseMovies from '../Movie/firebase/_get'

import ProfileMovie from './ProfileMovie'
import { useEffect, useState } from 'react';

const ProfileMovieGrid = ({movies, set, likes}) => {
    const firebaseUser = useGetFirebaseUser()
    const [tags, setTags] = useState()
    const [tagNames, setTagNames] = useState([])

    useEffect( () => {
        async function getTags(){
            const {current_tags} = await getCurrentFirebaseMovies(firebaseUser)
            setTags(current_tags)
            setTagNames(Object.keys(current_tags))
        }

        getTags()

    }, [firebaseUser])

    if(movies.length === 0) return false

    function doTagsNeedUpdate(tag, added){
        if(added){
            const exists = tagNames.find( name => name === tag)
            if(!exists) setTagNames( oldNames => [...oldNames, tag])
        }
        else {
            const tagObj = tags[tag]
            if(!tagObj.length || tagObj.length === 1){
                const filtered = tagNames.filter( name => name !== tag)
                setTagNames(filtered)
            }
        }
    }

    return (
        <>
            <ul>
                {
                    likes && tagNames?
                    tagNames.map(tag => <li key={tag}> {tag} </li>)
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
                                setTags={setTags}
                                doTagsNeedUpdate={doTagsNeedUpdate}
                            />
                        )
                    })
                }
            </ul>
        </>
    )
}

export default ProfileMovieGrid