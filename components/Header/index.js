
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

    console.log(firebaseUser)

    let rightComp = (
        <Link href='/auth'>
            <a>
                <h3>Sign Up | Log In</h3>
            </a>
        </Link>
    )

    if(onAuthPage) rightComp = (<div></div>)
    if(firebaseUser) rightComp = (
        <div>
            <button onClick={ () => {
                firebase_signout()
                setFirebaseUser(null)
            }}>
                Sign Out
            </button>

            <Link href='/auth'>
                <a>
                    <h3>
                        Profile
                    </h3>
                </a>
            </Link>
        </div>
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