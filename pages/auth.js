
import { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "../requests/firebase/config";


const Auth = () => {
    const [user, setUser] = useState()

    const uiConfig = {
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
        callbacks: {
            signInSuccessWithAuthResult: function(authResult) {

                console.log("authResult", authResult)

                setUser({
                    name: authResult.user.displayName,
                    email: authResult.user.email,
                    id: authResult.user.uid
                })

                return false
            }
        }
    }

    async function signOut(){
        await firebase.auth().signOut()
        console.log('signed out successfully')
        setUser(null)
    }

    if(!user) return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

    return (
        <div>
            <h3>Auth Page</h3>

            <div>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.id}</p>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </div>
    )
}

export default Auth