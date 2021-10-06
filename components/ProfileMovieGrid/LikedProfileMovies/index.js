
import { useEffect, useState } from 'react';
import styles from '../../../styles/ProfileMovieGrid.module.css'

import { useGetFirebaseUser } from "../../../context/FirebaseContext";

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
            setTags(firebaseUser.tags)
            setTagNames(Object.keys(firebaseUser.tags))
        }

        getTags()

    }, [firebaseUser])

    useEffect( () => {
        if(filter){
            const tagArr = tags[filter]
            const filtered = movies.filter( movie => {
                const exists = tagArr?.length? tagArr.find( id => id === movie.id)  : tagArr === movie.id
                return exists? true : false
            })
            setFilteredMovies(filtered)
        } else {
            setFilteredMovies(movies)
        }
    }, [filter, movies, tags])

    if(movies?.length === 0) return false

    async function doTagsNeedUpdate(tag, added){
        const movie_tags = Object.entries(firebaseUser.tags)

        if(added){
            const exists = tagNames.find( name => name === tag)
            if(!exists) setTagNames( oldNames => [...oldNames, tag])
        }
        else {
            const fb_tag_names = movie_tags.map( tag => tag[0])
            setTagNames(fb_tag_names)
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