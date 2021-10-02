
import { useEffect, useState } from 'react';
import styles from '../../../styles/ProfileMovieGrid.module.css'

import { useGetFirebaseUser } from "../../../context/FirebaseContext";
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'

import LikedMovie from './LikedMovie';

const LikedProfileMovies = ({movies, set}) => {
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

    if(movies?.length === 0) return false

    async function doTagsNeedUpdate(tag, added){
        const {current_tags} = await getCurrentFirebaseMovies(firebaseUser)
        const tagObj = current_tags[tag]

        if(added){
            const exists = tagNames.find( name => name === tag)
            if(!exists) setTagNames( oldNames => [...oldNames, tag])
        }
        else {
            if(!tagObj.length || tagObj.length === 1){
                const filtered = tagNames.filter( name => name !== tag)
                setTagNames(filtered)
            }
        }
    }

    return (
        <>
            <ul>
                { tagNames?.map(tag => <li key={tag}> {tag} </li>) }
            </ul>

            <ul className={styles.genre_movies}>
                {
                    movies?.map( movie => {
                        return (
                            <LikedMovie
                                key={movie.id}
                                movie={movie}
                                movies={movies}
                                set={set}
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

export default LikedProfileMovies