import firebase from './config'
const db = firebase.firestore()

async function add_tag(tagText, movie_id, firebaseUser){
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


async function remove_tag(tagText, movie_id, firebaseUser){

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


async function remove_multiple_tags(movie_id, firebaseUser){
    const tagArray = Object.entries(firebaseUser.tags)

    tagArray.forEach( async tag => {
        const exists = tag[1].find( id => id === movie_id)

        if(exists){
            const filtered = tag[1].filter( id => id !== movie_id)

            await db.collection("tags").doc(firebaseUser.uid).update({
                [tag[0]]: filtered.length > 0 ? filtered : firebase.firestore.FieldValue.delete()
            })
        }
    })
}

export {add_tag, remove_tag, remove_multiple_tags}