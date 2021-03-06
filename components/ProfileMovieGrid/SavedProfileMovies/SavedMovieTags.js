import styles from '../../../styles/ProfileMovieGrid.module.css'
import { useState } from 'react'
import {
	useGetFirebaseUser,
	useSetFirebaseUser,
} from '../../../context/FirebaseContext'
import { add_tag, remove_tag } from '../../../requests/firebase/tags'

const SavedMovieTags = ({ movie }) => {
	const firebaseUser = useGetFirebaseUser()
	const setFirebaseUser = useSetFirebaseUser()

	const [tagInput, setTagInput] = useState(false)
	const [tagText, setTagText] = useState(false)

	let tagsArr = []
	const entries = firebaseUser.tags?.saved
		? Object.entries(firebaseUser.tags?.saved)
		: []
	if (entries.length > 0) {
		tagsArr = entries.filter((tag) => {
			const exists = tag[1].length
				? tag[1]?.find((tag) => tag === movie.id)
				: tag[1] === movie.id
			if (exists) return true
		})
	}

	const tagsUsed = tagsArr.map((tag) => tag[0])

	async function addingTag(e) {
		e.preventDefault()
		setTagInput(false)
		const tagArr = firebaseUser.tags?.saved
			? Object.keys(firebaseUser.tags?.saved)
			: []
		const exists = tagArr?.find((tag) => tag === tagText)

		if (!exists) {
			setFirebaseUser((current) => {
				const newObj = {
					...current,
					tags: {
						...current.tags,
						saved: {
							...current.tags.saved,
							[tagText]: [movie.id],
						},
					},
				}
				return newObj
			})

			await add_tag(tagText, movie.id, firebaseUser, true)
		} else {
			setFirebaseUser((current) => {
				const newObj = {
					...current,
					tags: {
						...current.tags,
						saved: {
							...current.tags.saved,
							[tagText]: [...current.tags.saved[tagText], movie.id],
						},
					},
				}
				return newObj
			})

			await add_tag(tagText, movie.id, firebaseUser, true)
		}
	}

	async function removingTag(e) {
		e.preventDefault()
		const tag = e.target.innerHTML
		const message = `Are you sure you want to remove ${tag} tag from ${movie.original_title}?`

		if (confirm(message)) {
			setFirebaseUser((current) => {
				const filtered = current.tags?.saved[tag].filter(
					(objtag) => objtag !== movie.id,
				)

				let newObj
				if (filtered.length > 0) {
					newObj = {
						...current,
						tags: {
							...current.tags,
							saved: {
								...current.tags.saved,
								[tag]: filtered,
							},
						},
					}

					return newObj
				} else {
					delete current.tags.saved[tag]
					newObj = {
						...current,
						tags: {
							...current.tags,
							saved: {
								...current.tags.saved,
							},
						},
					}

					return newObj
				}
			})

			await remove_tag(tag, movie.id, firebaseUser, true)
		}
	}

	return (
		<ul className={styles.tags}>
			{tagsUsed?.map((tag) => {
				return (
					<li key={tag} onClick={removingTag}>
						{tag}
					</li>
				)
			})}

			{tagInput ? (
				<li className={styles.tag_input_li}>
					<form onSubmit={addingTag}>
						<input
							type='text'
							autoFocus
							className={styles.tag_input}
							onChange={(e) => setTagText(e.target.value)}
						/>
					</form>
					<button onClick={() => setTagInput(false)}>x</button>
				</li>
			) : (
				<li className={styles.tag_btn} onClick={() => setTagInput(true)}>
					add tag
				</li>
			)}
		</ul>
	)
}

export default SavedMovieTags
