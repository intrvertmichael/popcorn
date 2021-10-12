import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from '../../styles/MovieCollection.module.css'
import Movie from '../Movie'
import { useGetFirebaseUser } from "../../context/FirebaseContext";


const MovieCollection = ({ view, movieList }) => {
    const firebaseUser = useGetFirebaseUser()
    const FBLikedMovies = firebaseUser?.liked
    const FBDisLikedMovies = firebaseUser?.disliked
    const movieBar = useRef(null);


    const [movies, setMovies] = useState([])
    const [movie_image_size, set_movie_image_size] = useState([])

    useEffect( () => {
        const movie_array = []
        movieList.movies?.map( movie => {
            const liked = FBLikedMovies?.find( liked => liked.movie_id === movie.id)
            const disliked = FBDisLikedMovies?.find( liked => liked.movie_id === movie.id)

            if(!disliked) movie_array.push(
                <Movie
                    movie = {movie}
                    key = {movie.id}
                    fb_liked = { liked? true : null}
                />
            )
        })

        setMovies(movie_array)

    }, [FBDisLikedMovies, FBLikedMovies, movieList])


    useEffect(()=>{
        if(typeof window !== "undefined"){
            function setSize(){
                let size
                if(window.innerWidth < 650) size = 33.4
                else if(window.innerWidth < 900) size = 25
                else size = 20

                set_movie_image_size(size)
            }

            window.addEventListener('resize', setSize)
            setSize()
        }
    }, [])


    if(!movieList || movieList.movies?.length === 0) return false

    if(movies?.length === 0) return false

    let ul_classes
    let ul_style
    if(view === 'bar'){
        ul_classes = styles.genre_movies_bar
        const w = movies?.length * movie_image_size
        ul_style = { width: `${w}%` }
    }
    if(view === 'grid'){
        ul_classes = styles.genre_movies_grid
    }

    function handleRMovement(e){
        e.preventDefault()
        movieBar.current.scrollLeft += (movie_image_size * 10)
    }

    function handleLMovement(e){
        e.preventDefault()
        movieBar.current.scrollLeft -= (movie_image_size * 10)
    }

    return (
        <div className={styles.movie_bar}>
            {
                movieList.genreID?
                <Link href={`/genre/${movieList.genreID}`}>
                    <a>
                        <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
                    </a>
                </Link>
                :
                <h3 className={styles.genre_movies_title}> {movieList.title} </h3>
            }


{
    view === 'bar'?
    <div className={styles.movement}>
        <button onClick={handleLMovement}>{'<'}</button>
        <button onClick={handleRMovement}>{'>'}</button>
    </div>
    : ''
}

            <div className={styles.genre_movies_wrapper} ref={movieBar}>
                <ul className={ul_classes} style={ul_style}>
                    {movies}
                </ul>
            </div>
        </div>
    )
}

export default MovieCollection;