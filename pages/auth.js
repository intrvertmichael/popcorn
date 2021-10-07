import { useEffect, useState } from "react";
import styles from '../styles/Auth.module.css'

import Header from '../components/Header'
import AuthForm from "../components/AuthForm";

import { useGetFirebaseUser } from "../context/FirebaseContext";
import { useRouter } from 'next/router'

import LikedProfileMovies from "../components/ProfileMovieGrid/LikedProfileMovies";
import DislikedProfileMovies from "../components/ProfileMovieGrid/DislikedProfileMovies";

const Auth = () => {
    const router = useRouter()

    const firebaseUser = useGetFirebaseUser()

    const [viewingLikes, setViewingLikes] = useState(true)
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
            if(firebaseUser.liked){
                Promise.all(firebaseUser.liked.map( async movie => {
                    return await fetch_movie(movie.movie_id)
                })).then( result => setLikedMovies(result))
            }

            // getting the disliked movies
            if(firebaseUser.disliked){
                Promise.all(firebaseUser.disliked.map( async movie => {
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

                {
                    viewingLikes?
                    <>
                        <h3>Liked Movies ({likedMovies?.length})</h3>
                        <a onClick={()=> setViewingLikes(false)}>
                            <h3>Disliked Movies ({dislikedMovies?.length})</h3>
                        </a>
                    </>
                    :
                    <>
                        <a onClick={()=> setViewingLikes(true)}>
                            <h3>Liked Movies ({likedMovies?.length})</h3>
                        </a>
                        <h3>Disliked Movies ({dislikedMovies?.length})</h3>
                    </>
                }

                {
                    viewingLikes?
                    <LikedProfileMovies
                        likes={true}
                        movies={likedMovies}
                    />
                    :
                    <DislikedProfileMovies
                        likes={false}
                        movies={dislikedMovies}
                    />
                }

            </div>
        </div>
    )
}

export default Auth