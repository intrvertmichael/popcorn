
import { useEffect, useState } from 'react';
import styles from '../../../styles/ProfileMovieGrid.module.css'

import { useGetFirebaseUser } from "../../../context/FirebaseContext";
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'

import LikedMovie from './LikedMovie';
import TagFilter from './TagFilter';

const LikedProfileMovies = ({movies, set}) => {
    const firebaseUser = useGetFirebaseUser()
    const [tags, setTags] = useState()
    const [tagNames, setTagNames] = useState([])
    const [filter, setFilter] = useState()
    const [filteredMovies, setFilteredMovies] = useState()

    useEffect( () => {
        async function getTags(){
            const {current_tags} = await getCurrentFirebaseMovies(firebaseUser)
            setTags(current_tags)
            setTagNames(Object.keys(current_tags))
        }

        getTags()

    }, [firebaseUser])

    useEffect( () => {
        if(filter){
            const tagArr = tags[filter]
            const filtered = movies.filter( movie => {
                const exists = tagArr.length? tagArr.find( id => id === movie.id)  : tagArr === movie.id
                return exists? true : false
            })
            setFilteredMovies(filtered)
        } else {
            setFilteredMovies(movies)
        }
    }, [filter, movies, tags])

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
            <TagFilter tagNames={tagNames} filter={filter} setFilter={setFilter}/>

            <ul className={styles.genre_movies}>
                {
                    filteredMovies?.map( movie => {
                        return (
                            <LikedMovie
                                key={movie.id}
                                movie={movie}
                                movies={filteredMovies}
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