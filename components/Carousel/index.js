
import { useState } from 'react'
import styles from '../../styles/Carousel.module.css'

const Carousel = ({images}) => {
    const [pos, setPos] = useState(0)

    if(!images) return false

    function backClicked(){
        if(pos > 0) setPos(pos - 1)
        else setPos(images.length - 1)
    }

    function nextClicked(){
        if(pos < images.length - 1) setPos(pos + 1)
        else setPos(0)
    }

    return (
        <div className={styles.carousel}>
            <div className={styles.nav}>
                <button onClick={backClicked}> ◀ </button>
                <div className={styles.label}>
                    <span>{pos}</span> / {images.length -1}
                </div>
                <button onClick={nextClicked}> ▶ </button>
            </div>

            <div className={styles.images}>
                <div className={styles.alt_pics}>
                    {images[pos]}
                </div>
            </div>
        </div>
    )
}

export default Carousel;