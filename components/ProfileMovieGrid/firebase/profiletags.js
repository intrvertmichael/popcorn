import firebase from '../../../requests/firebase/config'
const db = firebase.firestore()

async function addTag(tagText, movie_id, firebaseUser){

    const usedTags = Object.keys(firebaseUser.tags)
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

async function removeTag(tagText, movie_id, firebaseUser){

    const fb_item = firebaseUser.tags[tagText]

    let updatedList
    if(fb_item.length > 1){
        updatedList = fb_item.filter( id => id !== movie_id)
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: updatedList
        })

        console.log('tag has other items | removing tag from list...')
    }
    else {
        delete current_tags[tagText]
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: firebase.firestore.FieldValue.delete()
        })

        console.log('tag is empty now | deleting list...')
    }

}

export {addTag, removeTag}