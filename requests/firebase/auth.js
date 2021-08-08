import firebase from './config'

export async function firebase_signout(){
    localStorage.removeItem('user')
    await firebase.auth().signOut()
}