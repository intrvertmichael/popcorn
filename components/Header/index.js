
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <div>
                <Link href="/">
                    <a>
                        <h1>🍿Popcorn</h1>
                    </a>
                </Link>

                <h2>Find what to watch</h2>
            </div>

            <div>
                <h3>Sign Up</h3>
                <h3>Log In</h3>
            </div>
        </div>
    )
}

export default Header;