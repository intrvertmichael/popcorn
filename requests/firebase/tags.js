import firebase from './config'
const db = firebase.firestore()

async function add_tag(tagText, movie_id, firebaseUser, saved){
    const fb_tags_res = await db.collection("tags").doc(firebaseUser.uid).get()
    const fb_tags = fb_tags_res.data()


    async function add_tag_to_saved(){
        const saved_tags = fb_tags.saved? Object.keys(fb_tags.saved) : []
        const exists_in_saved_tags = saved_tags?.find( tag => tag === tagText)

        let updatedTags
        if(exists_in_saved_tags) updatedTags = [...fb_tags?.saved[tagText], movie_id]
        else updatedTags = [movie_id]

        await db.collection("tags").doc(firebaseUser.uid).update({
            saved: {
                ...fb_tags?.saved,
                [tagText]: updatedTags
            }
        })
    }

    async function add_tag_to_liked(){
        const liked_tags = fb_tags.liked? Object.keys(fb_tags.liked) : []
        const exists_in_liked_tags = liked_tags?.find( tag => tag === tagText)

        let updatedTags
        if(exists_in_liked_tags) updatedTags = [...fb_tags?.liked[tagText], movie_id]
        else updatedTags = [movie_id]

        await db.collection("tags").doc(firebaseUser.uid).update({
            liked: {
                ...fb_tags?.liked,
                [tagText]: updatedTags
            }
        })
    }

    if(saved) add_tag_to_saved()
    else add_tag_to_liked()
}


async function remove_tag(tagText, movie_id, firebaseUser, saved){
    const fb_tags_res = await db.collection("tags").doc(firebaseUser.uid).get()
    const fb_tags = fb_tags_res.data()

    async function remove_tag_from_saved(){
        const fb_saved = fb_tags.saved
        const filtered_list = fb_saved[tagText]?.filter( id => id !== movie_id)

        let savedObj
        if(filtered_list.length > 0) savedObj = { ...fb_tags.saved, [tagText]: filtered_list }
        else {
            delete fb_saved[tagText]
            savedObj = fb_saved
        }

        await db.collection("tags").doc(firebaseUser.uid).update({
            saved: savedObj
        })
    }

    async function remove_tag_from_liked(){
        const fb_liked = fb_tags.liked
        const filtered_list = fb_liked[tagText]?.filter( id => id !== movie_id)

        let savedObj
        if(filtered_list.length > 0) savedObj = { ...fb_tags.liked, [tagText]: filtered_list }
        else {
            delete fb_liked[tagText]
            savedObj = fb_liked
        }

        await db.collection("tags").doc(firebaseUser.uid).update({
            liked: savedObj
        })
    }

    if(saved) remove_tag_from_saved()
    else remove_tag_from_liked()
}


async function remove_multiple_tags(movie_id, firebaseUser, saved){
    const fb_tags_res = await db.collection("tags").doc(firebaseUser.uid).get()
    const fb_tags = fb_tags_res.data()


    async function remove_multiple_from_saved() {
        // const fb_liked = fb_tags.liked
        // const filtered_list = fb_liked[tagText]?.filter( id => id !== movie_id)

        // let savedObj
        // if(filtered_list.length > 0) savedObj = { ...fb_tags.liked, [tagText]: filtered_list }
        // else {
        //     delete fb_liked[tagText]
        //     savedObj = fb_liked
        // }

        // await db.collection("tags").doc(firebaseUser.uid).update({
        //     liked: savedObj
        // })
        const tagArray = Object.entries(fb_tags)

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

    async function remove_multiple_from_liked() {}

    if(saved) remove_multiple_from_saved()
    else remove_multiple_from_liked()
}

export {add_tag, remove_tag, remove_multiple_tags}