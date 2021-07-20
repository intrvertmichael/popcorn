import Image from 'next/image'
import styles from '../../styles/Movie.module.css'
import Rating from '../../components/Rating'
import Header from '../../components/Header'

import { getSingleMovie, getImageList } from '../../requests/movie.api'

export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    const movie = await getSingleMovie(id)
    const imageData = await getImageList(id)

    return {
        props: {
            movie: movie,
            images: imageData
        }
    }
}

const MovieDetails = ({movie, images}) => {

    if(!movie || !images) return false

    let altPics

    if(images){
        altPics = images.backdrops.map( (img, key) => {
            const altImage = `https://image.tmdb.org/t/p/original/${img.file_path}`
            return <Image key={key} src={altImage} width={960} height={540} alt={key}/>
        })
    }

    const image = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    const genres = movie.genres.map( g => <li key={g.id}> {g.name} </li> )
    const randomBg = altPics? Math.floor(altPics.length * Math.random()): 0

    const date = new Date(movie.release_date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const fullDate = `${month} ${day}, ${year}`

    const lengthHours = Math.floor(movie.runtime / 60)
    const lengthMins = movie.runtime % 60
    const fullLength = (lengthHours > 1 ? lengthHours + " hours and " :  lengthHours + " hour and " )+ lengthMins + " minutes"

    return (
        <div className={styles.container}>

            <Header />

            <div className={styles.hero}>
                {
                    altPics[randomBg]
                }
            </div>

            <div className={styles.poster} >
                <Image src={image} alt={movie.title} width="185" height="278" />
            </div>

            <div className={styles.movie_info}>
                <Rating
                    style={styles.rating}
                    score={movie.vote_average}
                    count={movie.vote_count}
                />

                <div className={styles.movie_description}>
                    <h1>{movie.title}</h1>
                    <h2>{movie.tagline}</h2>
                    <p className={styles.overview}>{movie.overview}</p>

                    <div className={styles.details}>
                        <p> Released on {fullDate}</p>
                        <p> Length: {fullLength}</p>
                    </div>

                    <ul className={styles.genres}>{genres}</ul>
                </div>

                <div className={styles.alt_pics}>
                    {altPics}
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;