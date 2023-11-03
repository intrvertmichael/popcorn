import { useState, useEffect } from "react"
import styles from "styles/Carousel.module.css"

const Carousel = ({ images }) => {
  const [pos, setPos] = useState(0)

  useEffect(() => {
    const randomBg = images ? Math.floor(images.length * Math.random()) : 0
    setPos(randomBg)
  }, [images])

  if (!images) return false

  function backClicked() {
    if (images.length > pos && pos > 0) setPos(pos - 1)
    else setPos(images.length - 1)
  }

  function nextClicked() {
    if (pos >= 0 && pos < images.length - 1) setPos(pos + 1)
    else setPos(0)
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.images} onClick={nextClicked}>
        <div className={styles.alt_pics}>{images[pos]}</div>
      </div>

      {images.length > 1 ? (
        <div className={styles.nav}>
          <button onClick={backClicked}> ◀ </button>
          <div className={styles.label}>
            <span>{pos}</span> / {images.length - 1}
          </div>
          <button onClick={nextClicked}> ▶ </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default Carousel
