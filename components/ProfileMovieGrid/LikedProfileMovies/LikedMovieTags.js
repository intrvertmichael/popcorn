import styles from '../../../styles/ProfileMovieGrid.module.css'
import { useEffect, useState } from 'react';
import { useGetFirebaseUser, useSetFirebaseUser } from "../../../context/FirebaseContext";
import {addTag, removeTag} from '../../../requests/firebase/tags';

const LikedMovieTags = ({movie}) => {
    const firebaseUser = useGetFirebaseUser()
    const setFirebaseUser = useSetFirebaseUser()

    const [tagInput, setTagInput] = useState(false)
    const [tagText, setTagText] = useState(false)
    const [tagsUsed, setTagsUsed] = useState()

    useEffect( () => {
        const tagArr = firebaseUser.tags? Object.entries(firebaseUser.tags) : []
        const containsTag = tagArr.filter( tag => {
            let hasTag
            tag[1].length?
            hasTag = tag[1].find( movie_id => movie_id === movie.id)
            : hasTag = tag[1] === movie.id

            return hasTag
        })

        const tagNames = containsTag.map( tagArr => tagArr[0])
        setTagsUsed(tagNames)
    }, [firebaseUser.tags, movie.id])

    async function addingTag(e){
        e.preventDefault()
        setTagInput(false)
        const tagArr = firebaseUser.tags? Object.entries(firebaseUser.tags) : []
        const exists = tagArr?.find(tag => tag === tagText)

        if(!exists){
            addTag(tagText, movie.id, firebaseUser)
            setTagsUsed( current => current.concat(tagText))
            setFirebaseUser( current => {
                console.log( '-> current', current )
            })
        }
    }

    async function removingTag(e){
        e.preventDefault()
        const tag = e.target.innerHTML
        const message = `Are you sure you want to remove ${tag} tag from ${movie.original_title}?`

        if(confirm(message)){
            await removeTag(tag, movie.id, firebaseUser)
            const filtered = tagsUsed.filter( objtag => objtag !== tag)
            setTagsUsed(filtered)
        }
    }

    return (
        <ul className={styles.tags}>
            {
                tagsUsed?.map( tag => {
                    return <li key={tag} onClick={removingTag}>{tag}</li>
                })
            }

            {
                tagInput?
                <li className={styles.tag_input_li}>
                    <form onSubmit={addingTag}>
                        <input
                            type='text'
                            autoFocus
                            className={styles.tag_input}
                            onChange={e => setTagText(e.target.value)}
                        />
                    </form>
                    <button onClick={()=>setTagInput(false)}>x</button>
                </li>
                :
                <li
                    className={styles.tag_btn}
                    onClick={()=>setTagInput(true)}
                >
                    add tag
                </li>
            }
        </ul>
    )
}

export default LikedMovieTags;