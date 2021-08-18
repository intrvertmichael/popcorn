
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

    const liked_movies = firebaseUser.liked.map((movie, key) => <li key={key}> {movie.movie_id} </li>)
    const disliked_movies = firebaseUser.disliked.map((movie, key) => <li key={key}> {movie.movie_id} </li>)

    return (
        <div>
            <Header />
            <h3>Auth Page</h3>

            <div>
                <p>{firebaseUser.displayname}</p>
                <p>{firebaseUser.email}</p>
                <p>{firebaseUser.uid}</p>

                <h4>Liked Movies</h4>
                {liked_movies}

                <h4>Disliked Movies</h4>
                {disliked_movies}

            </div>
        </div>
    )
}

export default Auth