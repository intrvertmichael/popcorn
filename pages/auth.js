import { useEffect, useState } from "react";
import styles from '../styles/Auth.module.css'

import Header from '../components/Header'
import AuthForm from "../components/AuthForm";
import ProfileMovieGrid from '../components/ProfileMovieGrid'

import { useGetFirebaseUser } from "../context/FirebaseContext";
import { useRouter } from 'next/router'

const Auth = () => {
    const router = useRouter()

    const firebaseUser = useGetFirebaseUser()
    const [likedMovies, setLikedMovies] = useState()
    const [dislikedMovies, setDisLikedMovies] = useState()

    async function fetch_movie(id){
        const movie_res = await fetch('/api/movie', {
            method: 'GET',
            headers: { movie_id: id }
        })

        const movie_data = await movie_res.json()
        return movie_data
    }

    useEffect( ()=> {
        if(firebaseUser){

            // getting the liked movies
            if(firebaseUser.movies && firebaseUser.movies && firebaseUser.movies.liked){
                Promise.all(firebaseUser.movies.liked.map( async (movie, key) => {
                    return await fetch_movie(movie.movie_id)
                })).then( result => setLikedMovies(result))
            }

            // getting the disliked movies
            if(firebaseUser.movies && firebaseUser.movies.disliked){
                Promise.all(firebaseUser.movies.disliked.map( async (movie, key) => {
                    return await fetch_movie(movie.movie_id)
                })).then( result => setDisLikedMovies(result))
            }
        }

    }, [firebaseUser])

    if(!firebaseUser) return <AuthForm router={router}/>

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