
import Link from "next/link";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useSetFirebaseUser, useGetFirebaseUser } from "../context/FirebaseContext";
import firebase from "../requests/firebase/config";


const Auth = () => {
    const setFirebaseUser = useSetFirebaseUser()
    const firebaseUser = useGetFirebaseUser()

    const uiConfig = {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        signInSuccessUrl: '/',
        callbacks: {
            signInSuccessWithAuthResult: function(authResult) {

                const user = {
                    name: authResult.user.displayName,
                    email: authResult.user.email,
                    id: authResult.user.uid
                }

                localStorage.setItem('user', JSON.stringify(user));
                setFirebaseUser(user)
                return false
            }
        }
    }

    async function signOut(){
        await firebase.auth().signOut()
        localStorage.removeItem('user');
        setFirebaseUser(null)
    }

    if(!firebaseUser) return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

    return (
        <div>
            <h3>Auth Page</h3>

            <div>
                <p>{firebaseUser.name}</p>
                <p>{firebaseUser.email}</p>
                <p>{firebaseUser.id}</p>
                <button onClick={signOut}>Sign Out</button>

                <Link href='/'>
                    <a>
                        Home
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Auth