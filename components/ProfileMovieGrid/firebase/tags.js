import firebase from '../../../requests/firebase/config'
import getCurrentFirebaseMovies from '../../Movie/firebase/_get'
const db = firebase.firestore()

async function addTag(tagText, movie_id, firebaseUser){
    const {current_tags} = await getCurrentFirebaseMovies(firebaseUser)

    const usedTags = Object.keys(current_tags)
    const exists = usedTags.find( tag => tag === tagText)

    if(exists){
        const updatedTags = current_tags[tagText].length ?
        [...current_tags[tagText], movie_id]
        : [current_tags[tagText], movie_id]

        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: updatedTags
        })

        console.log('tag exists | adding to tag list...')
    }
    else {
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: movie_id
        })

        console.log('tag did not exists | adding tag...')
    }
}

export default addTag