import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD3TU82t_oL3p1ycFT6U5rpaBX4nLI0y_Y',
  authDomain: 'proyecto-34d45.firebaseapp.com',
  projectId: 'proyecto-34d45',
  storageBucket: 'proyecto-34d45.appspot.com',
  messagingSenderId: '833783779934',
  appId: '1:833783779934:web:a80047f1e68dcd3912dacf'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
