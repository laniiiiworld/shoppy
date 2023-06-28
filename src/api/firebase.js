import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

export function onUserStateChanged(callback) {
  try {
    onAuthStateChanged(auth, callback);
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function login() {
  try {
    signInWithPopup(auth, provider);
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}

export function logout() {
  try {
    signOut(auth);
  } catch (error) {
    const { code, message } = error;
    console.error(code, message);
  }
}
