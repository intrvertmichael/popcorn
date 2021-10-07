import { useGetFirebaseUser, useSetFirebaseUser } from '../../context/FirebaseContext'

import liked_movie from '../../requests/firebase/liked'
import disliked_movie from '../../requests/firebase/disliked'

const VoteButtons = ({movie}) => {
    const firebaseUser = useGetFirebaseUser()
    const setFirebaseUser = useSetFirebaseUser()

    async function handleLikedButton(){
        const currently_liked = firebaseUser.liked?.find(m => m.movie_id === movie.id)
        const currently_disliked = firebaseUser.disliked?.find(m => m.movie_id === movie.id)

        if(currently_disliked){
            await disliked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )

            setFirebaseUser(current => {
                const filtered = current.disliked.filter( disliked => disliked.movie_id !== movie.id)
                const updatedDisikes = {...current, disliked: filtered}
                return updatedDisikes
            })
        }

        if(currently_liked) {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )
            setFirebaseUser(current => {
                const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)
                const updatedLikes = {...current, liked: filtered}
                return updatedLikes
            })
        }

        else {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                false
            )
            setFirebaseUser(current => {
                const updatedLikes = {...current, liked: [...current.liked, {movie_id:movie.id}]}
                return updatedLikes
            })
        }
    }

    async function handleDisikedButton(){
        const currently_liked = firebaseUser.liked?.find(m => m.movie_id === movie.id)
        const currently_disliked = firebaseUser.disliked?.find(m => m.movie_id === movie.id)

        if(currently_liked) {
            await liked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )

            setFirebaseUser(current => {
                const filtered = current.liked.filter( liked => liked.movie_id !== movie.id)
                const updatedLikes = {...current, liked: filtered}
                return updatedLikes
            })
        }

        if(currently_disliked) {
            await disliked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                true
            )

            setFirebaseUser(current => {
                const filtered = current.disliked.filter( disliked => disliked.movie_id !== movie.id)
                const updatedDisikes = {...current, disliked: filtered}
                return updatedDisikes
            })
        }

        else {

            await disliked_movie(
                movie,
                firebaseUser.uid,
                firebaseUser.liked,
                firebaseUser.disliked,
                false
            )

            setFirebaseUser(current => {
                const updatedDisikes = {...current, disliked: [...current.disliked, {movie_id:movie.id}]}
                return updatedDisikes
            })
        }
    }

    return (
        <>
            <button onClick={handleLikedButton}>
                👍
            </button>

            <button onClick={handleDisikedButton}>
                👎
            </button>
        </>
    )
}

export default VoteButtons