import { useState } from "react"
import { useRouter } from "next/router"

import firebase from "utils/firebase/config"

const db = firebase.firestore()

const styles = {
  section: "p-5 flex flex-1 flex-col gap-2",
  sectionHeader: "text-xl font-bold",
  formLabel: "text-neutral-400",
  formInput: "bg-neutral-400 py-1 px-2 text-black rounded",
  submit: "bg-neutral-800 text-white mt-3 py-3 rounded",
}

export default function AuthForm() {
  const router = useRouter()

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

      const user = userCredential.user
      localStorage.setItem("user_id", user.uid)
      router.reload()
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

      const user = userCredential.user
      localStorage.setItem("user_id", user.uid)

      await db.collection("genres").doc(user.uid).set({})

      await db
        .collection("movies")
        .doc(user.uid)
        .set({ liked: [], saved: [], disliked: [] })

      await db.collection("tags").doc(user.uid).set({ liked: [], saved: [] })

      router.reload()
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='p-5'>
      {error && (
        <div className='flex flex-col items-end border border-red-500 rounded'>
          <button
            onClick={() => setError(null)}
            className='px-3 py-1 text-red-500'
          >
            X
          </button>

          <p className='w-full pb-8 text-center'>{error}</p>
        </div>
      )}

      <div className='flex w-full p-5'>
        <form
          className={styles.section + " border-r"}
          onSubmit={loginSubmitted}
        >
          <h2 className={styles.sectionHeader}>Log In</h2>

          <label className={styles.formLabel}> Email: </label>
          <input
            type='email'
            onChange={e => setEmail(e.target.value)}
            className={styles.formInput}
          />

          <label className={styles.formLabel}> Password: </label>
          <input
            type='password'
            onChange={e => setPassword(e.target.value)}
            className={styles.formInput}
          />

          <input type='submit' value='Log In' className={styles.submit} />
        </form>

        <form onSubmit={registerSubmitted} className={styles.section}>
          <h2 className={styles.sectionHeader}>New User Registration</h2>

          <label className={styles.formLabel}>
            Email: (Does NOT have to be a real email 🙂)
          </label>
          <input
            type='email'
            onChange={e => setEmail(e.target.value)}
            className={styles.formInput}
          />

          <label className={styles.formLabel}> Password: </label>
          <input
            type='password'
            onChange={e => setPassword(e.target.value)}
            className={styles.formInput}
          />

          <label className={styles.formLabel}> Confirm Password: </label>
          <input
            type='password'
            onChange={e => setPasswordConfirm(e.target.value)}
            className={styles.formInput}
          />

          <input type='submit' value='Register' className={styles.submit} />
        </form>
      </div>
    </div>
  )
}
