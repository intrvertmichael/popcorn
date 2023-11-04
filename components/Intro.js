import styles from "styles/Home.module.css"

export default function Intro() {
  return (
    <div className={styles.intro}>
      <p>
        <span>🔎</span> Discover new and old movies <br />
        <span>★</span> Save the movies you want to see <br />
        <span>👍</span> Like movies to get recommendations <br />
        <span>🏷</span> Add tags to find movies faster <br />
        <span>👎</span> Disliked movies like will be vanished
        <br />
      </p>
    </div>
  )
}
