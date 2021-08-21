
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Header from '../components/Header'

import { useGetFirebaseUser } from "../context/FirebaseContext";
import firebase from "../requests/firebase/config";

import ProfileMovieGrid from '../components/ProfileMovieGrid'
import styles from '../styles/Auth.module.css'

const Auth = () => {
    const firebaseUser = useGetFirebaseUser()
    const [likedMovies, setLikedMovies] = useState()
    const [dislikedMovies, setDisLikedMovies] = useState()

    const uiConfig = {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        signInSuccessUrl: '/',
        callbacks: {
            signInSuccessWithAuthResult: authResult => {
                console.log("signin was successful")
                localStorage.setItem('user_id', authResult.user.uid)
                return true
            }
        }
    }

    async function fetch_movie(id){
        const res = await fetch('/api/firebase/movie', {
            method: 'GET',
            headers: {
                movie_id: id,
            }
        })
        const data = await res.json()
        return data
    }

    useEffect( ()=> {

        if(firebaseUser){
            console.log("there is a firebase user")

            // getting the liked movies
            if(firebaseUser.liked){
                Promise.all(firebaseUser.liked.map( async (movie, key) => {
                    return await fetch_movie(movie.movie_id)
                })).then( result => setLikedMovies(result))
            }

            // getting the disliked movies
            if(firebaseUser.disliked){
                Promise.all(firebaseUser.disliked.map( async (movie, key) => {
                    return await fetch_movie(movie.movie_id)
                })).then( result => setDisLikedMovies(result))
            }
        }

    }, [firebaseUser])

    if(!firebaseUser) {
        return(
            <div>
                <Header />
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        )
    }

    return (
        <div>
            <Header />

            <div className={styles.auth}>
                <h1>Profile</h1>

                <div className={styles.personal_info}>
                    <p> <b>Display Name:</b> {firebaseUser.displayname}</p>
                    <p> <b>Email:</b> {firebaseUser.email}</p>
                    <p> <b>UserID:</b> {firebaseUser.uid}</p>
                </div>

                {
                    likedMovies &&
                    <ProfileMovieGrid title='Liked Movies' movies={likedMovies} />
                }

                {
                    dislikedMovies &&
                    <ProfileMovieGrid title='Disliked Movies' movies={dislikedMovies}/>
                }

            </div>
        </div>
    )
}

export default Auth