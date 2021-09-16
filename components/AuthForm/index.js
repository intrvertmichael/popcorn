import { useState } from 'react';
import Header from '../Header'
import styles from '../../styles/AuthForm.module.css'

import firebase from "../../requests/firebase/config_server";

const AuthForm = ({router}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    async function loginSubmitted(e){
        e.preventDefault()

        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password)
        var user = userCredential.user
        localStorage.setItem('user_id', user.uid)
        router.push('/')
    }

    async function registerSubmitted(e){
        e.preventDefault()
        if(password !== passwordConfirm) return console.log("passwords don't match")

        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password)
        var user = userCredential.user;
        localStorage.setItem('user_id', user.uid)
        router.push('/')
    }

    return (
        <>
            <Header />

            <div className={styles.forms}>
                <form className={styles.login} onSubmit={loginSubmitted}>
                    <h2>Log In</h2>
                    <label> Email: </label>
                    <input type='email' onChange={e => setEmail(e.target.value)}/>
                    <label> Password: </label>
                    <input type='password' onChange={e => setPassword(e.target.value)}/>
                    <input type='submit' value="Log In"/>
                </form>

                <form className={styles.register} onSubmit={registerSubmitted}>
                    <h2>Register</h2>
                    <label> Email: </label>
                    <input type='email' onChange={e => setEmail(e.target.value)}/>
                    <label> Password: </label>
                    <input type='password' onChange={e => setPassword(e.target.value)}/>
                    <label> Confirm Password: </label>
                    <input type='password' onChange={e => setPasswordConfirm(e.target.value)}/>
                    <input type='submit' value="Register"/>
                </form>
            </div>
        </>
    )
}

export default AuthForm;