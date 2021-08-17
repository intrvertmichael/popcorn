
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Header from '../components/Header'

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

                const user = { id: authResult.user.uid }

                localStorage.setItem('user', JSON.stringify(user));
                setFirebaseUser(user)
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
                {/*
                    <p>{firebaseUser.name}</p>
                    <p>{firebaseUser.email}</p>
                */}

                <p>{firebaseUser.id}</p>
            </div>
        </div>
    )
}

export default Auth