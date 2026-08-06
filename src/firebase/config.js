import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyADAWNh1-8T9kr3Ci8FCbWwnm8Ajp9mq9U",
  authDomain: "interfazt.firebaseapp.com",
  projectId: "interfazt",
  storageBucket: "interfazt.firebasestorage.app",
  messagingSenderId: "873351706228",
  appId: "1:873351706228:web:27efb1ca7c70f57d308321",
  measurementId: "G-2LV3P9WKYD"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

export default app