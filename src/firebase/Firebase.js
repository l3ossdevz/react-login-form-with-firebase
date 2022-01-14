import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import FirebaseConfig from './FirebaseConfig'

if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseConfig)
}

export default firebase.auth()
