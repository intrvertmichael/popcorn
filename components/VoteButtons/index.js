import { useGetFirebaseUser, useSetFirebaseUser } from '../../context/FirebaseContext'
import styles from '../../styles/VoteButtons.module.css'

import liked_movie from '../../requests/firebase/liked'
import disliked_movie from '../../requests/firebase/disliked'

const VoteButtons = ({movie}) => {
    const firebaseUser = useGetFirebaseUser()
    const setFirebaseUser = useSetFirebaseUser()

    const currently_liked = firebaseUser.liked?.find(m => m.movie_id === movie.id)
    const currently_disliked = firebaseUser.disliked?.find(m => m.movie_id === movie.id)
    const currently_saved = firebaseUser.saved?.find(m => m.movie_id === movie.id)

    const liked_style = currently_liked? {borderColor:'white'} : {}
    const disliked_style = currently_disliked? {borderColor:'white'} : {}
    const saved_style = currently_saved? {borderColor:'white'} : {}


    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Like and Un_Like

    async function likeMovie(){
        await liked_movie( movie, firebaseUser, false )

        setFirebaseUser(current => {
            const updatedLikes = {...current, liked: [...current.liked, {movie_id:movie.id}]}
            return updatedLikes
        })
    }

    async function un_likeMovie(){
        await liked_movie( movie, firebaseUser, true )

        setFirebaseUser(current => {
            const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)

            const tagsObj = current.tags
            const tagsArr = Object.entries(tagsObj)
            tagsArr.forEach( tag => {
                const exists = tag[1].find( id => id === movie.id)
                if(exists){
                    const filtered = tag[1].filter( id => id !== movie.id)
                    tagsObj[tag[0]] = filtered
                }
            })
            const updatedLikes = {...current, liked: filtered, tags: tagsObj}
            return updatedLikes
        })
    }


    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Dislike and Un_Dislike

    async function dislikeMovie(){
        await disliked_movie( movie, firebaseUser, false )

        setFirebaseUser(current => {
            const updatedDisikes = {...current, disliked: [...current.disliked, {movie_id:movie.id}]}
            return updatedDisikes
        })
    }

    async function un_dislikeMovie(){
        await disliked_movie( movie, firebaseUser, true )

        setFirebaseUser(current => {
            const filtered = current.disliked.filter( disliked => disliked.movie_id !== movie.id)
            const updatedDisikes = {...current, disliked: filtered}
            return updatedDisikes
        })
    }


    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Save and Un_Save
    async function saveMovie(){
        console.log("will save movie here")
    }
    async function un_saveMovie(){}
    // saved_movie()


    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Button Handlers

    async function handleLikedButton(){
        if(currently_disliked) await un_dislikeMovie()

        if(currently_liked) await un_likeMovie()
        else await likeMovie()
    }

    async function handleDisikedButton(){
        if(currently_liked) await un_likeMovie()

        if(currently_disliked) await un_dislikeMovie()
        else dislikeMovie()
    }

    async function handleSaveButton(){
        if(currently_liked) await un_likeMovie()
        if(currently_disliked) await un_dislikeMovie()

        if(currently_saved) await un_saveMovie()
        else saveMovie()

    }


    return (
        <>
            <button
                onClick={handleLikedButton}
                className={styles.voting_buttons}
                style={liked_style}
            >👍</button>

            <button
                onClick={handleSaveButton}
                className={styles.voting_buttons}
                style={saved_style}
            >☆</button>
            {/* ★ */}

            <button
                onClick={handleDisikedButton}
                className={styles.voting_buttons}
                style={disliked_style}
            >👎</button>
        </>
    )
}

export default VoteButtons