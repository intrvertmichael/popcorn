import { useState } from 'react'
import Header from '../Header'
import styles from '../../styles/AuthForm.module.css'

import firebase from '../../requests/firebase/config'
const db = firebase.firestore()

const AuthForm = ({ router }) => {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [passwordConfirm, setPasswordConfirm] = useState()
	const [error, setError] = useState()

	async function loginSubmitted(e) {
		e.preventDefault()

		try {
			const userCredential = await firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
			var user = userCredential.user
			localStorage.setItem('user_id', user.uid)
			router.push('/')
		} catch (error) {
			setError(error.message)
		}
	}

	async function registerSubmitted(e) {
		e.preventDefault()
		if (password !== passwordConfirm)
			return setError("The passwords don't match")

		try {
			const userCredential = await firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
			var user = userCredential.user
			localStorage.setItem('user_id', user.uid)
			await db.collection('genres').doc(user.uid).set({})
			await db
				.collection('movies')
				.doc(user.uid)
				.set({ liked: [], saved: [], disliked: [] })
			await db.collection('tags').doc(user.uid).set({ liked: [], saved: [] })
			router.push('/')
		} catch (error) {
			setError(error.message)
		}
	}

	return (
		<>
			<Header />

			{error ? (
				<div className={styles.error}>
					<button onClick={() => setError(null)}>X</button>
					<p>{error}</p>
				</div>
			) : (
				''
			)}

			<div className={styles.forms}>
				<form className={styles.login} onSubmit={loginSubmitted}>
					<h2>Returning User Log In</h2>
					<label> Email: </label>
					<input type='email' onChange={(e) => setEmail(e.target.value)} />
					<label> Password: </label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input type='submit' value='Log In' />
				</form>

				<form className={styles.register} onSubmit={registerSubmitted}>
					<h2>New User Registration</h2>
					<p></p>
					<label>Email: (Does NOT have to be a real email 🙂)</label>
					<input type='email' onChange={(e) => setEmail(e.target.value)} />
					<label> Password: </label>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<label> Confirm Password: </label>
					<input
						type='password'
						onChange={(e) => setPasswordConfirm(e.target.value)}
					/>
					<input type='submit' value='Register' />
				</form>
			</div>
		</>
	)
}

export default AuthForm
