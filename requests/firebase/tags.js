import firebase from './config'
const db = firebase.firestore()

async function addTag(tagText, movie_id, firebaseUser){
    const usedTags = Object.keys(firebaseUser.tags)
    const exists = usedTags?.find( tag => tag === tagText)

    if(exists){
        const updatedTags = firebaseUser.tags[tagText].length ?
        [...firebaseUser.tags[tagText], movie_id]
        : [firebaseUser.tags[tagText], movie_id]

        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: updatedTags
        })
    }
    else {
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: [movie_id]
        })
    }
}




async function removeTag(tagText, movie_id, firebaseUser){

    const fb_item = firebaseUser.tags[tagText]

    if(fb_item){
        const updatedList = fb_item.filter( id => id !== movie_id)
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: updatedList
        })
    }
    else {
        await db.collection("tags").doc(firebaseUser.uid).update({
            [tagText]: firebase.firestore.FieldValue.delete()
        })
    }

}


async function removeMultipleTags(){

}

export {addTag, removeTag, removeMultipleTags}