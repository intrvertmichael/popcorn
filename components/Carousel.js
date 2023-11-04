import { useState } from "react"

import styles from "styles/Carousel.module.css"

export default function Carousel({ images }) {
  const [pos, setPos] = useState(
    images ? Math.floor(images.length * Math.random()) : 0,
  )

  if (!images) return false

  function backClicked() {
    setPos(images.length > pos && pos > 0 ? pos - 1 : images.length - 1)
  }

  function nextClicked() {
    setPos(pos >= 0 && pos < images.length - 1 ? pos + 1 : 0)
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.images} onClick={nextClicked}>
        <div className={styles.alt_pics}>{images[pos]}</div>
      </div>

      {images.length > 1 && (
        <div className={styles.nav}>
          <button onClick={backClicked}> ◀ </button>
          <div className={styles.label}>
            <span>{pos}</span> / {images.length - 1}
          </div>
          <button onClick={nextClicked}> ▶ </button>
        </div>
      )}
    </div>
  )
}
