import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: replace with your real Firebase project config
// (Firebase console → Project settings → General → Your apps → SDK setup)
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// Silently signs the visitor in anonymously on first load, so they get a
// stable uid (used to tie wishes/chats to them) without ever seeing a
// signup screen. Call this once near the top of App.jsx.
export function ensureAnonymousAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(user)
    } else {
      signInAnonymously(auth).catch((err) => {
        console.error('Anonymous sign-in failed:', err)
      })
    }
  })
}
