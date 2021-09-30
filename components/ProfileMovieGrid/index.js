import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/ProfileMovieGrid.module.css'
import {createMovieImageURL} from '../../requests/movie.api'
import { useGetFirebaseUser } from "../../context/FirebaseContext";

import removeLiked from './firebase/liked'
import removeDisliked from './firebase/disliked'

const ProfileMovieGrid = ({movies, set, likes}) => {
    const firebaseUser = useGetFirebaseUser()

    if(movies.length === 0) return false

    async function tagClicked(){
        console.log("tag button was clicked")
    }


    return (
        <ul className={styles.genre_movies}>
            {
                movies.map( movie => {
                    const poster = createMovieImageURL(movie.poster_path)
                    console.log(movie)
                    const list = likes? "Likes" : "Dislikes"
                    const message = `Are you sure you want to remove ${movie.original_title} from ${list} ?`

                    return (
                        <li key={movie.id}>
                            <Link href={'/movie/' + movie.id}>
                                <a>
                                    <Image src={poster} alt={movie.original_title} width="144" height="216" />
                                </a>
                            </Link>

                            <div className={styles.movie_caption}>
                                {
                                    likes?
                                    <button
                                        className={styles.remove}
                                        onClick={() =>{
                                            const result = window.confirm(message);
                                            if(result){
                                                removeLiked(movie, firebaseUser)
                                                const filtered = movies.filter( m => m.id !== movie.id)
                                                set(filtered)
                                            }
                                    }}> Remove from Likes </button>
                                    :
                                    <button
                                        className={styles.remove}
                                        onClick={() => {
                                            const result = window.confirm(message);
                                            if(result){
                                                removeDisliked(movie, firebaseUser)
                                                const filtered = movies.filter( m => m.id !== movie.id)
                                                set(filtered)
                                            }
                                    }}> Remove from Dislikes </button>
                                }

                                <Link href={'/movie/' + movie.id}>
                                    <a>
                                        <h4>{movie.original_title}</h4>
                                    </a>
                                </Link>

                                {
                                    likes?
                                    <ul className={styles.tags}>
                                        <li>tag 1</li>
                                        <li>tag 2</li>
                                        <li>tag 3</li>
                                        <li>tag 4</li>
                                        <li>tag 5</li>
                                        <li>tag 6</li>
                                        <li>tag 7</li>
                                        <li>tag 8</li>
                                        <li>tag 9</li>
                                        <li>tag 10</li>
                                        <li>tag 11</li>
                                        <li>tag 12</li>
                                        <li>tag 13</li>
                                        <li>tag 14</li>
                                        <li>tag 15</li>
                                        <li>tag 16</li>
                                        <li>tag 17</li>
                                        <li>tag 18</li>
                                        <li>tag 19</li>
                                        <li>tag 20</li>
                                        <li>tag 21</li>

                                        {
                                            // show button to add tag if there's less than 20 tags
                                        }
                                        <li
                                            className={styles.tag_btn}
                                            onClick={tagClicked}
                                        >
                                            add tag
                                        </li>
                                    </ul>
                                    :
                                    movie.tagline
                                }
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default ProfileMovieGrid