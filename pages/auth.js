
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
            signInSuccessWithAuthResult: async function(authResult) {

                const user = authResult.user

                localStorage.setItem('user_id', user.uid);

                const fb_user = await fetch('/api/firebase/user', {
                    method: 'POST',
                    headers: {
                        uid: user.uid,
                        displayName: user.displayName,
                        email: user.email
                    }
                })

                if(fb_user) setFirebaseUser(user)
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