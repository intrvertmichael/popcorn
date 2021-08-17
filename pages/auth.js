
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Header from '../components/Header'

import { useGetFirebaseUser } from "../context/FirebaseContext";
import firebase from "../requests/firebase/config";

const Auth = () => {
    const firebaseUser = useGetFirebaseUser()

    const uiConfig = {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        signInSuccessUrl: '/',
        callbacks: {
            signInSuccessWithAuthResult: authResult => {
                localStorage.setItem('user_id', authResult.user.uid)
                return false
            }
        }
    }

    if(!firebaseUser) {
        return(
            <div>
                <Header />
                <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />
            </div>
        )
    }

    return (
        <div>
            <Header />
            <h3>Auth Page</h3>

            <div>
                <p>{firebaseUser.displayname}</p>
                <p>{firebaseUser.email}</p>
                <p>{firebaseUser.uid}</p>
            </div>
        </div>
    )
}

export default Auth