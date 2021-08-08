
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import { useGetFirebaseUser, useSetFirebaseUser } from '../../context/FirebaseContext'
import { useRouter } from 'next/router'
import {firebase_signout} from './../../requests/firebase/auth'

const Header = () => {
    const firebaseUser = useGetFirebaseUser()
    const setFirebaseUser = useSetFirebaseUser()

    const router = useRouter()

    const onAuthPage = router.pathname === '/auth'

    let rightComp
    if( onAuthPage && firebaseUser) rightComp = (
        <button onClick={ () => {
            firebase_signout()
            setFirebaseUser(null)
        }}> Sign Out </button>
    )
    else if(firebaseUser) rightComp = (
        <Link href='/auth'>
            <a>
                <h3>username: {firebaseUser.name}</h3>
            </a>
        </Link>
    )

    else if (onAuthPage) rightComp = (
        <div></div>
    )
    else rightComp = (
        <Link href='/auth'>
            <a>
                <h3>Sign Up | Log In</h3>
            </a>
        </Link>
    )

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

            {rightComp}
        </div>
    )
}

export default Header;