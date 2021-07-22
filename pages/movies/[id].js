import Image from 'next/image'
import styles from '../../styles/Movie.module.css'
import Rating from '../../components/Rating'
import Layout from '../../components/Layout'

import { getSingleMovie, getImageList, createMovieImageURL } from '../../requests/movie.api'

export const getStaticPaths = async () => {
    return { paths: [], fallback: true }
}

export const getStaticProps = async (context) => {
    const id= context.params.id
    const movie = await getSingleMovie(id)
    const images = await getImageList(id)
    return { props: { movie, images } }
}

const MovieDetails = ({movie, images}) => {

    if(!movie || !images) return false

    const altPics = images.backdrops.map( (img, key) => {
        const altImage = createMovieImageURL(img.file_path)
        return <Image key={key} src={altImage} width={960} height={540} alt={key}/>
    })

    const posterImage = createMovieImageURL(movie.poster_path)
    const genres = movie.genres.map( g => <li key={g.id}> {g.name} </li> )
    const randomBg = altPics? Math.floor(altPics.length * Math.random()): 0
    const fullDate = createFullDate(movie.release_date)
    const fullLength = createFullLength(movie.runtime)

    return (
        <Layout>
            <div className={styles.hero}>
                { altPics[randomBg] }
            </div>

            <div className={styles.poster} >
                <Image src={posterImage} alt={movie.title} width="185" height="278" />
            </div>

            <div className={styles.movie_info}>
                <Rating score={movie.vote_average} count={movie.vote_count} />

                <div className={styles.movie_description}>
                    <h1>{movie.title}</h1>
                    <h2>{movie.tagline}</h2>

                    <p className={styles.overview}>{movie.overview}</p>

                    <div className={styles.details}>
                        <p> Released on {fullDate}</p>
                        <p> {fullLength} long</p>
                    </div>

                    <ul className={styles.genres}>{genres}</ul>
                </div>

                <div className={styles.alt_pics}>
                    {altPics}
                </div>
            </div>
        </Layout>
    )
}

function createFullLength(length){
    const lengthHours = Math.floor(length / 60)
    const lengthMins = length % 60
    const fullLength = (lengthHours > 1 ? lengthHours + " hours and " :  lengthHours + " hour and " )+ lengthMins + " minutes"
    return fullLength
}

function createFullDate(date){
    const dateObj = new Date(date)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[dateObj.getMonth()]
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day}, ${year}`
}

export default MovieDetails;