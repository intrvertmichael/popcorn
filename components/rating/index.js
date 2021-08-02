import styles from '../../styles/MovieDetails.module.css'

const Rating = ({score, count}) => {

    if(count <= 50 || score === 0) return false

    const good = {
        backgroundImage: "linear-gradient(25deg, #2a8535, #5dac4d, #8cd567, #bcff82)"
    }

    const bad = {
        backgroundImage: "linear-gradient(25deg, #5e112b, #8e142c, #c0142b, #f41029)"
    }

    let color
    if(score > 8) color = good
    if(score < 5) color = bad

    return (
        <div className={styles.rating} style={color}>
            <span>{score}</span>
            <p>{count} votes</p>
        </div>
    )
}

export default Rating