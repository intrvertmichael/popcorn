
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import { useGetFirebaseUser } from '../../context/FirebaseContext'

const Header = () => {
    const firebaseUser = useGetFirebaseUser()

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
        {
            firebaseUser?
            <Link href='/auth'>
                <a>
                    <h3>username: {firebaseUser.name}</h3>
                </a>
            </Link>
            :
            <Link href='/auth'>
                <a>
                    <h3>Sign Up | Log In</h3>
                </a>
            </Link>
        }

        </div>
    )
}

export default Header;