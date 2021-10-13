import firebase from './config'
const db = firebase.firestore()

async function add_tag(tagText, movie_id, firebaseUser, saved) {
	const fb_tags_res = await db.collection('tags').doc(firebaseUser.uid).get()
	const fb_tags = fb_tags_res.data()

	async function add_tag_to_saved() {
		const saved_tags = fb_tags.saved ? Object.keys(fb_tags.saved) : []
		const exists_in_saved_tags = saved_tags?.find((tag) => tag === tagText)

		let updatedTags
		if (exists_in_saved_tags)
			updatedTags = [...fb_tags?.saved[tagText], movie_id]
		else updatedTags = [movie_id]

		await db
			.collection('tags')
			.doc(firebaseUser.uid)
			.update({
				saved: {
					...fb_tags?.saved,
					[tagText]: updatedTags,
				},
			})
	}

	async function add_tag_to_liked() {
		const liked_tags = fb_tags.liked ? Object.keys(fb_tags.liked) : []
		const exists_in_liked_tags = liked_tags?.find((tag) => tag === tagText)

		let updatedTags
		if (exists_in_liked_tags)
			updatedTags = [...fb_tags?.liked[tagText], movie_id]
		else updatedTags = [movie_id]

		await db
			.collection('tags')
			.doc(firebaseUser.uid)
			.update({
				liked: {
					...fb_tags?.liked,
					[tagText]: updatedTags,
				},
			})
	}

	if (saved) add_tag_to_saved()
	else add_tag_to_liked()
}

async function remove_tag(tag_name, movie_id, firebaseUser, saved) {
	const fb_tags_res = await db.collection('tags').doc(firebaseUser.uid).get()
	const fb_tags = fb_tags_res.data()

	async function remove_tag_from_saved() {
		const fb_saved = fb_tags.saved
		const filtered_list = fb_saved[tag_name]?.filter((id) => id !== movie_id)

		let savedObj
		if (filtered_list.length > 0) {
			savedObj = { ...fb_saved, [tag_name]: filtered_list }
		} else {
			delete fb_saved[tag_name]
			savedObj = fb_saved
		}

		await db.collection('tags').doc(firebaseUser.uid).update({
			saved: savedObj,
		})
	}

	async function remove_tag_from_liked() {
		const fb_liked = fb_tags.liked
		const filtered_list = fb_liked[tag_name]?.filter((id) => id !== movie_id)

		let savedObj
		if (filtered_list.length > 0) {
			savedObj = { ...fb_tags.liked, [tag_name]: filtered_list }
		} else {
			delete fb_liked[tag_name]
			savedObj = fb_liked
		}

		await db.collection('tags').doc(firebaseUser.uid).update({
			liked: savedObj,
		})
	}

	if (saved) await remove_tag_from_saved()
	else await remove_tag_from_liked()
}

async function remove_multiple_tags(movie_id, firebaseUser, saved) {
	const fb_tags_res = await db.collection('tags').doc(firebaseUser.uid).get()
	const fb_tags = fb_tags_res.data()

	async function remove_multiple_from_saved() {
		const tagArray = Object.entries(fb_tags.saved)

		for (const tag of tagArray) {
			const tag_name = tag[0]
			const tag_arr = tag[1]

			const exists = tag_arr?.find((id) => id === movie_id)
			if (exists) await remove_tag(tag_name, movie_id, firebaseUser, true)
		}
	}

	async function remove_multiple_from_liked() {
		const tagArray = Object.entries(fb_tags.liked)

		for (const tag of tagArray) {
			const tag_name = tag[0]
			const tag_arr = tag[1]

			const exists = tag_arr?.find((id) => id === movie_id)
			if (exists) await remove_tag(tag_name, movie_id, firebaseUser, false)
		}
	}

	if (saved) remove_multiple_from_saved()
	else remove_multiple_from_liked()
}

export { add_tag, remove_tag, remove_multiple_tags }
