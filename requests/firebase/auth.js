import firebase from './config'

export async function firebase_signout(){
    localStorage.removeItem('user_id')
    await firebase.auth().signOut()
}