import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const notFound = () => {
    return (
        <div className={styles.not_found}>

            <Image src='/404.jpg' width='500' height='500' alt='dvd case'/>

            <p>Not Found</p>

            <Link href='/'>
                <a>
                    Go back home
                </a>
            </Link>

        </div>
    )
}

export default notFound;