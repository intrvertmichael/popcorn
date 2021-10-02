import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/ProfileMovieGrid.module.css'

import {createMovieImageURL} from '../../requests/movie.api'
import { useGetFirebaseUser } from "../../context/FirebaseContext";

import addTag from './firebase/tags';

import removeLiked from './firebase/liked'
import removeDisliked from './firebase/disliked'

const ProfileMovie = ({movie, set, likes, tags}) => {
        const firebaseUser = useGetFirebaseUser()
        const [tagInput, setTagInput] = useState(false)
        const [tagText, setTagText] = useState(false)

        const tagArr = tags? Object.entries(tags) : []

        const tags_used = tagArr.filter( tag => {
            let hasTag
            tag[1].length?
            hasTag = tag[1].find( movie_id => movie_id === movie.id)
            : hasTag = tag[1] === movie.id

            return hasTag
        })

        async function tagSubmitted(e){
            e.preventDefault()
            console.log("tag input has a value of", tagText, "for movie ", movie.original_title)
            setTagInput(false)
            addTag(tagText, movie.id, firebaseUser)
        }

        const poster = createMovieImageURL(movie.poster_path)
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
                            {
                                tags_used.map( tag => <li key={tag[0]}> {tag[0]} </li>)
                            }

                            {
                                // TODO: show button to add tag if there's less than 20 tags
                            }

                            {
                                tagInput?
                                <li className={styles.tag_input_li}>
                                    <form onSubmit={tagSubmitted}>
                                        <input
                                            type='text'
                                            autoFocus
                                            className={styles.tag_input}
                                            onChange={e => setTagText(e.target.value)}
                                        />
                                    </form>
                                    <button onClick={()=>setTagInput(false)}>x</button>
                                </li>
                                :
                                <li
                                    className={styles.tag_btn}
                                    onClick={()=>setTagInput(true)}
                                >
                                    add tag
                                </li>
                            }
                        </ul>
                        :
                        movie.tagline
                    }
                </div>
            </li>
        )
}

export default ProfileMovie;