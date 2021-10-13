import firebase from './config'
const db = firebase.firestore()

export async function remove_genre_counters(movie_genres, firebaseUser) {
	const fb_genre_res = await db.collection('genres').doc(firebaseUser.uid).get()
	const fb_genres = fb_genre_res.data()

	movie_genres.map(async (genre) => {
		const value = fb_genres[genre] ? fb_genres[genre] : 0
		const counter = parseInt(value)

		await db
			.collection('genres')
			.doc(firebaseUser.uid)
			.update({
				[genre]:
					counter > 1 ? counter - 1 : firebase.firestore.FieldValue.delete(),
			})
	})
}

export async function add_genre_counters(movie_genres, firebaseUser) {
	const fb_genre_res = await db.collection('genres').doc(firebaseUser.uid).get()
	const fb_genres = fb_genre_res.data()

	movie_genres.map(async (genre) => {
		const value = fb_genres[genre] ? fb_genres[genre] : 0
		const counter = parseInt(value)

		await db
			.collection('genres')
			.doc(firebaseUser.uid)
			.update({
				[genre]: counter ? counter + 1 : 1,
			})
	})
}
